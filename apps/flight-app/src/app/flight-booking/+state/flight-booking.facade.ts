import { Injectable } from '@angular/core';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { Observable, BehaviorSubject } from 'rxjs';
import { FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { selectPublicFlights } from './flight-booking.selectors';


// -- 4 --
@Injectable({providedIn: 'root'})
export class FlightBookingFacade {

    readonly flights$ = this.store.select(selectPublicFlights);

    constructor(
        private store: Store<FlightBookingAppState>) { }
    
    find(from: string, to: string, urgent: boolean): void {

        this.store.dispatch(loadFlights({from, to, urgent}));

    }

}



// -- 3 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$ = this.store.select(selectPublicFlights);

//     constructor(
//         private store: Store<FlightBookingAppState>,
//         private flightSerive: FlightService) { }
    
//     find(from: string, to: string, urgent: boolean): void {

//         this.flightSerive.find(from, to, urgent).subscribe({
//             next: flights => {

//                 this.store.dispatch(flightsLoaded({flights}));

//             },
//             error: err => console.error('err', err)
//         })

//     }

// }


// -- 2 -- 
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$ = this.store.select(a => a[flightBookingFeatureKey].flights);

//     constructor(
//         private store: Store<FlightBookingAppState>,
//         private flightSerive: FlightService) { }
    
//     find(from: string, to: string, urgent: boolean): void {

//         this.flightSerive.find(from, to, urgent).subscribe({
//             next: flights => {

//                 this.store.dispatch(flightsLoaded({flights}));

//             },
//             error: err => console.error('err', err)
//         })

//     }

// }

// // -- 1 -- "Flux"
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     private flights$$ = new BehaviorSubject<Flight[]>([]);
//     readonly flights$: Observable<Flight[]> = this.flights$$.asObservable();

//     constructor(private flightSerive: FlightService) { }
    
//     find(from: string, to: string, urgent: boolean): void {

//         this.flightSerive.find(from, to, urgent).subscribe({
//             next: flights => {

//                 this.flights$$.next(flights);

//             },
//             error: err => console.error('err', err);
//         })

//     }

// }