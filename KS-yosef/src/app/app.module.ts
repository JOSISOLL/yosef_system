import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';
import { ClientService } from './client.service';
import { HistoryService } from './history.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';
import { LoginGuard } from './login.guard';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { NewrepairComponent } from './newrepair/newrepair.component';
import { SideBarNavComponent } from './side-bar-nav/side-bar-nav.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ControllNavComponent } from './controll-nav/controll-nav.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { EstimateComponent } from './estimate/estimate.component';
import { SettingsCarComponent } from './settings-car/settings-car.component';
import { SettingsPartsManufacturerComponent } from './settings-parts-manufacturer/settings-parts-manufacturer.component';
import { SettingsColorDoorComponent } from './settings-color-door/settings-color-door.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from './services/customer.service';
import { AddRepairComponent } from './add-repair/add-repair.component';
import {RepairService } from './repair.service';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavComponent,
    HeaderComponent,
    NewCustomerComponent,
    NewrepairComponent,
    SideBarNavComponent,
    HeaderNavComponent,
    FooterComponent,
    ControllNavComponent,
    DashboardMainComponent,
    CustomerMainComponent,
    EstimateComponent,
    SettingsCarComponent,
    SettingsPartsManufacturerComponent,
    SettingsColorDoorComponent,
    AddRepairComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    HistoryService,
    ClientService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LoginGuard,
    CustomerService,
    RepairService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
