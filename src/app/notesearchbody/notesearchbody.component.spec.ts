import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesearchbodyComponent } from './notesearchbody.component';

describe('NotesearchbodyComponent', () => {
  let component: NotesearchbodyComponent;
  let fixture: ComponentFixture<NotesearchbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesearchbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesearchbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
