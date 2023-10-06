import { Component } from '@angular/core';
import {Produto, produtos} from './product'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  produtos = [...produtos];
  title = 'front';
}
