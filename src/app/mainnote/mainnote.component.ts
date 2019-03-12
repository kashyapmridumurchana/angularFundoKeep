import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { Note } from '../core/model/note/note';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { HelperKeepService } from '../core/service/helper-keep.service';



@Component({
  selector: 'app-mainnote',
  templateUrl: './mainnote.component.html',
  styleUrls: ['./mainnote.component.scss']
})
export class MainnoteComponent implements OnInit {


  @Input() public abc: Subject<any>;
  public mytoken = '';
  public notes: Note[] = [];
  public grid = false;


  constructor(private noteService: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar, private helperService: HelperKeepService) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
    this.helperService.getSearch().subscribe((query) => {
      console.log('response', query);
      if(!query){
        this.getNotes(); 
        return;
      }
      this.notes = this.notes.filter((item) => 
      item.title.toLowerCase().includes(query.toLowerCase()));
    });
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    })
  }





  public refresh(event) {
    if (event) {
      this.getNotes();
    }
  }
  onUpdateNote(data) {
    this.updateNote(data.note)
  }


  updateNote(newNote) {
    this.noteService.updateNote(newNote).subscribe(response => {
      this.getNotes();
      this.snackBar.open("Done ", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log('Error in operation::->', error);
      })
  }



}