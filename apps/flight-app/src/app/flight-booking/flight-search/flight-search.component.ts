import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { selectFlights, selectPublicFlights } from '../+state/flight-booking.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return [];
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.store.select(selectPublicFlights);

  constructor(
    private store: Store<FlightBookingAppState>) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));

  }

  delay(): void {

    this.flights$.pipe(first()).subscribe(flights => {
      const oldFlight = flights[0];
      const flight = {...oldFlight, date: new Date().toISOString()};
      this.store.dispatch(updateFlight({flight}));
    });

  }

}
