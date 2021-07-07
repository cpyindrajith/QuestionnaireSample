import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  baseUrl: string;
  firebaseUrl: string;
  firebaseServerKey: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
    this.firebaseUrl = environment.firebase.url;
    this.firebaseServerKey = environment.firebase.serverKey;
  }
  fetchStudentSubSession(data: any) {
    return this.http.post(this.baseUrl + 'FetchStudentSubSesion', data).pipe(
      catchError(errorRes => {
        const errorMessage = 'An Error Occured';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        return throwError(errorMessage);
      })
    );
  }
  fetchSubsessionDetails(data: any) {
    return this.http.post(this.baseUrl + 'FetchSubsessionDetails', data).pipe(
      catchError(errorRes => {
        const errorMessage = 'An Error Occured';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        return throwError(errorMessage);
      })
    );
  }

  sendPushNotification(body: string) {
    const headers = {
      'content-type': 'application/json',
      'Authorization': 'key=' + this.firebaseServerKey
    };
    return this.http.post(this.firebaseUrl, body, { 'headers': headers })
  }
}
