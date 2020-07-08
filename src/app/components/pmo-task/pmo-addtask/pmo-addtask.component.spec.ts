import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoAddtaskComponent } from './pmo-addtask.component';

describe('PmoAddtaskComponent', () => {
  let component: PmoAddtaskComponent;
  let fixture: ComponentFixture<PmoAddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmoAddtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoAddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
