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
import { AddPartsComponentComponent } from './add-parts-component/add-parts-component.component';
import { SupliersPageComponentComponent } from './supliers-page-component/supliers-page-component.component';
import { AddSupliersPageComponentComponent } from './add-supliers-page-component/add-supliers-page-component.component';
import { SuplierService } from './services/suplier.service';
import { ManufaturerService } from './services/manufaturer.service';
import {RepairService } from './repair.service';

import { LabelBoxComponent } from './label-box/label-box.component';

import { PartsPurchaseComponent } from './parts-purchase/parts-purchase.component';
import { PurchasePartsComponent } from './purchase-parts/purchase-parts.component';
import { PartsStockComponent } from './parts-stock/parts-stock.component';
import { SellPartsListComponent } from './sell-parts-list/sell-parts-list.component';
import { PartsService } from './services/parts.service';

import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SellPartsComponent } from './sell-parts/sell-parts.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ACTIONS } from './store/actions';
import { reducers, metaReducers } from './store/reducers';
import { AllEffects } from './store/effects'
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { ImportComponent } from './import/import.component';
import { AddImportComponent } from './add-import/add-import.component';
import { DistributeComponent } from './distribute/distribute.component';
import { ImportedPartsComponent } from './imported-parts/imported-parts.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    AddRepairComponent,
    AddPartsComponentComponent,
    SupliersPageComponentComponent,
    AddSupliersPageComponentComponent,
    LabelBoxComponent,
    PartsPurchaseComponent,
    PurchasePartsComponent,
    PartsStockComponent,
    SellPartsListComponent,
    PurchaseInvoiceComponent,
    SellPartsListComponent,
    InvoiceComponent,
    SellPartsComponent,
    AddToCartComponent,
    ImportComponent,
    AddImportComponent,
    DistributeComponent,
    ImportedPartsComponent,
    CheckoutComponent
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers,
    ),
    AllEffects,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
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
    RepairService,
    SuplierService,
    ManufaturerService,
    PartsService,
    ACTIONS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
