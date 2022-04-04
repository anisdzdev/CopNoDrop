import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [CommonModule, InputNumberModule, FormsModule, StepsModule, TableModule],
  exports: []
})
export class SharedModule { }
