import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        console.log(localStorage);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/authenticate/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    console.log(user);
                    console.log("line 29", JSON.stringify(user) );
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    var localUser : User = {
                        Email: user.email,
                        Token: user.token,
                        Role: user.role
                    }
                    localStorage.setItem('currentUser', JSON.stringify(localUser));
                    this.currentUserSubject.next(localUser);
                }

                return localUser;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}