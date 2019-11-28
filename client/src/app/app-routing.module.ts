import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ArchivedEventComponent } from './archived-event/archived-event.component';
import { SharedEventComponent } from './shared-event/shared-event.component';



const routes: Routes = [
  {path:'' , component: LoginComponent},
  {path: 'events', component: EventsComponent},
  {path:'archived',component:ArchivedEventComponent},
  {path:'shared',component:SharedEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
