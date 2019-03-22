import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Note } from '../core/model/note/note';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Label } from '../core/model/label/label';
import { NotesearchbodyComponent } from '../notesearchbody/notesearchbody.component';

@Component({
  selector: 'app-archive-notes',
  templateUrl: './archive-notes.component.html',
  styleUrls: ['./archive-notes.component.scss']
})
export class ArchiveNotesComponent implements OnInit {


  public mytoken = localStorage.getItem('token')
  public notes: Note[] = [];
  public labels: Label[] = [];
  @Output() eventPin = new EventEmitter();
  public selectable = true;
  public removable = true;

  constructor(private noteService: NoteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNotes();
    
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }
  
  onUpdateNoteLabel(data) {
    this.noteService.updateNote(data.note).subscribe(response => {
      this.getNotes();
      this.eventPin.emit(true);
      this.snackBar.open("Note updated successfully", "OK", {
        duration: 3000,
      });
    })
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


  public deleteNote(note) {
    var newNote = {
      ...note,
      inTrash: true,
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Sent to Trash ", "OK", {
        duration: 3000,
      });
      this.getNotes();
    },
      (error) => {
        console.log('Error while deleting note::->', error);
      })
  }



  public unArchive(note) {
    var newNote = {
      ...note,
      archive: false,

    }
    console.log(newNote);
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open(" unArchive ", "OK", {
        duration: 3000,
      });
      this.getNotes();
    },
      (error) => {
        console.log('Error while unarchiving note::->', error);
      })
  }

  public remove(note, label) {
    this.noteService.removeLabelFromNote(note.noteId, label).subscribe(response => {
      var data = {note}
      this.eventPin.emit(data);
      this.getNotes();
      
    },
      (error) => {
        console.log(error);

      })
  }
  public updateColor(data) {
    this.eventPin.emit(data);
  }
}
