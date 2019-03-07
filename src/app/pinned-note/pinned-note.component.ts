import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../core/model/note/note';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotesearchbodyComponent } from '../notesearchbody/notesearchbody.component';


@Component({
  selector: 'app-pinned-note',
  templateUrl: './pinned-note.component.html',
  styleUrls: ['./pinned-note.component.css']
})
export class PinnedNoteComponent implements OnInit {

  @Input() notes
  @Output() eventPin = new EventEmitter();
  public mytoken = '';

  constructor(private noteService: NoteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
  }

  // public getNotes() {
  //   this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
     
  //     this.notes = newNote;
  //   }
  //   )
  // }

  public openDialog(note): void {
    const dialogRef = this.dialog.open(PinnedNoteComponent, {
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


  public sendToArchive(note) {
    var newNote = {

      ...note,
      archive: true
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Sent to Archive ", "OK", {
        duration: 3000,
      });
      this.eventPin.emit(true);
    },
      (error) => {
        console.log('Error while archiving note::->', error);
      })
  }



  public deleteNote(note) {
    var newNote = {
      ...note,
      inTrash: true,
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Sent to Trash ", "OK", {
        duration: 3000,
      });
      this.eventPin.emit(true);
    },
      (error) => {
        console.log('Error while deleting note::->', error);
      })
  }

  public unPin(note) {
    var newNote = {
      ...note,
      pinned: false,

    }
    console.log(newNote);
    this.noteService.updateNote(newNote).subscribe(response => {
      this.eventPin.emit(true);
      this.snackBar.open(" UnPinned ", "OK", {
        duration: 3000,

      });
    },
      (error) => {
        console.log('Error while unpinning note::->', error);
      })
  }

}
