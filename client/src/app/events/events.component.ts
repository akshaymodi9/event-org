import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  @ViewChild('auto',{static: false}) auto;

  public username: String = ''
  public id;
  public allEvents = []
  public events = []
  public date = new Date()
  public search1 = '';
  public keyword = 'name';
  public user = [];
  public userList = [];
  public checkedList = [];
  public placeHolder = 'Search for user'
  public searchText = ''

  eventForm = new FormGroup({
    id: new FormControl(''),
    event_name: new FormControl(''),
    location: new FormControl(''),
    description: new FormControl(''),
    event_date: new FormControl(new Date()),
    owner_id: new FormControl(parseInt(localStorage.getItem('id')))

  })

  constructor(private router: Router, private apiService: ApiService,private toastr: ToastrService) {

    this.username = localStorage.getItem('name')
    this.id = localStorage.getItem('id')


    this.apiService.getEvents(this.id)
      .subscribe(res => {
        this.allEvents = res
        // console.log("a",this.allEvents)
        
        this.apiService.setEventData(this.allEvents)
      }, () => { }, () => {
        this.allEvents.map(data => {
          if (new Date(data.event_date) >= this.date) {
            this.events.push(data)
          }
        })
      })
  }

  ngOnInit() {
    // $('#addModal').modal()
    // $('#datetimepicker1').datetimepicker();

  }

  public initialize() {
    this.eventForm.reset()
  }


  public onSubmit() {
    this.eventForm.value.owner_id = parseInt(localStorage.getItem('id'))
    // console.log("ada",this.eventForm.value)
    this.apiService.addEvent(this.eventForm.value)
      .subscribe(res => {
        this.toastr.success(res.msg);
        this.apiService.getEvents(this.id)
          .subscribe(res => {
            this.allEvents = res
            this.apiService.setEventData(this.allEvents)
          }, () => { }, () => {
            this.events = []
            this.allEvents.map(data => {
              if (new Date(data.event_date) >= this.date) {
                this.events.push(data)
              }
            })
          })
      })


    $('#addModal').modal("hide")
  }

  public logout() {
    localStorage.clear()
    this.router.navigateByUrl('')
  }

  public deleteEvent(event) {
    // console.log("asaaaa",event)
    this.apiService.deleteEvent(event.id)
      .subscribe(res => {
        this.toastr.success(res.msg);
        this.apiService.getEvents(this.id)
          .subscribe(res => {
            this.allEvents = res
            this.apiService.setEventData(this.allEvents)
          }, () => { }, () => {
            this.events = []
            this.allEvents.map(data => {
              if (new Date(data.event_date) >= this.date) {
                this.events.push(data)
              }
            })
          })
      })
  }

  public editEvent() {
    // console.log("ada",this.eventForm.value)

    this.apiService.editEvent(this.eventForm.value.id, this.eventForm.value)
      .subscribe(res => {
        this.toastr.success(res.msg);
        this.apiService.getEvents(this.id)
          .subscribe(res => {
            this.allEvents = res
            this.apiService.setEventData(this.allEvents)
          }, () => { }, () => {
            this.events = []
            this.allEvents.map(data => {
              if (new Date(data.event_date) >= this.date) {
                this.events.push(data)
              }
            })
          })
      })

    $('#editModal').modal("hide")
  }

  public populateValue(event) {
    // console.log(event)
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(event.event_date, p)
    event.event_date = dtr
    this.eventForm.patchValue(event)

  }
  selectEvent(item) {
    // do something with selected item
    if (!this.checkedList.some(data=>data.id == item.id)) {
      this.checkedList.push(item)
    }
  }

  public onChangeSearch(val: string) {

    if (val) {
      this.apiService.searchUsers(val)
        .subscribe(res => this.user = res,
          () => { },
          () => {
            this.userList = []
            this.user.map(data => {
              if (data.id != parseInt(localStorage.getItem('id'))) {
                let obj = {
                  id: data.id,
                  name: data.user_name
                }
                this.userList.push(obj)
              }
            })

          })
    }
  }

  public remove(name) {
    this.checkedList.splice(this.checkedList.indexOf(name), 1)
  }

  public share() {

    let arr = []
    this.checkedList.map(data => {
      arr.push(data.id)
    })
    let obj = {
      event_id: this.eventForm.value.id,
      event_name: this.eventForm.value.event_name,
      user_id: arr,
      owner_id: this.eventForm.value.owner_id
    }
    this.apiService.shareEvent(obj)
    .subscribe(res=>this.toastr.success(res.msg))
    this.checkedList = []
    // this.auto.clear();
    $('#shareModal').modal("hide")
  }


  onFocused(e) {
    // do something when input is focused
  }

}
