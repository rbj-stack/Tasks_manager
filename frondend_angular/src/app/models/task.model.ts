export class Task {
     _id:string;
     label: string;
     description:string;
     type:string;
     dueDate:string;
     _dayId:string;
     completed :boolean;
     constructor() {
          this._id="";
          this.label="";
          this.description="";
          this.type="";
          this.dueDate="";
          this._dayId="";
          this.completed=false;


     }
}
