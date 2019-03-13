import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../core/service/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { user } from '../core/model/user/user';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {

user: user
  constructor(private userService:UserService,
     public dialogRef: MatDialogRef<CollaboratorComponent>,
     @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
     this.userService.userDetails().subscribe(user=>{
       this.user = user;
      console.log('user-->',user);
     })
}


public closeClick()
{
  this.dialogRef.close();
}

public addCollaborator(emailId)
{
console.log(emailId);

}
  }
  

