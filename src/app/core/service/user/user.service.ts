import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { user } from '../../model/user/user';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token');
  httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };

  constructor(private httpUtil: HttpService,private router:Router ) { }

  login(user) {
    return this.httpUtil.postService(environment.base_url + 'login', user);
  }

  register(user) {
   return this.httpUtil.postService(environment.base_url+'register', user);
  }

  forgotpassword(user)
  {
    return this.httpUtil.postService(environment.base_url+'forgotpassword',user);
  }

  resetpassword(user,id)
  {
    return this.httpUtil.putService(environment.base_url+'resetpassword/'+id,user,id);
  }

  userDetails():Observable<any>
  {
    return this.httpUtil.getService(environment.base_url+'userdetails',this.httpheaders);
  }

  getAllUsers():Observable<any>
  {
return this.httpUtil.getAllUsers(environment.base_url+'allUserDetails');
  }

verifyEmail(email):Observable<any>
{
  return this.httpUtil.getUserEmail(environment.base_url + 'verifyemail/'+email,this.httpheaders)
}
getCollaborateUser(userId):Observable<any>
  {
    return this.httpUtil.getCollaborateUser(environment.base_url + 'getcollaborateduser/'+userId);
}
}