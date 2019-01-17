import {ProductsCategoriesService} from './services/products-categories/products-categories.service';
import {ProductsService} from './services/products/products.service';
import {CharmCategoriesService} from './services/charm-categories/charm-categories.service';
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
import {RegisterComponent} from './components/register/register.component';
import {ToastrModule} from 'ngx-toastr';
import {MaterialModule} from './material.module';
import {ErrorModalComponent} from './components/shared/error-alert/error-modal.component';
import {DeleteAlertComponent} from './components/shared/delete-alert/delete-alert.component';
import {EditProductComponent} from './components/product/edit/edit.product.component';
import {AlertComponent} from './components/shared/alert/alert.component';
import {EditCharmComponent} from './components/charm/edit/edit.charm.component';
import {ShipmentComponent} from './components/shipment/shipment.component';
import {ShipmentTypePipe} from './pipes/shipment-type.pipe';
import {CategoryDiscountComponent} from './components/discounts/category-discount/category-discount.component';
import {ProductCategoryDiscountService} from './services/product-category-discount/product-category-discount.service';
import {DescriptionPipe} from './pipes/description.pipe';
import {Interceptors} from './interceptors';
import { CodeDiscountComponent } from './components/discounts/code-discount/code-discount.component';
import {OrderDiscountService} from './services/order-discount/order-discount.service';
import { OrderComponent } from './components/order/order.component';
import {CacheService} from './services/cache/cache.service';
import {OrderService} from './services/order/order.service';
import {TrueFalsePipe} from './pipes/true-false.pipe';
import {EditOrderComponent} from './components/order/edit/edit.order/edit.order.component';

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
    RegisterComponent,
    ErrorModalComponent,
    DeleteAlertComponent,
    EditProductComponent,
    AlertComponent,
    EditCharmComponent,
    ShipmentComponent,
    ShipmentTypePipe,
    CategoryDiscountComponent,
    DescriptionPipe,
    CodeDiscountComponent,
    OrderComponent,
    TrueFalsePipe,
    EditOrderComponent
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
    CharmCategoriesService,
    ProductsService,
    ProductsCategoriesService,
    ShipmentService,
    ...Interceptors,
    ProductCategoryDiscountService,
    OrderDiscountService,
    CacheService,
    OrderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorModalComponent,
    DeleteAlertComponent,
    EditProductComponent,
    AlertComponent,
    EditCharmComponent
  ]
})
export class AppModule {
}
