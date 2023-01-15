import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Proyects from '../model/proyects.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectsService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public getProyects(): Observable<Proyects[]> {
    return this.httpClient.get<Proyects[]>(`${this.URL}/get/pro`);
  }

  public addProyect(proyect: Proyects): Observable<Proyects> {
    return this.httpClient.post<Proyects>(`${this.URL}/add/pro`, proyect);
  }
  public updateProyect(proyect: Proyects): Observable<Proyects> {
    return this.httpClient.put<Proyects>(
      `${this.URL}/edit/pro/${proyect.id}`,
      proyect
    );
  }
  public deleteProyect(id: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/delete/pro/${id}`);
  }
}
