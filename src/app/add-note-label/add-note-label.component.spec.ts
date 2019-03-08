import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteLabelComponent } from './add-note-label.component';

describe('AddNoteLabelComponent', () => {
  let component: AddNoteLabelComponent;
  let fixture: ComponentFixture<AddNoteLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
