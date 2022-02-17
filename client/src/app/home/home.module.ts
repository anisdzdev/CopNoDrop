import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [HomeComponent, ProductsCarouselComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    InputNumberModule,
    ToastModule,
  ],
  exports: [ProductsCarouselComponent],
})
export class HomeModule {}
