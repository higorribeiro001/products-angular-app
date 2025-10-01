import { Component, inject } from '@angular/core';
import { LogoutService } from '../logout.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private _snackBar = inject(MatSnackBar);

  constructor(private service: LogoutService, private router: Router) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  navigate() {
    this.router.navigate([''])
  }

  sendLogout() {
    this.service.logout().subscribe({
      next: user => {
        this.openSnackBar('Logout realizado com sucesso.', 'OK');
        this.navigate();
      },
      error: error => {
        this.openSnackBar(`Erro ao fazer logout, tente novamente mais tarde.`, 'OK');
      }
    });
    localStorage.clear();
  }
}
