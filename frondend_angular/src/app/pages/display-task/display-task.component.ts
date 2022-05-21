import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Day } from 'src/app/models/day.model';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

  @Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.scss']
})


export class DisplayTaskComponent implements OnInit {

  // days = new Observable();
  // tasks = new Observable();

  constructor(private taskService:TaskService,private route: ActivatedRoute, private router: Router) {
  
   }

   days!: Day[];
   tasks!: Task[] | undefined;
   selectedDayId:string;
   
ngOnInit() {
        this.route.params.subscribe((params: Params) => {
          if (params.dayId){
            this.selectedDayId=params.dayId;
            console.log(params);
            this.taskService.getTasks(params['dayId']).subscribe((tasks: any ) => {
            this.tasks =tasks;
            // console.log(params.dayId);
          
            })
          }else{
            this.tasks=undefined
          }

      })


      
      this.taskService.getDays().subscribe((days: any) => {
      this.days=days;
    })

   }
  
 

    
  
 






  onTaskClick(task:Task){
    //set task as completed
    this.taskService.complete(task).subscribe(()=>{
      console.log('completed successfully !');
      //if complete set successfully do 
      task.completed=!task.completed;
    })
   }

   onDeleteDay() {
    this.taskService.deleteDay(this.selectedDayId).subscribe((res: any) => {
      this.router.navigate(['/days']);
      console.log(res);
    })
  }

  onDeleteTask(id:string) {
    this.taskService.deleteTask(this.selectedDayId,id).subscribe((res: any) => {
      this.tasks=this.tasks?.filter(val=>val._id===id);
    console.log(res);
    })
  }
}
