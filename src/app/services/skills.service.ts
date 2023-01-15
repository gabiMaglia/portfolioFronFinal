import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import Skills from '../model/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  URL = environment.server;
  constructor(private httpClient: HttpClient) {}

  public getSkills(): Observable<Skills[]> {
    return this.httpClient.get<Skills[]>(`${this.URL}/get/skill`);
  }
  public addSkills(skill: Skills): Observable<Skills> {
    return this.httpClient.post<Skills>(`${this.URL}/add/skill`, skill);
  }
  public updateSkills(skill: Skills): Observable<Skills> {
    return this.httpClient.put<Skills>(
      `${this.URL}/edit/skill/${skill.id}`,
      skill
    );
  }
  public deleteSkills(id: Number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/delete/skill/${id}`);
  }
}
