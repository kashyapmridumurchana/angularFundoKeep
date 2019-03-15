import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../core/service/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { user } from '../core/model/user/user';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../core/service/http/http.service';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private userService:UserService,
     public dialogRef: MatDialogRef<CollaboratorComponent>,
     @Inject(MAT_DIALOG_DATA) public data,
     private httpUtil:HttpService,
     private sanitizer: DomSanitizer) { }

  ngOnInit() {
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

enableSearch()
{
this.searchEnable=true;
}


public addCollaborator(emailId)
{
  console.log(emailId);
  this.searchEnable=false;
  
}
  }
  

