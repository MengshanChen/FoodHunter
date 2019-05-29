import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userID : string; 
  AUTH_SERVER:string = "http://localhost:8080";
  //AUTH_SERVER:string = "https://foodhunter.azurewebsites.net"
  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  register(user : User): Observable<JwtResponse> {
    user.userType = 1;
    return this.httpClient.post<JwtResponse>(this.AUTH_SERVER + '/foodie/', user).pipe(
      tap((res: JwtResponse ) => {
        if(res.user) {
          localStorage.set("UserID", res.user.userID);
          localStorage.set("ACCESS_TOKEN", res.user.access_token);
          localStorage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    )
  };

  signIn(user : User): Observable<JwtResponse> {
    return this.httpClient.get<JwtResponse>(this.AUTH_SERVER + '/foodie/'+user.userID).pipe(
      tap(async(res: JwtResponse ) => {
        if(res.user) {
          localStorage.set("UserID", res.user.userID);
          localStorage.set("ACCESS_TOKEN", res.user.access_token);
          localStorage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    )
  };

  signOut(){
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }
}
