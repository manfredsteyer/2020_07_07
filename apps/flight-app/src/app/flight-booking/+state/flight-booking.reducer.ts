import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, updateFlight, loadFlights } from './flight-booking.actions';

import { mutableOn } from 'ngrx-etc';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState { /* "Slice" */
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  negativeList: number[];
  stats: object;
  basket: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  negativeList: [3],
  basket: {},
  stats: {}
};

const flightBookingReducer = createReducer(
  initialState,

  mutableOn(flightsLoaded, (state, action) => {
    const flights = action.flights;

    // Would Mutate
    state.flights = flights;

//    return { ...state, flights };
  }),

  on(updateFlight, (state, action) => {
    const flight = action.flight

    const oldFlights = state.flights;

    const flights = oldFlights.map(f => f.id === flight.id ? flight : f);

    // Would Mutate
    // state.flights = flights;

    return { ...state, flights };
  }),

  on(loadFlights, (state, action) => {
    return { ...state, flights: [] }
  })

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
