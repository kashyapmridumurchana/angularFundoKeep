import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpUtil: HttpService, private router: Router, public snackBar: MatSnackBar) { }

  retrieveNotes(token):Observable<any>
  {
    var httpheaders = {
      headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': token
      })
    };
    return this.httpUtil.getService(environment.note_url + 'retrievenote',httpheaders);
  }

  createNote(note): Observable<any> {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.postServiceForNoteCreate(environment.note_url + 'createnote', note ,httpheaders);
  }
  updateNote(note)
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.putServiceForNoteUpdate(environment.note_url + 'updatenote',note,httpheaders);
  }

  deleteNote(noteId)
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.deleteServiceForNoteDelete(environment.note_url + 'deletenote/'+noteId,httpheaders);
}

retrieveLabels(token):Observable<any>
{
  var httpheaders = {
    headers:new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    })
  };
  return this.httpUtil.getService(environment.note_url + 'retrievelabel',httpheaders);
}


updateLabel(label)
{
  var token = localStorage.getItem('token');
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    })
  };
  return this.httpUtil.putServiceForNoteUpdate(environment.note_url + 'updatelabel',label,httpheaders);
}


deleteLabel(labelId)
  {
    var token = localStorage.getItem('token');
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
    return this.httpUtil.deleteServiceForNoteDelete(environment.note_url + 'deletelabel/'+labelId,httpheaders);
}
createLabel(label) {
  var token = localStorage.getItem('token');
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    })
  };
  return this.httpUtil.postServiceForNoteCreate(environment.note_url + 'createlabel', label,httpheaders);
}



removeLabelFromNote(noteId, labelId) {
  return this.httpUtil.deleteServiceWithParams(`${environment.note_url}removenotelabel`, {
    params: {
      noteId: noteId,
      labelId: labelId,
    },
    observe: 'response'
  }
  )
}

// addLabelToNote(noteId, labelId) {
//   return this.httpUtil.putServiceWithParams(`${environment.note_url}addnotelabel`, {
//     params: {
//       noteId: noteId,
//       labelId: labelId,
//     },
//     observe: 'response'
//   }
//   )
// }



}