import { Component, ViewEncapsulation } from '@angular/core';

import { RowClassArgs } from '@progress/kendo-angular-treelist';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Size } from '@progress/kendo-drawing/dist/npm/geometry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ){} 

  form!: FormGroup;
  validar: boolean = false;

  listaRoles: any = [
    { nombre: "<Roles>", id: null},
    { nombre: "Administrador", id: 1 },
    { nombre: "Enfermera", id: 2 },
    { nombre: "Psigcolaga", id: 3 },
  ]; 

  gridDataUsuarios : any = [
    {
      id: 1,
      nombres: "Daniel",
      apellidos: "Huaita Carpio",
      documentoIdentidad: "76655328",
      fechaNacimiento: new Date(),
      correoElectronico: "dhuaitac@ulasalle.edu.pe",
      rol: {
        id: 1,
        nombre: "Administrador"
      }
    }
  ]
  formGroupToObject(formGroup: FormGroup): any {
    return formGroup.value;
  }
  ngOnInit(): void {
    this.buildForm();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  buildForm() {
    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      rol: [ null, Validators.required]
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
    this.form.reset();
    if(event !== "new"){
      this.form.get('nombres')?.setValue(event.nombres);
      this.form.get('apellidos')?.setValue(event.apellidos);
      this.form.get('documentoIdentidad')?.setValue(event.documentoIdentidad);
      this.form.get('fechaNacimiento')?.setValue(event.fechaNacimiento);
      this.form.get('correoElectronico')?.setValue(event.correoElectronico);
      this.form.get('rol')?.setValue({id: event.rol.id, nombre: event.rol.nombre});
      this.validar = true;
    }
    else{
      this.validar = false;
    }
    this.modalService.open(content, {size:"lg"});
    
  }
  
}
