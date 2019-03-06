import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { Label } from '../core/model/label/label';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.css']
})
export class EditLabelsComponent implements OnInit {
  
  public mytoken = '';
  public labels: Label[]=[];
 
  constructor( private noteService:NoteService,private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditLabelsComponent>,) { }

  ngOnInit() {
    this.getLabels();
  }


  getLabels()
  {
    this.mytoken = localStorage.getItem('token');
    console.log("token", this.mytoken);
    this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
      this.labels = newLabel;
      console.log(this.labels);
      console.log(newLabel)
    })
    
  }

  createLabel(label)
  {
     var name=label.innerHTML;
     console.log(name)
    var newLabel={
      "labelName":name
    }
    this.noteService.createLabel(newLabel).subscribe(response =>{
      this.ngOnInit();
      this.snackBar.open("Label created successfully", "OK", {
        duration: 3000,
      });
    })
    this.ngOnInit();
  }
  

  labelUpdate(label)
  {
    this.noteService.updateLabel(label).subscribe(response =>{
      this.snackBar.open("Label updated successfully", "OK", {
        duration: 3000,
      });
    })
    this.dialogRef.close();

  }



  deleteLabel(label)
  {
console.log(label.labelId);
this.noteService.deleteLabel(label.labelId).subscribe(response => {
  this.snackBar.open("deleted Label forever", "OK", { duration: 2000 });
}), error => {
  this.snackBar.open("error", "error to deleting notes", { duration: 2000 });
}
this.dialogRef.close();

}




  }
 


