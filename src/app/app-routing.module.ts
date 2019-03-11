
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotesearchbodyComponent } from './notesearchbody/notesearchbody.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MainnoteComponent } from './mainnote/mainnote.component';
import { ArchiveNotesComponent } from './archive-notes/archive-notes.component';
import { TrashedNotesComponent } from './trashed-notes/trashed-notes.component';
import { HeaderComponent } from './header/header.component';
import { EditLabelsComponent } from './edit-labels/edit-labels.component';
import { AuthGuard } from './guard/auth.guard';
import { SearchNoteComponent } from './search-note/search-note.component';

const appRoutes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'header', component:HeaderComponent ,canActivate:[AuthGuard],
  children: [
    
    { path: '', redirectTo: 'mainnote', pathMatch: 'full' },
    { path: 'archivenote', component:ArchiveNotesComponent},
    { path: 'trashednote', component:TrashedNotesComponent},
    { path: 'searchnote', component:SearchNoteComponent},
    { path: 'editlabel', component:EditLabelsComponent},
    { path: 'mainnote', component: MainnoteComponent }
  ]

},
{path: 'resetpassword/:id',component:ResetpasswordComponent},
{path: 'forgotpassword',component:ForgotpasswordComponent},
  { path: '**', redirectTo: 'login' , pathMatch: 'full'}
 ];
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }

