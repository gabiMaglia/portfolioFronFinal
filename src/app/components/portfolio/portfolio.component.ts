import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Proyects from 'src/app/model/proyects.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { ProyectsService } from 'src/app/services/proyects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  isLog: Boolean = this.authService.islog();

  jobs?: Proyects[];
  img?: String[];

  contactFormJob!: FormGroup;

  constructor(
    private proyectService: ProyectsService,
    private authService: AuthService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProyects();
    this.contactFormJob = this.initFormJob();
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

  // CRUD
  getProyects(): void {
    this.proyectService.getProyects().subscribe((data) => {
      this.jobs = data;
      this.getCarrouselImg(this.jobs);
    });
  }
  getCarrouselImg(data: Proyects[]): String[] {
    this.img = new Array();
    this.img.push(data[0].img1_pro, data[0].img2_pro, data[0].img3_pro);
    return this.img;
  }

  public addProyect(contactForm: FormGroup) {
    if (this.contactFormJob.valid) {
      this.proyectService.addProyect(contactForm.value).subscribe({
        next: (response: Proyects) => {
          this.getProyects();
          this.succesAlert('Add ok');
        },
        error: (error: HttpErrorResponse) => {
          this.errorAlert(error.statusText);
          this.getProyects();
        },
      });
    } else {
      this.errorAlert('Title and description required');
    }
  }

  updateProyect(contactForm: FormGroup) {
    this.proyectService.updateProyect(contactForm.value).subscribe({
      next: (response: Proyects) => {
        this.getProyects();
        this.succesAlert('Update ok');
      },
      error: (error: HttpErrorResponse) => {
        this.errorAlert(error.statusText);
      },
    });
  }

  public deleteProyect(id: Number): void {
    this.proyectService.deleteProyect(id).subscribe({
      next: (response: void) => {
        this.getProyects();
        this.succesAlert('Delete ok');
      },
      error: (error: HttpErrorResponse) => {
        this.errorAlert(error.statusText);
        this.getProyects();
      },
    });
  }

  // ngFor method

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  // formMethods proyects

  initFormJob(): FormGroup {
    return this.fb.group({
      id: [''],
      title_pro: ['', Validators.required],
      technologies_pro: [''],
      description_pro: ['', Validators.required],
      deployLink_pro: [''],
      githubLink_pro: [''],
      img1_pro: [''],
      img2_pro: [''],
      img3_pro: [''],

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

  onPatchValueJob(data: any): any {
    return this.contactFormJob.patchValue({
      id: data.id,
      title_pro: data.title_pro,
      technologies_pro: data.technologies_pro,
      description_pro: data.description_pro,
      deployLink_pro: data.deployLink_pro,
      githubLink_pro: data.githubLink_pro,
      img1_pro: data.img1_pro,
      img2_pro: data.img2_pro,
      img3_pro: data.img3_pro,
    });
  }
}
