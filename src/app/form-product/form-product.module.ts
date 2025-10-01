import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProductRoutingModule } from './form-product-routing.module';
import { FormProductComponent } from './form-product/form-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormProductService } from './form-product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormProductRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FormProductService,
    { provide: HttpClient, useClass: HttpClient }
  ]
})

export class FormProductModule { }
