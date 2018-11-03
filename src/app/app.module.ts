import { ProductsCategoriesService } from './services/products-categories/products-categories.service';
import { ProductsService } from './services/products/products.service';
import { CharmCategoriesService } from './services/charm-categories/charm-categories.service';
import { AddressService } from './services/address/address.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatCardModule, MatInputModule, MatTableModule } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {NgUploaderModule} from 'ngx-uploader';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {CharmCategoryComponent} from './components/charm-category/charm-category.component';
import {CharmComponent} from './components/charm/charm.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './components/product/product.component';
import { AuthService } from './services/auth/auth.service';
import { CharmService } from './services/charm/charm.service';
import { UserService } from './services/user/user.service';
import { ShipmentService } from './services/shipment/shipment.service';
import { UsersComponent } from './components/users/users.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { Interceptors } from "app/interceptors";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    CharmCategoryComponent,
    CharmComponent,
    ProductComponent,
    UsersComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    NgUploaderModule,
    NgbModule,
    MatTableModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    CharmService,
    AddressService,
    CharmCategoriesService,
    ProductsService,
    ProductsCategoriesService,
    ShipmentService,
    ...Interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
