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


  @Input() public abc : Subject<any>;
  public mytoken = '';
  public notes: Note[] = [];
  constructor(private noteService: NoteService, private dialog: MatDialog, 
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();

    


  }

  getNotes() {
    console.log("token", this.mytoken);
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    }
    )
  }
  
  openDialog(note): void {
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
      console.log('The dialog was closed');
    });
  }



  deleteNote(note)
  {
     var newNote = {
       ...note,
      inTrash: true,
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Sent to Trash ", "OK", {
        duration: 3000,
      });
      console.log(response);
      this.ngOnInit();
    },
      (error) => {
        console.log('Error while deleting note::->', error);
      })
}

  


  sendToArchive(note) {
    var newNote = {
    
      ...note,
      archive: true
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Sent to Archive ", "OK", {
        duration: 3000,
      });
      this.ngOnInit();
    },
      (error) => {
        console.log('Error while archiving note::->', error);
      })
}


  moveToPin(note)
  {
    var newNote = {
    
      ...note,
      pinned: true
    }
    this.noteService.updateNote(newNote).subscribe(response => {
      this.snackBar.open("Pinned", "OK", {
        duration: 3000,
      });
      
      this.ngOnInit();
    },
      (error) => {
        console.log('Error while pinning note::->', error);
      })
}



refresh(event)
{
if(event)
{
  this.getNotes();
}
}

}