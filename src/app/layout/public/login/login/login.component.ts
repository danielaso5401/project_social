import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkService } from 'src/app/shared/services/link.service';
import { constApi } from 'src/environments/constApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements  OnInit{

  public myForm!: FormGroup;

  constructor  (
    
    private fb: FormBuilder,
    private router: Router,
    private linkService: LinkService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
    this.Peticion();
  }
  private createMyForm(): FormGroup{
    return this.fb.group({
      usuario:[],
      password:[],
      recordar: false,
    })
  }
  public submitFormulario(){
    this.router.navigateByUrl('/home');
    console.log(this.myForm.value);
    
  }
  public Peticion(){
    this.linkService.postJsonResponse(constApi.RutaEjemplo,{username: "123456789as", password: "admin12345"}).subscribe(
      {
        next: (resp : any) => {
          console.log(resp);
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    )
  }
}
