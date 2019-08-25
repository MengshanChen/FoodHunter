import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import {Observable,of, from } from 'rxjs';
import { Observable } from 'rxjs';
import { IRestaurantModel } from '../interfaces/IRestaurantModel';

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {

    private host = '127.0.0.1:8080';
    private url = this.host + '/restaurant';
    constructor(private http: HttpClient) { }
    getAll(): Observable<IRestaurantModel[]> {
        return this.http.get<IRestaurantModel[]>(this.url);
    }

    getByID(rID: number): Observable<IRestaurantModel> {
        return this.http.get<IRestaurantModel>(this.url + '/' + rID);
    }
}
