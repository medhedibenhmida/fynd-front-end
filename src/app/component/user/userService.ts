import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; // URL de ton backend

  constructor(private http: HttpClient) {}

  // Créer un utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Récupérer un utilisateur par UUID
  getUserByUuid(uuid: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${uuid}`);
  }
}
