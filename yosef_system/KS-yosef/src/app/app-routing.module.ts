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
import { AddPartsComponentComponent } from './add-parts-component/add-parts-component.component';
import { SupliersPageComponentComponent } from './supliers-page-component/supliers-page-component.component';
import { AddSupliersPageComponentComponent} from './add-supliers-page-component/add-supliers-page-component.component';
import { PartsPurchaseComponent } from './parts-purchase/parts-purchase.component';
import { PurchasePartsComponent } from './purchase-parts/purchase-parts.component';
import { PartsStockComponent } from './parts-stock/parts-stock.component';
import { SellPartsListComponent } from './sell-parts-list/sell-parts-list.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SellPartsComponent } from './sell-parts/sell-parts.component';
import { ImportComponent } from './import/import.component';
import { AddImportComponent } from './add-import/add-import.component';
import { DistributeComponent} from './distribute/distribute.component';

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
    path : 'import',
    component : ImportComponent
  },
  {
    path : 'import/add',
    component : AddImportComponent
  },
  { path : 'distribute',
    component : DistributeComponent  
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
  
  },
  {
    path: 'repair/add',
    component: AddRepairComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'parts/add',
    component: AddPartsComponentComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'supliers', 
    component: SupliersPageComponentComponent, 
    canActivate: [AuthGuard]
  }, 
  {
    path: 'supliers/add', 
    component: AddSupliersPageComponentComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'parts/purchase', 
    component: PartsPurchaseComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'purchase', 
    component: PurchasePartsComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'parts/stock', 
    component: PartsStockComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'sell/partslist', 
    component: SellPartsListComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'purchase/invoice', 
    component: PurchaseInvoiceComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'generate/invoice', 
    component: InvoiceComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'sell/parts',
    component: SellPartsComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
