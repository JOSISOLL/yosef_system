import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import {NewrepairComponent} from './newrepair/newrepair.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { EstimateComponent } from './estimate/estimate.component'; 
import { SettingsCarComponent } from './settings-car/settings-car.component';
import { SettingsPartsManufacturerComponent } from './settings-parts-manufacturer/settings-parts-manufacturer.component';
import { SettingsColorDoorComponent } from './settings-color-door/settings-color-door.component';
import { AddRepairComponent } from './add-repair/add-repair.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/add',
    component: NewCustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'repair',
    component: NewrepairComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'dashboard',
    component: DashboardMainComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path:'customer', 
    component: CustomerMainComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path:'estimate', 
    component: EstimateComponent ,
    canActivate: [AuthGuard]
  }, 
  {
    path:'settings/car', 
    component: SettingsCarComponent ,
    canActivate: [AuthGuard]
  }, 
  {
    path:'settings/parts-manufacturer', 
    component: SettingsPartsManufacturerComponent ,
    canActivate: [AuthGuard]
  }, 
  {
    path:'settings/color-and-door', 
    component: SettingsColorDoorComponent ,
    canActivate: [AuthGuard]
<<<<<<< HEAD
  } 
=======
  },
  {
    path: 'repair/add',
    component: AddRepairComponent,
    canActivate: [AuthGuard]
  }  
>>>>>>> af368ec57dd3232c37fca97dba7f7d547b086fe9
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
