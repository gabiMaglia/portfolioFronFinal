import { Component, OnInit } from '@angular/core';
import Persona from 'src/app/model/persona.model';

import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent implements OnInit {
  catchPhrase!: String;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.getPhrase()
  }

  public getPhrase(): void {
    this.personaService.getPersona().subscribe((data) => {
      this.catchPhrase = data[0].main_phrase;

    });
  }
}
