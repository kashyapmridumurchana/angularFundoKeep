import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherNotesComponent } from './other-notes.component';

describe('OtherNotesComponent', () => {
  let component: OtherNotesComponent;
  let fixture: ComponentFixture<OtherNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
