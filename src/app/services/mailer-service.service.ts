import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Email from '../model/email.model';

@Injectable({
  providedIn: 'root',
})
export class MailerServiceService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public sendMail(email: Email): Observable<Email> {
    return this.httpClient.post<Email>(`${this.URL}/send_email/`, email);
  }
}
