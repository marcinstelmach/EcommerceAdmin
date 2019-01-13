import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../../models/user.interface';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public usersList$: Observable<User[]>;

  constructor(private usersService: UserService, private router: Router) {
  }

  public setupRodoRequirements(id: string): void {
    this.usersService.ereaseUser(id);
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  private getUsersList(): void {
    this.usersList$ = this.usersService.getUsers();
  }
}
