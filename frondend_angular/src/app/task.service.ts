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

  UpdateDay(id:String,title:String){

    // send web request to create new day
    return this.webreqservice.patch(`days/${id}`,{title});
  }
  getDays(){
    return this.webreqservice.get('days');
  }

  deleteDay(id:String){
    return this.webreqservice.delete(`days/${id}`);
  }

  deleteTask(dayId:String,taskId:String){
    return this.webreqservice.delete(`days/${dayId}/tasks/${taskId}`);
  }
  getTasks(dayId:String){
    return this.webreqservice.get(`days/${dayId}/tasks`);
    
  }
  updateTask(label:String,decsription:String,dueDate:String,type:String,dayId:String,taskId:string) {
    // We want to send a web request to update a list
    return this.webreqservice.patch(`days/${dayId}/tasks/${taskId}`, { label,decsription,dueDate,type,taskId });
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
