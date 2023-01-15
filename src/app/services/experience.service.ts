import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Experience from '../model/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public getExp(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(`${this.URL}/get/experience`);
  }
  public addExp(experience: Experience): Observable<Experience> {
    return this.httpClient.post<Experience>(
      `${this.URL}/add/experience`,
      experience
    );
  }
  public updateExp(experience: Experience): Observable<Experience> {
    return this.httpClient.put<Experience>(
      `${this.URL}/edit/experience/${experience.id}`,
      experience
    );
  }
  public deleteExp(id: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/delete/experience/${id}`);
  }
}
