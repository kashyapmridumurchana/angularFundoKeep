import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { Note } from '../core/model/note/note';
import { HelperKeepService } from '../core/service/helper-keep.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent implements OnInit {

  searchInput:'';
  public mytoken = '';
  public notes: Note[] = [];
  constructor(private noteService:NoteService,private helperService:HelperKeepService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getNotes();
    this.helperService.getSearch().subscribe((resp) =>
    this.searchInput= resp
  );
   this.getNotes();
  }

  public getNotes() {
    this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
      this.notes = newNote;
    })
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
