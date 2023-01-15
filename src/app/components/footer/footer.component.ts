import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Email from 'src/app/model/email.model';
import Persona from 'src/app/model/persona.model';
import SocialM from 'src/app/model/socialM.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { MailerServiceService } from 'src/app/services/mailer-service.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SocialService } from 'src/app/services/social.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLog: Boolean = this.authService.islog();

  persona: Persona = new Persona(0, '', '', '', '', '', '', '', '', '');
  socialM: SocialM = new SocialM(0, '', '', '', '', '');

  contactFormSocialM!: FormGroup;
  contactFormMailer!: FormGroup;

  sending: Boolean = false
 

  constructor(
    private getPersonaService: PersonaService,
    private socialMService: SocialService,
    private authService: AuthService,
    private readonly fb: FormBuilder,
    private mailService: MailerServiceService
  ) {}

  ngOnInit(): void {
    this.getPersona();
    this.getSocialM();
    this.contactFormSocialM = this.initFormSocialM();
    this.contactFormMailer = this.initFormMailer();
  }

  succesAlert(message: String) {
    return  Swal.fire({
      title: 'Succes',
      text: message.valueOf(),
      icon: 'success',
      iconColor: "Black",
      showConfirmButton: false,
      timer: 2500
    })
  }

  errorAlert(message: String) {
    return  Swal.fire({
      title: 'Error',
      text: message.valueOf(),
      icon: 'error',
      iconColor: "Black",
      showConfirmButton: false,
      timer: 2500
    })
  }

  getSocialM() {
    this.socialMService.getSocialM().subscribe((data) => {
      this.socialM = data[0];
    });
  }

  updateSocialM(contactForm: FormGroup) {
    if (this.contactFormSocialM.valid){
    this.socialMService.updateSocialM(contactForm.value).subscribe({
      next: (response: SocialM) => {
        this.succesAlert('Social Media Updated');
        this.getSocialM();
      },
      error: (error: HttpErrorResponse) => {
        this.errorAlert(error.statusText);
      },
    });
  
  } else {
    this.errorAlert("Use a real email")
  }
  
}

  getPersona() {
    this.getPersonaService.getPersona().subscribe((data) => {
      this.persona = data[0];
    });
  }

  sendMail(contactForm: FormGroup) {
      this.sending = true
    this.mailService.sendMail(this.contactFormMailer.value).subscribe({
      
      next: (response: Email) => {
        this.sending = false
        this.succesAlert('Your email has been sent');
        this.contactFormMailer.reset();
      },
      
      error: (error: HttpErrorResponse) => {
        this.sending = false
        this.errorAlert(error.statusText);
      },
    });
  }

  // formSocialM
  initFormSocialM(): FormGroup {
    return this.fb.group({
      id: [''],
      instagram: [''],
      facebook: [''],
      linkedin: [''],
      github: [''],
      gmail: ['', Validators.email],

      persona_id: [sessionStorage.getItem("currentUserId"), Validators.required],
      persona_DNI_persona: [sessionStorage.getItem("currentUserDNI"), Validators.required],
    });
  }

  onPatchValueSocialM(data: any): any {
    return this.contactFormSocialM.patchValue({
      id: data.id,
      instagram: data.instagram,
      facebook: data.facebook,
      linkedin: data.linkedin,
      github: data.github,
      gmail: data.gmail,

      persona_id: data.persona_id,
      persona_DNI_persona: data.persona_DNI_persona,
    });
  }

  // formMailer
  initFormMailer(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]], 
      surname: ['', [Validators.required, Validators.maxLength(25)] ],
      email: ['', [Validators.required,Validators.maxLength(50), Validators.email]],
      mensaje: ['', [ Validators.required, Validators.maxLength(255)] ],
    });
  }
}
