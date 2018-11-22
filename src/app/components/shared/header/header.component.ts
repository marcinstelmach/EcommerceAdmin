import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthService} from 'app/services/auth/auth.service';
import {CacheService} from '../../../services/cache/cache.service';
import {MatDialog} from '@angular/material';
import {AlertComponent} from '../alert/alert.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  versionId: string;
  repositoryId: string;

  constructor(private authService: AuthService,
              private router: Router,
              private cacheService: CacheService,
              private modal: MatDialog) {
    router.events.subscribe(val => {
      this.checkIfLogin();
      this.createLinks();
    });
  }

  ngOnInit() {

  }

  logout() {
    this.cacheService.cleanCache().subscribe();
    this.authService.removeTokens();
    this.router.navigate(['/login']);
  }

  checkIfLogin(): void {
    this.isLogin = !this.authService.isTokenExpired();
  }

  cleanCache() {
    this.cacheService.cleanCache().subscribe(data => {
      this.modal.open(AlertComponent, {
        data: 'Cache cleaned !'
      });
    });
  }

  private createLinks() {
    const splitted = this.router.url.split('/');
    this.repositoryId = splitted[2];
    this.versionId = splitted[4];
  }
}
