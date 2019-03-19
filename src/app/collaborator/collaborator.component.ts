import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../core/service/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { user } from '../core/model/user/user';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../core/service/http/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NoteService } from '../core/service/note/note.service';
interface ImageData {
  imageSrc: any;
}
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
query ='';
user: user;
user1: any
searchEnable=false;
public imageData = <ImageData>{};
public users: user[] = [];
public collabUsers: user[] = [];


  constructor(private userService:UserService,
     public dialogRef: MatDialogRef<CollaboratorComponent>,
     @Inject(MAT_DIALOG_DATA) public data,
     
     private httpUtil:HttpService,
     private sanitizer: DomSanitizer,
     private noteService:NoteService,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCollaborateUser();
    this.getUserById();
    this.getAllUsers(); 
    this.photoDisplay();
}

public photoDisplay() {

  var token = localStorage.getItem('token')
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    })
  };
  this.httpUtil.getService('http://localhost:8082/user/userdetails', httpheaders).subscribe(resp => {
    this.user1 = resp
    console.log(resp)
    if (this.user1.image != null) {
    const url = `data:${this.user1.contentType};base64,${this.user1.image}`;
    this.imageData = {
      imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
    }
  }
  else {
    this.imageData.imageSrc = null;
  }
  }  , error => {
console.log(error);
  }
  )
}

public getAllUsers()
{
  this.userService.getAllUsers().subscribe(({body}) =>{
this.users=body;
console.log('users-->',body);
  })

}

public getUserById()
{
  this.userService.userDetails().subscribe((user)=>{
    this.user = user;
   console.log('user-->',user);
  })

}

public closeClick()
{
  this.dialogRef.close();
}

public enableSearch()
{
this.searchEnable=true;
}



public collaborate(user)
{
    this.noteService.createCollaborator(this.data.noteId,user.id).subscribe(response => {
      this.getCollaborateUser();    
      console.log(this.data.noteId,user.id);
      this.snackBar.open("Collaborator added", "OK", {
        duration: 3000,
      });
    })
    this.closeClick();
}



public getCollaborateUser() {
  for (let i = 0; i < this.data.collaborators.length; i++) {
    var k = 0;
    console.log(this.data.collaborators[i].userId);
    this.userService.getCollaborateUser(this.data.collaborators[i].userId).subscribe(
      user => {
        this.collabUsers[k] = user;
        k++;
      }
      , error => console.log(error))
  }
}

public removeCollaborator(collabUser)
{
this.noteService.deleteCollaborator(this.data.noteId,collabUser.id).subscribe(response => {
  this.getCollaborateUser();
  console.log(this.data.noteId,collabUser.id);
  this.snackBar.open("Collaborator removed", "OK", {
    duration: 3000,
  });
})
 this.closeClick(); 
}


  }
  

