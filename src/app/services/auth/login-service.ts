import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:3000/auth/login';

  constructor( private http: HttpClient) { }

  login(credenciales: {username: string, password:string}) : Observable<any> {
    return this.http.post(this.apiUrl, credenciales)
  }
}
