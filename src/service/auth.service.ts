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
                    /*
                    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlcjEiLCJqdGkiOiJlY2FjZTEwNS00NWMxLTQxY2UtODMyZC04MmQ0ZjhiNGZkMDUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJFeGVjdXRpdmUiLCJleHAiOjE2MDA5MTI5OTAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTIwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.Ov16CAy1i2MpCPEinbuUA97V2XREu-I3vh4BMBCPFl0",
                    "email":"exec1@e.com",
                    "role":"Executive"}
                    */
                    var localUser : User = {
                        Email: user.email,
                        Token: user.token,
                        Role: user.role
                    }
                    localStorage.setItem('currentUser', JSON.stringify(localUser));
                    this.currentUserSubject.next(localUser);
                    /*
                    {
                        currentUser: ""
                    }
                    */
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