import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/User';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = environment.apiUrl;

  currentUser: User;

  constructor(
      private http: HttpClient,
      private router: Router,
  ) { }

  login(user: User, errCb: any){
    return this.http.post<User>(`${this.API_URL}/Users/login`, user)
    .subscribe({
      next: (res: any) => {
        this.setAccessToken(res.token);
        this.setUser(res);
        this.router.navigate(["/user"]);
      },
      error: err => {
        if(errCb) errCb(err)
      }
    })
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem("access_token");
    return authToken !== null;
  }

  authorize() {
    return this.http.post<User>(`${this.API_URL}/Users/auth`, { token: this.accessToken });
  }

  get accessToken() {
    return localStorage.getItem('access_token')
  }

  setAccessToken(token: string) {
    localStorage.setItem('access_token', token );
  }

  setUser(user: any) {
    this.currentUser = user;
  }
}
