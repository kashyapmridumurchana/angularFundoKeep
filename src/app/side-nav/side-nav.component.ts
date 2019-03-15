import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EditLabelsComponent } from '../edit-labels/edit-labels.component';
import { MatDialog } from '@angular/material';
import { NoteService } from '../core/service/note/note.service';
import { Label } from '../core/model/label/label';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('drawer') public drawer;

  @Input() public toggleNav: Subject<any>;

  public mytoken = '';
  public labels: Label[] = [];

  constructor(private router: Router, private dialog: MatDialog, private noteService: NoteService) { }

  ngOnInit() {
    this.getLabels();
    this.toggleNav.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    })
  }
  public navigateNotes() {
    this.router.navigate(['header/mainnote']);
  }

  public navigateArchive() {
    this.router.navigate(['header/archivenote']);
  }
  public navigateTrash() {
    this.router.navigate(['header/trashednote']);
  }


  public editLabels(label) {
    this.getLabels();
    const dialogRef = this.dialog.open(EditLabelsComponent, {
      width: '450px',
      data: ''
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  public getLabels() {
    this.mytoken = localStorage.getItem('token');
    this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
      this.labels = newLabel;
    })

  }



}
