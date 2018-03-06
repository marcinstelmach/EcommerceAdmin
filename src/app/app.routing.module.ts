import {LoginComponent} from './components/login/login.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {ProductCategoryComponent} from './components/product-category/product-category.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharmCategoryComponent} from './components/charm-category/charm-category.component';
import {CharmComponent} from './components/charm/charm.component';
import {AuthGuard} from './services/authGuard';


const routes: Routes = [
  {path: 'charm', component: CharmComponent, canActivate: [AuthGuard]},
  {path: 'product-category', component: ProductCategoryComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'charm-category', component: CharmCategoryComponent, canActivate: [AuthGuard]},
  // {path: 'repository', component: RepositoryComponent, canActivate: [AuthGuard]},
  // {path: 'repository/:repositoryId/version', component: VersionComponent, canActivate: [AuthGuard]},
  // {path: 'repository/:repositoryId/version/:versionId/file', component: FileComponent, canActivate: [AuthGuard]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
