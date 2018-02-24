import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {RepositoryComponent} from './components/repository/repository.component';
import {VersionComponent} from './components/version/version.component';
import {FileComponent} from './components/file/file.component';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalService} from './services/globalService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule, MatInputModule} from '@angular/material';
import {UserService} from './services/userService';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/authService';
import {AuthGuard} from './services/authGuard';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {RepositoryService} from './services/repositoryService';
import {VersionService} from './services/versionService';
import {FileService} from './services/fileService';
import { NgUploaderModule } from 'ngx-uploader';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RepositoryComponent,
    VersionComponent,
    FileComponent,
    PageNotFoundComponent
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
    NgUploaderModule
  ],
  providers: [
    GlobalService,
    UserService,
    AuthService,
    AuthGuard,
    RepositoryService,
    VersionService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
