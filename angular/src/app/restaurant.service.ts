import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRestaurantModel } from './interfaces/IRestaurantModel';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private host = 'localhost:8080';
    private url = this.host + '/restaurant';
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<IRestaurantModel[]> {
        return this.http.get<IRestaurantModel[]>(this.url);
    }
    
    getByID(rID: number): Observable<IRestaurantModel> {
        return this.http.get<IRestaurantModel>(this.url + '/' + rID);
    }
}
