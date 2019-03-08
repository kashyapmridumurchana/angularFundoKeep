import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { Note } from '../core/model/note/note';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-mainnote',
  templateUrl: './mainnote.component.html',
  styleUrls: ['./mainnote.component.css']
})
export class MainnoteComponent implements OnInit {


  @Input() public abc: Subject<any>;
  public mytoken = '';
  public notes: Note[] = [];
  // selectable = true;
  // removable = true;

  constructor(private noteService: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();
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