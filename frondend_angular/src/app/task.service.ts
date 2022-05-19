import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webreqservice:WebrequestService) { }

  createDay(title:String){

    // send web request to create new day
    return this.webreqservice.post('days',{title});
  }
  getDays(){
    return this.webreqservice.get('days');
  }
  getTasks(dayId:string){
    return this.webreqservice.get(`days/${dayId}/tasks`);
    
  }
}
