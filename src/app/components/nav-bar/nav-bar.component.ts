import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Persona from 'src/app/model/persona.model';
import SocialM from 'src/app/model/socialM.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SocialService } from 'src/app/services/social.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  persona: Persona = new Persona(0, '', '', '', '', '', '', '', '', '');
  socialM: SocialM = new SocialM(0, '', '', '', '', '');
  contactFormPersona!: FormGroup;
  contactFormCredentials!: FormGroup;
  isLog = this.authService.islog();

  constructor(
    private personaService: PersonaService,
    private authService: AuthService,
    private socialMService: SocialService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPersona();
    this.contactFormPersona = this.initFormPersona();

    this.socialMService.getSocialM().subscribe((data) => {
      this.socialM = data[0];
    });
  }

  succesAlert(message: String) {
    return Swal.fire({
      title: 'Succes',
      text: message.valueOf(),
      icon: 'success',
      iconColor: 'black',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  errorAlert(message: String) {
    return Swal.fire({
      title: 'Error',
      text: message.valueOf(),
      icon: 'error',
      iconColor: 'black',
      showConfirmButton: false,
      timer: 2500,
    });
  }
  logout(): void {
    this.authService.logOut();
  }

  public getPersona(): void {
    this.personaService.getPersona().subscribe((data) => {
      this.persona = data[0];
      sessionStorage.setItem('currentUserId', JSON.stringify(data[0].id));
      sessionStorage.setItem(
        'currentUserDNI',
        JSON.stringify(data[0].dni_persona)
      );
    });
  }

  updatePersona(contactForm: FormGroup) {
    if (this.contactFormPersona.valid) {
      console.log(contactForm.value);
      this.personaService.updatePersona(contactForm.value).subscribe({
        next: (response: Persona) => {
          this.succesAlert('Update ok');
          this.getPersona();
        },
        error: (error: HttpErrorResponse) => {
          this.errorAlert(error.statusText);
        },
      });
    } else {
      this.errorAlert('Name, Surname and DNI');
    }
  }

  // formMethod Persona

  initFormPersona(): FormGroup {
    return this.fb.group({
      id: [''],
      name_persona: ['', Validators.required],
      surname_persona: ['', Validators.required],
      dni_persona: ['', Validators.required],
      telephone_persona: [''],
      photo_url: [''],
      main_phrase: [''],
      phrase1: [''],
      phrase2: [''],
      phrase3: [''],
    });
  }

  onPatchValuePersona(data: any): any {
    return this.contactFormPersona.patchValue({
      id: data.id,
      name_persona: data.name_persona,
      surname_persona: data.surname_persona,
      dni_persona: data.dni_persona,
      telephone_persona: data.telephone_persona,
      photo_url: data.photo_url,
      main_phrase: data.main_phrase,
      phrase1: data.phrase1,
      phrase2: data.phrase2,
      phrase3: data.phrase3,
    });
  }
}
