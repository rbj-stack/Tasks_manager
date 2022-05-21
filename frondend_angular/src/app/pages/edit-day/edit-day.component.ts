import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-edit-day',
  templateUrl: './edit-day.component.html',
  styleUrls: ['./edit-day.component.scss']
})
export class EditDayComponent implements OnInit {

  constructor(private route:ActivatedRoute,private taskService:TaskService ,private router:Router) { }
  dayId:string;
  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.dayId=params.dayId;

    })
  }
  updateDay(title:string){
    this.taskService.UpdateDay(this.dayId,title).subscribe(()=>{
        this.router.navigate(['/days',this.dayId]);
        
    })
  }
}
