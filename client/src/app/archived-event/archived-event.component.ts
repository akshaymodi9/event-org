import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-archived-event',
  templateUrl: './archived-event.component.html',
  styleUrls: ['./archived-event.component.css']
})
export class ArchivedEventComponent implements OnInit {

  public username: String = ''
  public archiveEvents = []
  public events = []
  constructor(private router: Router, private apiSerice: ApiService) {
    this.username = localStorage.getItem('name')
    this.apiSerice.eventData$.subscribe(res => this.events = res)
    let date = new Date()
    if (this.events) {
      this.events.map(data => {
        if (new Date(data.event_date) < date) {
          this.archiveEvents.push(data)
        }
      })
    }

  }

  ngOnInit() {
  }

  public logout() {
    localStorage.clear()
    this.router.navigateByUrl('')
  }
}
