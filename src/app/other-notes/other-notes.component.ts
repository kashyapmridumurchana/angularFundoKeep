import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { Label } from '../core/model/label/label';
import { enableBindings } from '@angular/core/src/render3';

@Component({
  selector: 'app-other-notes',
  templateUrl: './other-notes.component.html',
  styleUrls: ['./other-notes.component.scss']
})
export class OtherNotesComponent implements OnInit {
  @Input() notes
  @Output() eventPin = new EventEmitter();
  

  public mytoken = '';
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  public selectable = true;
  public removable = true;
 

  constructor(private noteService: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
   
  }

//   public getLabels() {
//     this.mytoken = localStorage.getItem('token');
//     this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
//       this.labels = newLabel;
//     })

//   }

//   onUpdateNoteLabel(data)
//   {
//     this.noteService.updateNote(data.note).subscribe(response => {
//       this.eventPin.emit(true);
//       this.snackBar.open("Label added to the note", "OK", {
//         duration: 3000,
//       });
//     })
//   }

//   public openDialog(note): void {
//     const dialogRef = this.dialog.open(UpdateNoteComponent, {
//       width: '550px',
//       data: note
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       this.noteService.updateNote(note).subscribe(response => {
//         this.snackBar.open("Note updated successfully", "OK", {
//           duration: 3000,
//         });
//       })
//     });
//   }

//   public deleteNote(note) {
//     var newNote = {
//       ...note,
//       inTrash: true,
//     }
//     this.noteService.updateNote(newNote).subscribe(response => {
//       this.snackBar.open("Sent to Trash ", "OK", {
//         duration: 3000,
//       });
//       this.eventPin.emit(true);
//     },
//       (error) => {
//         console.log('Error while deleting note::->', error);
//       })
//   }


//   public sendToArchive(note) {
//     var newNote = {
//       ...note,
//       archive: true
//     }
//     this.noteService.updateNote(newNote).subscribe(response => {
//       this.snackBar.open("Sent to Archive ", "OK", {
//         duration: 3000,
//       });
//       this.eventPin.emit(true);
//     },
//       (error) => {
//         console.log('Error while archiving note::->', error);
//       })
//   }

//   public moveToPin(note) {
//     var newNote = {

//       ...note,
//       pinned: true
//     }
//     this.noteService.updateNote(newNote).subscribe(response => {
//       this.eventPin.emit(true);
//       this.snackBar.open("Pinned", "OK", {
//         duration: 3000,
//       });
//     },
//       (error) => {
//         console.log('Error while pinning note::->', error);
//       })
//   }

//   // public refresh(event) {
//   //   if (event) {
//   //     this.getNotes();
//   //   }
//   // }

//   public remove(note, label) {
//     this.noteService.removeLabelFromNote(note, label).subscribe(response => {
//       this.eventPin.emit(true);
//       this.getLabels();
//       this.snackBar.open("Label removed successfully from note", "OK", {
//         duration: 3000,
//       });
     
//     },
//       (error) => {
//         console.log(error);

//       })
//   }


// }
}
