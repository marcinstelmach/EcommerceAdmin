import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol === 'http') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}
