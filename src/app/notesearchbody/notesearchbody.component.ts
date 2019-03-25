import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../core/service/note/note.service';
import { HttpService } from '../core/service/http/http.service';
import { MatSnackBar } from '@angular/material';
import { Note } from '../core/model/note/note';

@Component({
  selector: 'app-notesearchbody',
  templateUrl: './notesearchbody.component.html',
  styleUrls: ['./notesearchbody.component.scss']
})
export class NotesearchbodyComponent implements OnInit {

  @Output() eventCreate = new EventEmitter();
  @Output() eventPin = new EventEmitter();
 
  public showHeader = true;
  createNoteForm: FormGroup;
  loading = false;
  submitted = false;
  selectedMoment =new Date();
  public min = new Date();
  public mytoken = localStorage.getItem('token')
  public notes: Note[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private noteService: NoteService,
    private httpUtil: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.createNoteForm = this.formBuilder.group({
      title: [''],
      description: [''],
      reminder:''
    });

  }


get f() { return this.createNoteForm.controls; }

public onSubmit(note) {
    this.submitted = true;

    if (this.createNoteForm.invalid) {
      return;
    }
    if (this.createNoteForm.value.title === "" && this.createNoteForm.value.description === "") {
      return;
    }
    this.noteService.createNote(note).subscribe(response => {
      this.eventCreate.emit(true);
      this.snackBar.open("success", "note created", {
        duration: 2000
      });
    })
  }

public pinnedNoteSave(note) {
    const newNote = {
      ...note,
      pinned: true,
    }
    this.onSubmit(newNote);
}

public archiveNoteSave(note) {
  const newNote = {
    ...note,
    archive: true
  }
  console.log(newNote.archive);
  this.onSubmit(newNote);

}
public updateColor(data)
  {
    this.onSubmit(data.note);
  }

public saveReminder(selectedMoment,note)
  {
    const newNote = {
      ...note,
      reminder: selectedMoment,
    }
    this.onSubmit(newNote);
}
onUpdateNoteLabel(data) {
  this.eventPin.emit(data);
}
}


