import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Label } from '../core/model/label/label';

@Component({
  selector: 'app-other-notes',
  templateUrl: './other-notes.component.html',
  styleUrls: ['./other-notes.component.css']
})
export class OtherNotesComponent implements OnInit {
  @Input() notes
  @Input() public abc: Subject<any>;

  @Output() eventPin=new EventEmitter();
  public mytoken = '';
  public labels: Label[] = [];
  selectable = true;
  removable = true;

  constructor(private noteService: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
     this.getLabels();
  }

  // public getNotes() {
  //   this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
  //     this.notes = newNote;
  //   })
  // }
  public getLabels() {
    this.mytoken = localStorage.getItem('token');
    this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
      this.labels = newLabel;
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
      this.eventPin.emit(true);
    },
      (error) => {
        console.log('Error while deleting note::->', error);
      })
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

  public moveToPin(note) {
    var newNote = {

      ...note,
      pinned: true
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.eventPin.emit(true);
      this.snackBar.open("Pinned", "OK", {
        duration: 3000,
      });
    },
      (error) => {
        console.log('Error while pinning note::->', error);
      })
  }

  // public refresh(event) {
  //   if (event) {
  //     this.getNotes();
  //   }
  // }

  public remove(note, label) {
    this.noteService.removeLabelFromNote(note, label).subscribe(response => {
      this.snackBar.open("Label removed successfully from note", "OK", {
        duration: 3000,
      });
      this.eventPin.emit(true);
    },
      (error) => {
        console.log(error);

      })
  }




  // addLabel(note,label)
  // {
  //   this.noteService.addLabelToNote(note,label).subscribe(response =>{
  //     this.snackBar.open("Label added successfully to note", "OK", {
  //       duration: 3000,
  //     });
  //   },
  //   (error) => {
  //     console.log(error);

  //   })




}
