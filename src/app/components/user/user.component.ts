import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataResponseFromApi } from '../../models/user.interface';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userData$: Observable<UserDataResponseFromApi>;
  constructor(private usersService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    this.route.params.subscribe(params => {
      this.userData$ = this.usersService.getUserById(params.id);
    });
  }

}
