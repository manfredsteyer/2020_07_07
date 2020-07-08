import {Component} from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private sub = new ReplaySubject<string>(2);
  readonly obs = this.sub.asObservable();

  constructor() {
    
      const addItem = new Subject<string>();

      const basket$ = addItem.pipe(
        scan( (alt, neu) =>([...alt, neu]), [])
      );
      
      basket$.subscribe(value => console.debug(value));

      addItem.next('Apfel');
      addItem.next('Birne');
      addItem.next('Citrone');


  }

  click() {
    this.sub.next('click');
  }

}

