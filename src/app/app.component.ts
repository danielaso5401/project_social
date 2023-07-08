import { Component } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SVGIcon, bellIcon, calendarIcon, deliciousIcon, envelopLinkIcon, graphIcon, inboxIcon, inheritedIcon, menuIcon, myspaceBoxIcon, starOutlineIcon, userIcon } from '@progress/kendo-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HomeComponent } from './layout/private/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  currentUrl = this.location.path();

  title = 'project_social';

  public selected = "Inbox";
  public menuSvg: SVGIcon = menuIcon;

  public items: Array<DrawerItem> = [
    { text: "Usuarios", svgIcon: userIcon, selected: true},
    { separator: true },
    { text: "Roles", svgIcon: deliciousIcon },
    { text: "Salud", svgIcon: inheritedIcon },
    { separator: true },
    { text: "Psicología", svgIcon: myspaceBoxIcon },
    { text: "Educación", svgIcon: graphIcon },
  ];
  ngOnInit(): void {
    console.log("dasd",this.currentUrl)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  isMiComponenteEspecifico(): boolean {
    // Obtener la ruta actual
    console.log("yurl",this.currentUrl)
    // Verificar si el componente actual es "MiComponenteEspecifico"
    return this.currentUrl.includes('LoginComponent');
  }
  onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }
}
