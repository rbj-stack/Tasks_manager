import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';
import { Observable } from 'rxjs';

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
  getTasks(dayId:String){
    return this.webreqservice.get(`days/${dayId}/tasks`);
    
  }

 
  createTasks(label:String,decsription:String,dueDate:String,type:String,dayId:String){

    // send web request to create new task
    return this.webreqservice.post(`days/${dayId}/tasks`,{label,decsription,dueDate,type,dayId});
  }


   complete(task:any){
    
     return this.webreqservice.patch(`days/${task._dayId}/tasks/${task._id}`,{
       completed:!task.completed
     });
   }

}
