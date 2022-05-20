import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';
import { WebrequestService } from 'src/app/webrequest.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router:Router) { }

  dayId: any;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.dayId = params['dayId'],{relativeTo:this.route.url};
        // console.log(this.dayId);
      }
    )
  }
  dDate =new Date().toString();
  createTask(label:string,description:string,dDate:string,type:string){
    this.taskService.createTasks(label,description,dDate,type,this.dayId).subscribe((newTask :any)=>{
    this.router.navigate(['../']);
    console.log(this.dayId);

    })
  }

}
