import { Component, OnInit } from '@angular/core';
import { HelperKeepService } from '../core/service/helper-keep.service';
import { NoteService } from '../core/service/note/note.service';
import { Note } from '../core/model/note/note';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent implements OnInit {

  public mytoken = '';
  public notes: Note[] = [];
  constructor( private helperService: HelperKeepService,private noteService:NoteService) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.helperService.getSearch().subscribe((query) => {
    console.log('response', query);
    if(!query){
      this.getNotes(); 
      return;
    }
    this.notes = this.notes.filter((item) => 
    item.title.toLowerCase().includes(query.toLowerCase()));
  });
}


public getNotes() {
  this.noteService.retrieveNotes(this.mytoken).subscribe(newNote => {
    this.notes = newNote;
  })
}
}
