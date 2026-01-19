import { Injectable } from '@angular/core';
import {Activity} from '../../component/activity/activity';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IActivity} from '../../models/IActivity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  private apiUrl = 'http://localhost:8080/activity';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createActivity(activity: IActivity): Observable<Activity> {
    const headers = this.getAuthHeaders();
    console.log(this.getAuthHeaders());
    return this.http.post<Activity>(this.apiUrl,
      activity,
      { headers });
  }

}
