import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperKeepService } from '../core/service/helper-keep.service';
import { Note } from '../core/model/note/note';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public notes: Note[] = [];
  public grid = false;
  public mytoken = localStorage.getItem('token');
  public message='archive';
  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperKeepService) { }

  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
console.log(this.message);
  }
  
  public refresh() {
    this.getNotes();
  }

  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  updateMethod(note) {
    this.noteService.updateNote(note).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }

}
