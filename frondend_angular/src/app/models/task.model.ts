export class Task {
     _id:String;
     label:String;
     description:String;
     type:String;
     dueDate:String;
     _dayId:String;
     completed:boolean;


     constructor(  
          _id:String,
          label:String,
          description:String,
          type:String,
          dueDate:String,
          _dayId:String,
          completed:boolean,
        )
     {
          this._id=_id;
          this.label=label;
          this.description=description;
          this.type=type;
          this.dueDate=dueDate;
          this._dayId=_dayId;
          this.completed=completed;
 
     }

}

