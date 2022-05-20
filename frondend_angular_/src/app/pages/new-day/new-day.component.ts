import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
// import { Day} from 'src/app/models/day.model';

@Component({
  selector: 'app-new-day',
  templateUrl: './new-day.component.html',
  styleUrls: ['./new-day.component.scss']
})
export class NewDayComponent implements OnInit {
  //declarate a list days
  days : any;
  constructor(private taskService:TaskService,private router:Router) { }

  ngOnInit(): void {
  }
  createNewDay(title:String){
    this.taskService.createDay(title).subscribe((response: any)=>{
    console.log(response)
    //and we we navigate to /days/idDay
    this.router.navigate(['/days',response._id])
    });
  }

}
