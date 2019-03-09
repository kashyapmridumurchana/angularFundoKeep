import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingWorkComponent } from './testing-work.component';

describe('TestingWorkComponent', () => {
  let component: TestingWorkComponent;
  let fixture: ComponentFixture<TestingWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
