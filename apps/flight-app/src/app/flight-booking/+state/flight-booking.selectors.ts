import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { flightBookingFeatureKey, FlightBookingState } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<FlightBookingState>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectAllFlights = createSelector(
  selectFlightBookingState,
  fbs => fbs.flights);

export const selectNegativeList = createSelector(
  selectFlightBookingState,
  fbs => fbs.negativeList);


  export const selectPublicFlights2 = createSelector(
    selectAllFlights,
    selectNegativeList,
    (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
  );


export const selectFlights = 
  (a: fromFlightBooking.FlightBookingAppState) => 
    a[flightBookingFeatureKey].flights;


export const selectPublicFlights = createSelector(
  (a: fromFlightBooking.FlightBookingAppState) => a[flightBookingFeatureKey].flights,
  (a: fromFlightBooking.FlightBookingAppState) => a[flightBookingFeatureKey].negativeList,

  (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);