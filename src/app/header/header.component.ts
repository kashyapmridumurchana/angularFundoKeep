import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HelperKeepService } from '../core/service/helper-keep.service';
import { HttpService } from '../core/service/http/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { user } from '../core/model/user/user';
interface ImageData {
  imageSrc: any;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchInputVal: '';
  grid = false;
  filter: '';
  public mytoken = localStorage.getItem('token');
  public imageData = <ImageData>{};
  selectedFile: File;
  fileToUpload: File;
  user: any
  

  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();

  constructor(private router: Router, private helperService: HelperKeepService
    , private httpUtil: HttpService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.photoDisplay();
  }



  public hideButton() {
    this.grid = !this.grid;
    this.helperService.setTheme(this.grid);
  }


  public toggleOnClick() {
    this.toggle.emit();
  }

  public toggleSide() {
    this.toggleNav.next();
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public searchText() {
    this.helperService.setSearch(this.searchInputVal);
    this.router.navigate(['/header/searchnote']);
  }

  public onFileChanged(event) {
   
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  public onUpload() {
    this.pushFileToStorage(this.selectedFile).subscribe(resp => {
      console.log(resp)
      this.photoDisplay(),
        (error) => {
          console.log(error)
        }
    })
  }

  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    var token = localStorage.getItem('token')
    return this.httpUtil.putService('http://localhost:8082/user/imageUpload/' + token, formdata,
      {
        reportProgress: true,
        responseType: 'text'
      });

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
      this.user = resp
      console.log(resp)
      if (this.user.image != null) {
      const url = `data:${this.user.contentType};base64,${this.user.image}`;
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

  public removeImage()
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    })
  };
  this.httpUtil.deleteService('http://localhost:8082/user/imagedelete/'+token,httpheaders).subscribe(response => {
    this.photoDisplay();
    console.log("deleted"),
    (error)=> console.log("unable to delete image");
  })  
  }



}
