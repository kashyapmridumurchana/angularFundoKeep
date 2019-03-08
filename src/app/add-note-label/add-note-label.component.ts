import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from '../core/service/note/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Label } from '../core/model/label/label';

@Component({
  selector: 'app-add-note-label',
  templateUrl: './add-note-label.component.html',
  styleUrls: ['./add-note-label.component.css']
})
export class AddNoteLabelComponent implements OnInit {

  @Input() note
  @Output() addNoteLabel = new EventEmitter();


  public mytoken = '';
  public labels: Label[] = [];
  public newLabels: Label[] = [];


  constructor(private noteService: NoteService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mytoken = localStorage.getItem('token');
    this.getLabels();
  }


  public getLabels() {
    this.mytoken = localStorage.getItem('token');
    this.noteService.retrieveLabels(this.mytoken).subscribe(newLabel => {
      this.labels = newLabel;
    })

  }


  public onClick(event, note, label) {
    event.stopPropagation();
    console.log(label);
    console.log(note);
    this.noteService.addLabelToNote(note.noteId, label).subscribe(response => {
      var data = { note }
      this.getLabels();
      this.addNoteLabel.emit(data);
    },
      (error) => {
        console.log(error);

      })

  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    this.newLabels.length = 0;
    var k = 0;
    for (var i = 0; i < this.labels.length; i++) {
      var present = 0;
      for (var j = 0; j < noteLabels.length; j++) {
        if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[k] = this.labels[i];
        k++;
      }
    }
  }

}

