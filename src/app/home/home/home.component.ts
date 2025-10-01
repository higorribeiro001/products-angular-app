import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from '../Products';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productsData: Products | null = null;
  private _snackBar = inject(MatSnackBar);
  currentPage: number = 1;

  constructor(private service: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData():void {
    this.service.getProducts(this.currentPage).subscribe({
      next: (products) => {
        this.productsData = products;
        this.updateTableData();
      },
      error: (error) => {
        if (error.status === 401) {
          localStorage.clear();
          this.openSnackBar('Sessão expirada. Faça login novamente.', 'OK');
        }
      }
    });
  }

  ELEMENT_DATA: Product[] = [];

  displayedColumns: string[] = ['name', 'mark', 'value', 'actions'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  private updateTableData(): void {
    if (this.productsData && this.productsData.items) {
      this.dataSource.data = this.productsData.items;
      this.currentPage = this.productsData.current_page;
    }
  }

  navigateHome() {
    this.router.navigate(['/paginas/home']);
  }

  navigateForm(id?: string) {
    if (id) {
      this.router.navigateByUrl(`/paginas/formulario-produto?id_product=${id}`);
    } else {
      this.router.navigateByUrl('/paginas/formulario-produto');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  delete(id: string) {
    this.service.deleteProduct(id).subscribe({
      next: user => {
        if (this.productsData?.items && this.productsData.items.length === 1 && this.currentPage > 1) {
          this.currentPage -= 1;
        }

        this.getProductsData();
        this.openSnackBar('Produto deletado com sucesso.', 'OK');
      },
      error: error => {
        this.openSnackBar(`Erro ao tentar deletar produto, tente novamente mais tarde.`, 'OK');
      }
    });
  }

  nextPage(): void {
    if (this.productsData?.pages && (this.currentPage < this.productsData?.pages)) {
      this.currentPage += 1;
      this.getProductsData();
    }
  }

  backPage(): void {
    if (this.productsData?.pages && (this.currentPage > 1)) {
      this.currentPage -= 1;
      this.getProductsData();
    }
  }
}
