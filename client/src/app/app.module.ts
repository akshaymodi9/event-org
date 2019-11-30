import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { SharedEventComponent } from './shared-event/shared-event.component';
import { ArchivedEventComponent } from './archived-event/archived-event.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    LoginComponent,
    SharedEventComponent,
    ArchivedEventComponent,
    SearchPipe,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
