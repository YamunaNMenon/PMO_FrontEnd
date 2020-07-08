import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoViewtaskComponent } from './pmo-viewtask.component';

describe('PmoViewtaskComponent', () => {
  let component: PmoViewtaskComponent;
  let fixture: ComponentFixture<PmoViewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmoViewtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoViewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
