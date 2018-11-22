import {ProductsCategoriesService} from './services/products-categories/products-categories.service';
import {ProductsService} from './services/products/products.service';
import {CharmCategoriesService} from './services/charm-categories/charm-categories.service';
import {AddressService} from './services/address/address.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/authGuard';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {NgUploaderModule} from 'ngx-uploader';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {CharmCategoryComponent} from './components/charm-category/charm-category.component';
import {CharmComponent} from './components/charm/charm.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './components/product/product.component';
import {AuthService} from './services/auth/auth.service';
import {CharmService} from './services/charm/charm.service';
import {UserService} from './services/user/user.service';
import {ShipmentService} from './services/shipment/shipment.service';
import {UsersComponent} from './components/users/users.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {UserComponent} from './components/user/user.component';
import {RegisterComponent} from './components/register/register.component';
import {Interceptors} from 'app/interceptors';
import {ToastrModule} from 'ngx-toastr';
import {MaterialModule} from './material.module';
import {ErrorModalComponent} from './components/shared/error-alert/error-modal.component';
import {DeleteAlertComponent} from './components/shared/delete-alert/delete-alert.component';
import { EditProductComponent } from './components/product/edit/edit.product.component';
import {CacheService} from './services/cache/cache.service';
import { AlertComponent } from './components/shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    CharmCategoryComponent,
    CharmComponent,
    ProductComponent,
    UsersComponent,
    UserComponent,
    RegisterComponent,
    ErrorModalComponent,
    DeleteAlertComponent,
    EditProductComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
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
    ...Interceptors,
    CacheService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorModalComponent, DeleteAlertComponent, EditProductComponent, AlertComponent]
})
export class AppModule {
}
