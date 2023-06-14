import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/public/login/login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'IniciarSesion', component: LoginComponent },
  { path: '**', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
