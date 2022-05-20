import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Day} from 'src/app/models/day.model';


@Component({
  selector: 'app-new-day',
  templateUrl: './new-day.component.html',
  styleUrls: ['./new-day.component.scss']
})
export class NewDayComponent implements OnInit {
  //declarate a list days

  constructor(private taskService:TaskService,private router:Router) { }
 
  ngOnInit(){
  }

  
  createNewDay(title: string) {
    this.taskService.createDay(title).subscribe((day: any) => {
      console.log(day);
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/days', day._id ]); 
    });
  }

}
