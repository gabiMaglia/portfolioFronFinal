import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import Studies from '../model/studies.model';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public getStudies(): Observable<Studies[]> {
    return this.httpClient.get<Studies[]>(`${this.URL}/get/studies`);
  }
  public addStudie(studie: Studies): Observable<Studies> {
    return this.httpClient.post<Studies>(`${this.URL}/add/studies`, studie);
  }
  public updateStudie(studie: Studies): Observable<Studies> {
    return this.httpClient.put<Studies>(
      `${this.URL}/edit/studies/${studie.id}`,
      studie
    );
  }
  public deleteStudie(id: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/delete/studies/${id}`);
  }
}
