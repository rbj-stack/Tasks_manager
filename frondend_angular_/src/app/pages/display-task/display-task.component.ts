import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.scss']
})
export class DisplayTaskComponent implements OnInit {

  days!: any;
  tasks!: any;
  constructor(private taskService:TaskService,private route :ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        console.log(params.dayId);
        this.taskService.getTasks(params.dayId).subscribe((tasks:any) => {
            this.tasks=tasks;
            console.log(tasks);       // Check the tasks if it's actually an array response 


        })
      })
    this.taskService.getDays().subscribe((days:any) => {
      this.days=days;
    })

  }


}
