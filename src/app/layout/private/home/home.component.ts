import { Component, ViewEncapsulation } from '@angular/core';

import { RowClassArgs } from '@progress/kendo-angular-treelist';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Size } from '@progress/kendo-drawing/dist/npm/geometry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SVGIcon, bellIcon, calendarIcon, deliciousIcon, envelopLinkIcon, graphIcon, inboxIcon, inheritedIcon, menuIcon, myspaceBoxIcon, starOutlineIcon, userIcon } from '@progress/kendo-svg-icons';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { LinkService } from 'src/app/shared/services/link.service';
import { constApi } from 'src/environments/constApi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private linkService: LinkService,
  ){}

  form!: FormGroup;
  validar: boolean = false;




  listaRoles: any;

  gridDataUsuarios : any ;
  chargeGrid : boolean = false;
  formGroupToObject(formGroup: FormGroup): any {
    return formGroup.value;
  }
  ngOnInit(): void {
    this.buildForm();
    this.cargarDatos();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  getRolNombre(idRol: number): string {
    const rol = this.listaRoles.find((x:any) => x.IdRol === idRol);
    return rol ? rol.Nombre : '';
  }
  cargarDatos(){
    this.linkService.getJsonResponse(constApi.obtenerRoles).subscribe({
      next: (resp:any)=> {
        console.log(resp.body.roles);
        this.listaRoles = resp.body.roles;
        this.listaRoles = this.listaRoles.concat({IdRol: 0, Nombre: 'Seleccione un rol'});
      },
      error: (error:any)=>{

      }
    })
    this.cargaUsuarios()

  }
  cargaUsuarios(){
    this.chargeGrid = true;
    this.linkService.getJsonResponse(constApi.obtenerUsuarios).subscribe({
      next: (resp : any) => {
        console.log(resp.body.usuarios);
        this.gridDataUsuarios = resp.body.usuarios;
        this.chargeGrid = false;
      },
      error: (error: any) => {
        this.chargeGrid = false;
      }
    })
  }
  buildForm() {
    this.form = this.formBuilder.group({
      IdUsuario:[0],
      Nombre: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      Direccion: ['', Validators.required],
      Celular: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      DocumentoIdentidad: ['', Validators.required],
      Contrasena: ['', Validators.required],
      rol: [ 0, Validators.required]
    });
  }
  eliminar_elemento(dataItem:any){
    console.log(dataItem);
    this.linkService.getJsonResponse(constApi.eliminarUsuario + '/' + dataItem.IdUsuario).subscribe({
      next: (resp:any) => {
        this.gridDataUsuarios.splice(this.gridDataUsuarios.indexOf(dataItem), 1);
      },
      error: (error:any) => {
        alert('Error al eliminar usuario');
      }
    })
  }
  guardar_elemento(){
    if (this.form.invalid) {
      alert('Tienes que completar todos los campos')
      return;
    }
    let obj = {
      Nombre: this.form.value.Nombre,
      ApellidoMaterno: this.form.value.ApellidoMaterno,
      ApellidoPaterno: this.form.value.ApellidoPaterno,
      Direccion: this.form.value.Direccion,
      Celular: this.form.value.Celular,
      FechaNacimiento: this.form.value.FechaNacimiento,
      DocumentoIdentidad: this.form.value.DocumentoIdentidad,
      Contrasena: this.form.value.Contrasena,
      IdRol: this.form.value.rol.IdRol,
      UsuarioCreacion: 'admin',
      UsuarioModificacion: 'admin',
    }
    this.modalService.dismissAll();
    this.linkService.postJsonResponse(constApi.registrarUsuario, obj).subscribe({
      next: (resp:any) => {
        console.log("usuario registrado")
        this.cargaUsuarios();
      },
      error: (error:any) => {
        alert('Error al registrar usuario');
      }
    })
    // this.gridDataUsuarios = this.gridDataUsuarios.concat(this.form.value);
    // this.modalService.dismissAll();
  }

  actualizar_elemento(){
    if (this.form.invalid) {
      alert('Tienes que completar todos los campos')
      return;
    }
    console.log(this.form.value);
    let obj = {
      Nombre: this.form.value.Nombre,
      ApellidoMaterno: this.form.value.ApellidoMaterno,
      ApellidoPaterno: this.form.value.ApellidoPaterno,
      Direccion: this.form.value.Direccion,
      Celular: this.form.value.Celular,
      FechaNacimiento: this.form.value.FechaNacimiento,
      DocumentoIdentidad: this.form.value.DocumentoIdentidad,
      Contrasena: this.form.value.Contrasena,
      IdRol: this.form.value.rol.IdRol,
      UsuarioCreacion: 'admin',
      UsuarioModificacion: 'admin',
    }
    this.modalService.dismissAll();
    this.linkService.postJsonResponse(constApi.actualizarUsuario + '/' + this.form.value.IdUsuario, obj).subscribe({
      next: (resp:any) => {
        console.log("usuario actualizado")
        this.cargaUsuarios();
      },
      error: (error:any) => {
        alert('Error al actualizar usuario');
      }
    })
  }
  open(content:any, event:any) {

    this.form.reset();
    if(event !== "new"){
      console.log(event.FechaNacimiento);
      const dateObj = new Date(Date.parse(event.FechaNacimiento));
      const formattedDate = dateObj.toISOString().substr(0, 10);
      this.form.get('IdUsuario')?.setValue(event.IdUsuario);
      this.form.get('Nombre')?.setValue(event.Nombre);
      this.form.get('ApellidoMaterno')?.setValue(event.ApellidoMaterno);
      this.form.get('ApellidoPaterno')?.setValue(event.ApellidoPaterno);
      this.form.get('DocumentoIdentidad')?.setValue(event.DocumentoIdentidad);
      this.form.get('FechaNacimiento')?.setValue(formattedDate);
      this.form.get('Direccion')?.setValue(event.Direccion);
      this.form.get('Celular')?.setValue(event.Celular);
      this.form.get('Contrasena')?.setValue(event.Contrasena);
      this.form.get('rol')?.setValue({IdRol: event.IdRol, Nombre: this.getRolNombre(event.IdRol)});
      // this.form.get('rol')?.setValue({id: event.rol.id, nombre: event.rol.nombre});
      this.validar = true;
    }
    else{
      this.validar = false;
    }
    this.modalService.open(content, {size:"lg"});

  }

}
