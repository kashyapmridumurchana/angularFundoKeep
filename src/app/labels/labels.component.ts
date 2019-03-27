import { Component, OnInit } from '@angular/core';
import { Note } from '../core/model/note/note';
import { NoteService } from '../core/service/note/note.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperKeepService } from '../core/service/helper-keep.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  
  public grid = false;
  public notes: Note[] = [];
  public newNotes: Note[] = [];
  public label;
  public mytoken = localStorage.getItem('token');

  constructor(private noteService: NoteService, private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private helperService: HelperKeepService) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.label = params['labelName'];
      this.helperService.getTheme().subscribe((resp) =>
        this.grid = resp
      );
      this.getNotes();
});
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
      this.filterLabel(this.notes);
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  public filterLabel(notes) {
    this.newNotes.length = 0;
    notes.filter((note) => note.labels.filter((label) => {
      if (this.label === label.labelName && !note.inTrash) {
        this.newNotes.push(note);
      }
    }))
  }
}