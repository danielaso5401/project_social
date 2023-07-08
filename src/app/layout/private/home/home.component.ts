import { Component, ViewEncapsulation } from '@angular/core';

import { RowClassArgs } from '@progress/kendo-angular-treelist';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Size } from '@progress/kendo-drawing/dist/npm/geometry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SVGIcon, bellIcon, calendarIcon, deliciousIcon, envelopLinkIcon, graphIcon, inboxIcon, inheritedIcon, menuIcon, myspaceBoxIcon, starOutlineIcon, userIcon } from '@progress/kendo-svg-icons';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { LinkService } from 'src/app/shared/services/link.service';
import { constApi } from 'src/environments/constApi';
import { randomBytes, pbkdf2Sync } from 'crypto';

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




  listaRoles: any = [
    { nombre: "<Roles>", id: null},
    { nombre: "Administrador", id: 1 },
    { nombre: "Enfermera", id: 2 },
    { nombre: "Psigcolaga", id: 3 },
  ];

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


  generatePasswordHash(
    password: string,
    method: string = "pbkdf2",
    saltLength: number = 16
  ): string {
    const salt = this.genSalt(saltLength);
    const [hashedPassword, actualMethod] = this.hashInternal(method, salt, password);
    return `${actualMethod}$${salt}$${hashedPassword}`;
  }
  
  genSalt(saltLength: number): string {
    const salt = randomBytes(Math.ceil(saltLength / 2)).toString('hex');
    return salt.slice(0, saltLength);
  }
  
  hashInternal(method: string, salt: string, password: string): [string, string] {
    const iterations = 600000; // Number of iterations
    const keyLength = 32; // Key length in bytes
    const hash = pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
    const hashedPassword = hash.toString('hex');
    return [hashedPassword, method];
  }
  

  cargarDatos(){
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
      Nombre: ['', Validators.required],
      ApellidoMaterno: ['', Validators.required],
      ApellidoPaterno: ['', Validators.required],
      Direccion: ['', Validators.required],
      Celular: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      DocumentoIdentidad: ['', Validators.required],
      Contrasena: ['', Validators.required],
      // rol: [ null, Validators.required]
    });
  }
  eliminar_elemento(dataItem:any){
    console.log(dataItem);
    this.gridDataUsuarios.splice(this.gridDataUsuarios.indexOf(dataItem), 1);
  }
  guardar_elemento(){
    const json = this.formGroupToObject(this.form);
    console.log(this.form.value);
    this.gridDataUsuarios = this.gridDataUsuarios.concat(this.form.value);
    this.modalService.dismissAll();
  }
  actualizar_elemento(){
    const json = this.formGroupToObject(this.form);
    console.log(json);
    this.gridDataUsuarios[this.gridDataUsuarios.indexOf(this.form.value)+1] = this.form.value;
    this.modalService.dismissAll();
  }
  open(content:any, event:any) {
    console.log(event.FechaNacimiento);
    const dateObj = new Date(Date.parse(event.FechaNacimiento));
    const formattedDate = dateObj.toISOString().substr(0, 10);

    const hashedPassword = this.generatePasswordHash(event.Contrasena);
    alert(hashedPassword);
console.log(hashedPassword);
    this.form.reset();
    if(event !== "new"){
      this.form.get('Nombre')?.setValue(event.Nombre);
      this.form.get('ApellidoMaterno')?.setValue(event.ApellidoMaterno);
      this.form.get('ApellidoPaterno')?.setValue(event.ApellidoPaterno);
      this.form.get('DocumentoIdentidad')?.setValue(event.DocumentoIdentidad);
      this.form.get('FechaNacimiento')?.setValue(formattedDate);
      this.form.get('Direccion')?.setValue(event.Direccion);
      this.form.get('Celular')?.setValue(event.Celular);
      this.form.get('Contrasena')?.setValue(event.Contrasena);
      // this.form.get('rol')?.setValue({id: event.rol.id, nombre: event.rol.nombre});
      this.validar = true;
    }
    else{
      this.validar = false;
    }
    this.modalService.open(content, {size:"lg"});

  }

}
