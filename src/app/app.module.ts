import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule, MatInputModule} from '@angular/material';
import {UserService} from './services/userService';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/authService';
import {AuthGuard} from './services/authGuard';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {NgUploaderModule} from 'ngx-uploader';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {ProductCategoryService} from './services/productCategoryService';
import {CharmCategoryComponent} from './components/charm-category/charm-category.component';
import {CharmCategoryService} from './services/charmCategoryService';
import {CharmComponent} from './components/charm/charm.component';
import {CharmService} from './services/charmService';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductComponent} from './components/product/product.component';
import {ProductService} from './services/productService';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    CharmCategoryComponent,
    CharmComponent,
    ProductComponent
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
    NgbModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    ProductCategoryService,
    CharmCategoryService,
    CharmService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
