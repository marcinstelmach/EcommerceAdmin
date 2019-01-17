import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharmCategoryComponent} from './components/charm-category/charm-category.component';
import {CharmComponent} from './components/charm/charm.component';
import {AuthGuard} from './services/authGuard';
import {ProductComponent} from './components/product/product.component';
import {UsersComponent} from './components/users/users.component';
import {RegisterComponent} from './components/register/register.component';
import {ShipmentComponent} from './components/shipment/shipment.component';
import {CategoryDiscountComponent} from './components/discounts/category-discount/category-discount.component';
import {CodeDiscountComponent} from './components/discounts/code-discount/code-discount.component';
import {OrderComponent} from './components/order/order.component';
import {EditOrderComponent} from './components/order/edit/edit.order/edit.order.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'charm', component: CharmComponent, canActivate: [AuthGuard]},
  {path: 'product-category', component: ProductCategoryComponent, canActivate: [AuthGuard]},
  {path: 'charm-category', component: CharmCategoryComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'shipment', component: ShipmentComponent, canActivate: [AuthGuard]},
  {path: 'category-discount', component: CategoryDiscountComponent, canActivate: [AuthGuard]},
  {path: 'code-discount', component: CodeDiscountComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'orders/:id', component: EditOrderComponent, canActivate: [AuthGuard]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '404'},
  {path: '', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
