import { Component, ViewEncapsulation } from '@angular/core';

import { RowClassArgs } from '@progress/kendo-angular-treelist';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  // constructor(
  //   private modalService: BsModalService
  // ){}
  constructor(){}
  public gridData: any = [
    {
      ProductID: 1,
      ProductName: "Chai",
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 2,
      ProductName: "Chang",
      UnitPrice: 19,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 3,
      ProductName: "Aniseed Syrup",
      UnitPrice: 10,
      Category: {
        CategoryID: 2,
        CategoryName: "Condiments",
      },
    },
  ];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  eliminar_elemento(dataItem:any){
    console.log(dataItem);
    this.gridData.splice(this.gridData.indexOf(dataItem), 1);
  }
  // abrir_modal(template: any){
  //   console.log("abrir modal");
  //   this.modalService.show(template, {class: 'modal-sm'});
  // }
}
