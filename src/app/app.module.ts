import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileTemplateComponent } from './profile-template/profile-template.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS,HttpClientModule} from '@angular/common/http';
import { HttpResponseInterceptor } from './Services/HTTPInterceptors/HTTPResponse';
import { UserProfileServiceService } from './Services/CommonServices/user-profile-service.service';
import { UniqueDataCheckService } from './ValidationFile/AsynchronousValidation/unique-data-check.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ProfileTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserProfileServiceService,
    UniqueDataCheckService,
    {provide:HTTP_INTERCEPTORS,useClass:HttpResponseInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
