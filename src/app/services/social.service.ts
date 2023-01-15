import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import SocialM from '../model/socialM.model';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public getSocialM(): Observable<SocialM[]> {
    return this.httpClient.get<SocialM[]>(`${this.URL}/get/social`);
  }

  public updateSocialM(social: SocialM): Observable<SocialM> {
    return this.httpClient.put<SocialM>(
      `${this.URL}/edit/social/${social.id}`,
      social
    );
  }
}
