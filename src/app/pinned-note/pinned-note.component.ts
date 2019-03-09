import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../core/model/note/note';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotesearchbodyComponent } from '../notesearchbody/notesearchbody.component';
import { Label } from '../core/model/label/label';
import { UpdateNoteComponent } from '../update-note/update-note.component';


@Component({
  selector: 'app-pinned-note',
  templateUrl: './pinned-note.component.html',
  styleUrls: ['./pinned-note.component.scss']
})
export class PinnedNoteComponent implements OnInit {

  @Input() notes
  @Input() grid = false;
  @Output() eventPin = new EventEmitter();

  public mytoken = '';
  public selectable = true;
  public removable = true;
  public labels: Label[] = [];
  constructor(private noteService: NoteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    // this.getLabels();
  }

  // public getLabels() {
  //   this.mytoken = localStorage.getItem('token');
  //   this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
  //     this.labels = newLabel;
  //   })
  // }

  onUpdateNoteLabel(data) {
    this.eventPin.emit(data);
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


  public sendToArchive(note) {
    note.archive=1;
    note.pinned=0;
    var data = { note };
    this.eventPin.emit(data);
  }


  public deleteNote(note) {
    note.inTrash=1;
    var data = { note };
    this.eventPin.emit(data);
  }

  public unPin(key,note) {
    note.pinned= key === 'pinned'? 1:0 ;
    var data = { note };
    this.eventPin.emit(data);
  }

  public remove(note, label) {
    this.noteService.removeLabelFromNote(note.noteId, label).subscribe(response => {
      var data = {note}
      this.eventPin.emit(data);
      // this.snackBar.open("Label removed successfully from note", "OK", {
      //   duration: 3000,
      // });
    },
      (error) => {
        console.log(error);

      })
  }

}
