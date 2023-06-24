import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements  OnInit{

  public myForm!: FormGroup;

  constructor  (
    private fb: FormBuilder
    ,private router: Router  
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
    this.router.navigateByUrl('/home');
    console.log(this.myForm.value);
    
  }
}
