import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Note } from '../core/model/note/note';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-trashed-notes',
  templateUrl: './trashed-notes.component.html',
  styleUrls: ['./trashed-notes.component.scss']
})
export class TrashedNotesComponent implements OnInit {

  public mytoken = '';
  public notes: Note[] = [];
  @Input() grid = false;


  constructor(private noteService: NoteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '550px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      this.noteService.updateNote(note).subscribe(response => {
        this.snackBar.open("Note updated successfully", "OK", {
          duration: 3000,
        });
      })
    });
  }


  public deleteNoteForever(note) {
    this.noteService.deleteNote(note.noteId).subscribe(response => {
      this.getNotes();
      this.snackBar.open("deleted Note forever", "OK", { duration: 2000 });
    }), error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
  }


  public restore(note) {
    var newNote = {
      ...note,
      "inTrash": false,

    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open(" Restored ", "OK", {
        duration: 3000,
      });
      this.getNotes();
    })
  }
}
