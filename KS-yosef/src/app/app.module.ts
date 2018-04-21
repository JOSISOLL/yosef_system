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





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavComponent,
    HeaderComponent,
    NewCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule
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
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
