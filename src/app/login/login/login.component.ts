import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fieldsForm: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router, private service: LoginService) {
    this.fieldsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),]),
    });
  }

  navigate() {
    this.router.navigate(['/paginas/home'])
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

  sendLogin() {
    this.fieldsForm.markAllAsTouched();

    if (this.fieldsForm.valid) {
      this.service.save(this.fieldsForm.value).subscribe({
        next: user => {
          this.resetForm();
          localStorage.setItem('access', user.access_token ?? '');
          this.openSnackBar('Seja bem-vindo(a).', 'OK');
          this.navigate();
        },
        error: error => {
          const status = error.status;

          if (status === 401) this.openSnackBar(`E-mail e/ou senha inválido(s).`, 'OK');
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
