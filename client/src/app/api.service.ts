import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:5000/api"

  // private SERVER_URL = "http://54.80.71.136/api";
  private eventData = new BehaviorSubject<any>(null);
  public eventData$ = this.eventData.asObservable();

  constructor(private httpClient: HttpClient) { }

  public validateLogin(email,password):Observable<any>{
    let newUrl = `${this.SERVER_URL}/auth/login`
    let obj = {
      "email" : email,
      "password" : password
    }
    return this.httpClient.post(newUrl,obj);
    
  }

  public registerUser(data):Observable<any>{
    let newUrl = `${this.SERVER_URL}/auth/register`
    return this.httpClient.post(newUrl,data)
  }

  public addEvent(obj):Observable<any>{
    let newUrl = `${this.SERVER_URL}/event`
    return this.httpClient.post(newUrl,obj);
  }

  public getEvents(userId):Observable<any>{
    let newUrl = `${this.SERVER_URL}/${userId}`
    return this.httpClient.get(newUrl);
  }

  public deleteEvent(eventId):Observable<any>{
    let newUrl = `${this.SERVER_URL}/event/${eventId}`
    return this.httpClient.delete(newUrl);
  }

  public editEvent(eventId,obj):Observable<any>{
    let newUrl = `${this.SERVER_URL}/event/${eventId}`
    return this.httpClient.put(newUrl,obj)
  }

  public searchUsers(user):Observable<any>{
    let newUrl = `${this.SERVER_URL}/auth/searchUser/${user}`
    return this.httpClient.get(newUrl)
  }

  public shareEvent(obj):Observable<any>{
    let newUrl = `${this.SERVER_URL}/shareevent`
    return this.httpClient.post(newUrl,obj)
  }

  public getSharedEvents(userId):Observable<any>{
    let newUrl = `${this.SERVER_URL}/getSharedEvent/${userId}`
    return this.httpClient.get(newUrl)
  }

  public revokeSharedEvent(eventId,userId):Observable<any>{
    let newUrl = `${this.SERVER_URL}/revokeSharedEvent/${eventId}/${userId}`
    return this.httpClient.delete(newUrl)

  }

  public setEventData(data){
    this.eventData.next(data)
  }

}
