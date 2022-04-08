import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ToastModule } from 'primeng/toast';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {GalleriaModule} from 'primeng/galleria';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {MenubarModule} from 'primeng/menubar';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    SearchBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    GalleriaModule,
    AutoCompleteModule,
    MenubarModule


  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
