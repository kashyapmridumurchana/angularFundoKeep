import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HelperKeepService } from '../core/service/helper-keep.service';
import { Note } from '../core/model/note/note';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchInputVal:'';
  grid = false;
  filter:'';
  public mytoken = localStorage.getItem('token');

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

  public searchText()
  {
    this.helperService.setSearch(this.searchInputVal);
    this.router.navigate(['header/searchnote'])
  }
  


}
