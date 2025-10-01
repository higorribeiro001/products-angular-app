import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { LogoutService } from './logout.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    LogoutService,
    { provide: HttpClient, useClass: HttpClient }
  ]
})
export class TemplateModule { }
