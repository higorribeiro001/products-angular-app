import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProductService } from '../form-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormProduct } from '../FormProduct';

@Component({
  selector: 'app-form-product',
  standalone: false,
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {
  fieldsForm: FormGroup;
  private _snackBar = inject(MatSnackBar);
  updating: boolean = false;
  product: FormProduct = FormProduct.newFormProduct();

  constructor(private router: Router, private route: ActivatedRoute, private service: FormProductService) {
    this.fieldsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3),]),
      mark: new FormControl('', [Validators.required, Validators.minLength(3),]),
      value: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id_product'];
      if (id) {
        this.service.getProduct(id).subscribe(productFound => {
          if (productFound) {
            this.updating = true;
            this.product = productFound;
          }
        });
      }
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  isFieldInvalid(nameField: string): string {
    const field = this.fieldsForm.get(nameField);

    if (field?.invalid && field?.touched) {
      if (field.errors?.['required']) return 'Campo obrigatório';
      if (field.errors?.['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors?.['email']) return 'E-mail inválido.';
      if (field.errors?.['passwordMismatch']) return 'As senhas não coincidem';
    }

    return '';
  }

  registerProduct() {
    this.fieldsForm.markAllAsTouched();

    if (this.fieldsForm.valid) {
      if(!this.updating) {
        this.service.postProduct(this.fieldsForm.value).subscribe({
          next: product => {
            this.resetForm();
            this.openSnackBar('Produto cadastrado com sucesso.', 'OK');
          },
          error: error => {
            const status = error.status;

            if (status === 401) this.openSnackBar(`Erro inesperado. Tente novamente mais tarde.`, 'OK');
          }
        });
      } else {
        this.service.putProduct({
          ...this.fieldsForm.value,
          id: this.product.id
        }).subscribe({
          next: product => {
            this.resetForm();
            this.openSnackBar('Produto editado com sucesso.', 'OK');
          },
          error: error => {
            const status = error.status;

            if (status === 401) this.openSnackBar(`Erro inesperado. Tente novamente mais tarde.`, 'OK');
          }
        });
      }
    }
  }

  resetForm() {
    this.fieldsForm.reset();

    Object.keys(this.fieldsForm.controls).forEach(key => {
      const control = this.fieldsForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
      control?.setErrors(null);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
