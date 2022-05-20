import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Day } from 'src/app/models/day.model';
import { Observable } from 'rxjs';
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

   days!: any[];
   tasks!: any[];
 
   
ngOnInit() {
      this.route.params.subscribe((params: Params) => {
       // console.log(params);
        this.taskService.getTasks(params.dayId).subscribe((tasks: any ) => {
          this.tasks =tasks;
          console.log(params.dayId);
          console.log(tasks.label);

        })

      })

    this.taskService.getDays().subscribe((days: any) => {
    this.days=days;
    })
  }
 

  // ngOnInit() {
  //   this.route.params.subscribe(
  //     (params:Params)=>{
  //       if (params.dayId){
  //         console.log(params.dayId);
  //         this.taskService.getTasks(params.dayId).subscribe((tasks: any) => {
  //             this.tasks=tasks;
  //             console.log(tasks);       // Check the tasks if it's actually an array response 
  //         })
  //       }else{
  //         this.tasks=undefined;
  //       }


  //     })
  //   this.taskService.getDays().subscribe((days:any) => {
  //     this.days=days;
  //   })

  // }




  onTaskClick(task:Task){
    //set task as completed
    this.taskService.complete(task).subscribe(()=>{
      console.log('completed successfully !');
      //if complete set successfully do 
      task.completed=!task.completed;
    })
   }

  //  onDeleteDayClick() {
  //   this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
  //     this.router.navigate(['/lists']);
  //     console.log(res);
  //   })
  // }

  // onDeleteTaskClick(id: string) {
  //   this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
  //     this.tasks = this.tasks.filter(val => val._id !== id);
  //     console.log(res);
  //   })
  // }
}
