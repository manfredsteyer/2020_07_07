import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, interval, combineLatest, of, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, filter, shareReplay, delay, mergeMap, concatMap, exhaustMap, catchError, takeUntil } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-api';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})

export class FlightLookaheadComponent implements OnInit, OnDestroy {

 

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading = false;

    online$: Observable<boolean>;

    private close$ = new Subject<void>();


    constructor(private http: HttpClient) {
    }

    ngOnDestroy(): void {
        this.close$.next();
    }

    ngOnInit() {
        this.control = new FormControl();

        this.online$ 
            = interval(2000).pipe(
                    startWith(0),
                    map(_ => Math.random() < 0.5),
                    map(_ => true),
                    distinctUntilChanged(), // t, f
                    shareReplay(1)
            );


        const input$ = this
                        .control
                        .valueChanges;

        function dummyOp(msg: string) {
            console.debug('msg', msg);
            return o => o;
        }        

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            filter( ([_, online]) => online),
            map(([input, _]) => input),

            // x => x,
            // dummyOp('Mein erster Operator!'),

            filter( (value) => value.length > 0),
            tap(_ => this.loading = true),
            switchMap(name => this.load(name)),
            tap(_ => this.loading = false),
            takeUntil(this.close$),
        );

        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       debounceTime(300),
        //                       tap(v => this.loading = true),
        //                       switchMap(name => this.load(name)),
        //                       tap(v => this.loading = false)
        //                     );
    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this
                .http
                .get<Flight[]>(url, {params, headers})
                .pipe(
                    catchError(err => {
                        console.debug('err', err);
                        return of([]);
                    })
                );
        
        //.pipe(delay(7000));

    };


}
