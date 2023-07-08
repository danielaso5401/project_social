import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/public/login/login/login.component';
import { HomeComponent } from './layout/private/home/home.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FilterModule } from '@progress/kendo-angular-filter';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ListBoxModule } from '@progress/kendo-angular-listbox';
import { MenuModule } from '@progress/kendo-angular-menu';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { PagerModule } from '@progress/kendo-angular-pager';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PivotGridModule } from '@progress/kendo-angular-pivotgrid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { GanttModule } from '@progress/kendo-angular-gantt';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    DropDownsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    InputsModule,
    DialogsModule,
    ExcelExportModule,
    EditorModule,
    FilterModule,
    GaugesModule,
    IconsModule,
    IndicatorsModule,
    LabelModule,
    LayoutModule,
    ListBoxModule,
    MenuModule,
    NavigationModule,
    NotificationModule,
    PagerModule,
    PDFExportModule,
    PivotGridModule,
    PopupModule,
    RippleModule,
    SchedulerModule,
    ScrollViewModule,
    SortableModule,
    ToolBarModule,
    GanttModule,
    GridModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
