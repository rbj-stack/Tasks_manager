import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }
  taskId: string;
  dayId:string;
  label:string;
  description: string;
  dueDate:string;
  type: string;
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
        this.dayId = params.dayId;
      }
    )
  }
  
  updateTask(label:String,description:String,Date:String,type:String){
    this.taskService.updateTask(label,description,Date,type,this.dayId, this.taskId).subscribe(()=>{
      this.router.navigate(['/days', this.dayId]);
    })
  }

}
