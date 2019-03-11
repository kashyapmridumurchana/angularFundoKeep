import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AppMaterialModule} from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { MatCardModule,MatExpansionModule } from '@angular/material';
import { NotesearchbodyComponent } from './notesearchbody/notesearchbody.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MainnoteComponent } from './mainnote/mainnote.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { ArchiveNotesComponent } from './archive-notes/archive-notes.component';
import { TrashedNotesComponent } from './trashed-notes/trashed-notes.component';
import { PinnedNoteComponent } from './pinned-note/pinned-note.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { EditLabelsComponent } from './edit-labels/edit-labels.component';
import { NoteFilterPipe } from './pipe/note-filter.pipe';
import { AddNoteLabelComponent } from './add-note-label/add-note-label.component';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { TestingWorkComponent } from './testing-work/testing-work.component';
import { NoteSearchPipe } from './pipe/note-search.pipe';
import { SearchNoteComponent } from './search-note/search-note.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,  
    NotesearchbodyComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    MainnoteComponent,
    UpdateNoteComponent,
    ArchiveNotesComponent,
    TrashedNotesComponent,
    PinnedNoteComponent,
    SideNavComponent,
    HeaderComponent,
    EditLabelsComponent,
    NoteFilterPipe,
    AddNoteLabelComponent,
    SearchPipePipe,
    TestingWorkComponent,
    NoteSearchPipe,
    SearchNoteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule

    
  
  ],
  entryComponents: [UpdateNoteComponent],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
