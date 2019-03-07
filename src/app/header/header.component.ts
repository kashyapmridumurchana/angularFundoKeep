import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  abc = false;
  def = false;

  @Output() toggle = new EventEmitter();
  public toggleNav: Subject<any> = new Subject();
  public btnClick: Subject<any> = new Subject();
  @Output() toggle1 = new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public hideButton() {

    this.abc = true;
  }
  public hideButton1() {
    this.abc = false;
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
