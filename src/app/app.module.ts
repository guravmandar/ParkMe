import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent} from './component/login.component';
import { SearchComponent} from './component/search.component';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpModule } from '@angular/http';
import { LoggedInGuard } from './logged-in.guard';
import { LoginService} from './services/login.service'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent},
  { path: 'Home', component: AppComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcTG2j1NvrCP4NTaS3fqO6BCLqjleio3E',
      libraries: ["places"]
    }),
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [GoogleMapsAPIWrapper,LoginService,LoggedInGuard],
  declarations: [ AppComponent,LoginComponent,SearchComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}