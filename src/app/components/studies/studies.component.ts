import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Studies from 'src/app/model/studies.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { StudiesService } from 'src/app/services/studies.service';

import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css'],
})
export class StudiesComponent implements OnInit {
  //portada switch
  hide: Boolean = false;
  //log service
  isLog = this.authService.islog();
  //studies managment
  public studies: Studies[] = [];
  public studie?: Studies;
  // Forms
  contactForm!: FormGroup;

  defaultImgValue: String = 'https://iili.io/HTILtsa.png';

  constructor(
    private studiesService: StudiesService,
    private authService: AuthService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStudies();
    this.contactForm = this.initForm();
  }

  succesAlert(message: String) {
    return Swal.fire({
      title: 'Succes',
      text: message.valueOf(),
      icon: 'success',
      iconColor: 'Black',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  errorAlert(message: String) {
    return Swal.fire({
      title: 'Error',
      text: message.valueOf(),
      icon: 'error',
      iconColor: 'Black',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  unfold(): void {
    this.hide = !!!this.hide;
  }
  // Crud methods
  public getStudies(): void {
    this.studiesService.getStudies().subscribe({
      next: (response: Studies[]) => {
        this.studies = response;
      },
      error: (error: HttpErrorResponse) => {
        this.errorAlert(error.statusText);
      },
    });
  }

  public addStudies(contactForm: FormGroup) {
    if (this.contactForm.valid) {
      this.studiesService.addStudie(contactForm.value).subscribe({
        next: (response: Studies) => {
          this.getStudies();
          this.succesAlert('Add ok');
        },
        error: (error: HttpErrorResponse) => {
          this.errorAlert(error.statusText);
          this.getStudies();
        },
      });
    } else {
      this.errorAlert(
        'Title, Inst, description, start and end date is required'
      );
    }
  }

  updateStudies(contactForm: FormGroup) {
    if (this.contactForm.valid) {
      this.studiesService.updateStudie(contactForm.value).subscribe({
        next: (response: Studies) => {
          this.getStudies();
          this.succesAlert('Update ok');
        },
        error: (error: HttpErrorResponse) => {
          this.errorAlert(error.statusText);
        },
      });
    } else {
      this.errorAlert(
        'Title, Inst, description, start and end date is required'
      );
    }
  }

  public deleteStudie(id: Number): void {
    this.studiesService.deleteStudie(id).subscribe({
      next: (response: void) => {
        this.getStudies();
        this.succesAlert('Delete ok');
      },
      error: (error: HttpErrorResponse) => {
        this.errorAlert(error.statusText);
        this.getStudies();
      },
    });
  }

  // ngFor method

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  // formMethod

  initForm(): FormGroup {
    return this.fb.group({
      id: [''],
      title_st: ['', Validators.required],
      institution_st: ['', Validators.required],
      description_st: ['', Validators.required],
      endDate_st: ['', Validators.required],
      startDate_st: ['', Validators.required],
      img_st: [''],
      persona_id: [
        sessionStorage.getItem('currentUserId'),
        Validators.required,
      ],
      persona_DNI_persona: [
        sessionStorage.getItem('currentUserDNI'),
        Validators.required,
      ],
    });
  }

  onPatchValue(data: any): any {
    return this.contactForm.patchValue({
      id: data.id,
      title_st: data.title_st,
      institution_st: data.institution_st,
      description_st: data.description_st,
      endDate_st: data.endDate_st,
      startDate_st: data.startDate_st,
      img_st: data.img_st,
      persona_id: data.persona_id,
      persona_DNI_persona: data.persona_DNI_persona,
    });
  }
}
