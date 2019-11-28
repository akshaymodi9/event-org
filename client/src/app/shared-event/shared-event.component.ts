import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-shared-event',
  templateUrl: './shared-event.component.html',
  styleUrls: ['./shared-event.component.css']
})
export class SharedEventComponent implements OnInit {

  public username: String = ''
  public sharedEvents = []
  public id;
  constructor(private router: Router, private apiSerice: ApiService) {
    this.username = localStorage.getItem('name')
    this.id = parseInt(localStorage.getItem('id'))

    this.apiSerice.getSharedEvents(this.id)
      .subscribe(res => this.sharedEvents = res)
  }

  ngOnInit() {
    // console.log(this.apiSerice.eventData$.subscribe(res=>console.log("res",res)))

  }

  public revoke(event) {
    this.apiSerice.revokeSharedEvent(event.event_id, event.user_id)
      .subscribe(res => {
        this.apiSerice.getSharedEvents(this.id)
          .subscribe(res => this.sharedEvents = res)
      })
  }

  public logout() {
    localStorage.clear()
    this.router.navigateByUrl('')
  }

}
