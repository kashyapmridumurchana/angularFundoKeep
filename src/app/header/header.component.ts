import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HelperKeepService } from '../core/service/helper-keep.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  grid = false;
  
  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();

  constructor(private router:Router,private helperService:HelperKeepService) { }

  ngOnInit() {
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

  public logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }







}
