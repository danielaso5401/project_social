import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LinkService } from 'src/app/shared/services/link.service';
import { constApi } from 'src/environments/constApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements  OnInit{

  public myForm!: FormGroup;

  constructor  (
    private fb: FormBuilder,
    private linkService: LinkService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }
  private createMyForm(): FormGroup{
    return this.fb.group({
      usuario:[],
      password:[],
      recordar: false,
    })
  }
  public submitFormulario(){
    console.log(this.myForm.value);
  }
  public Peticion(){
    this.linkService.getJsonResponse(constApi.RutaEjemplo).subscribe(
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
