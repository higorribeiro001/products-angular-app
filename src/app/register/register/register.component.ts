import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from '../register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  confirmHide = true;
  fieldsForm: FormGroup;
  private sub = new Subscription();
  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router, private service: RegisterService) {
    this.fieldsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3),]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),]),
      confPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.confirmPasswordValidator.bind(this)]),
    });
  }

  ngOnInit() {
    const pwd = this.fieldsForm.get('password');
    if (pwd) {
      this.sub.add(pwd.valueChanges.subscribe(() => {
        this.fieldsForm.get('confPassword')?.updateValueAndValidity();
      }));
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  confirmPasswordValidator(control: AbstractControl) {
    if (!control || !control.parent) return null;
    const password = control.parent.get('password')?.value;
    return password === control.value ? null : { passwordMismatch: true };
  }

  setHide(event: MouseEvent) {
    this.hide = !event.target;
  }

  setConfirmHide(event: MouseEvent) {
    this.confirmHide = !event.target;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

  save() {
    this.fieldsForm.markAllAsTouched();

    if (this.fieldsForm.valid) {
      this.service.save(this.fieldsForm.value).subscribe({
        next: user => {
          this.resetForm();
          this.openSnackBar('Cadastro realizado com sucesso.', 'OK');
        },
        error: error => {
          this.openSnackBar(`Erro. Certifique que já não está cadastrado, verifique os dados e tente novamente.`, 'OK');
        }
      });
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
}
