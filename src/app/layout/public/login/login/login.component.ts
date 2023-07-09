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
    // this.router.navigateByUrl('/home');
    console.log(this.myForm.value);
    let objUser ={
      username: this.myForm.get('usuario')?.value,
      password: this.myForm.get('password')?.value,
    }
    this.linkService.postJsonResponse(constApi.RutaEjemplo,objUser).subscribe(
      {
        next: (resp : any) => {
          console.log(resp);
          if (this.myForm.get('recordar')?.value == true) {
            localStorage.setItem('token', resp.body.success);
          }
          this.router.navigateByUrl('/home');
        },
        error: (error: any) => {
          console.log(error);
          alert('Usuario o contraseña incorrectos');
        }
      }
    )

  }
  public Peticion(){
    const token = localStorage.getItem('token');
    // Verificar si el token existe y realizar las acciones correspondientes
    if (token) {
      this.router.navigateByUrl('/home')
    } else {
      alert('El usuario no está autenticado');
      // El usuario no está autenticado, redirige a la página de inicio de sesión.
    }
    // this.linkService.postJsonResponse(constApi.RutaEjemplo,{username: "123456789as", password: "admin12345"}).subscribe(
    //   {
    //     next: (resp : any) => {
    //       console.log(resp);
    //     },
    //     error: (error: any) => {
    //       console.log(error);
    //     }
    //   }
    // )
  }
}
