import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; // URL de ton backend

  constructor(private http: HttpClient) {}


  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${uuid}`);
  }

  getCurrentUser(): Observable<User> {
    const token = sessionStorage.getItem('token'); // récupère ton JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }

  uploadAvatar(formData: FormData): Observable<string> {
    const token = sessionStorage.getItem('token');
    return this.http.post<string>(`${this.apiUrl}/me/avatar`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateUser(uuid: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${uuid}`, user, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
  }

}
