import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoProjectComponent } from './pmo-project.component';

describe('PmoProjectComponent', () => {
  let component: PmoProjectComponent;
  let fixture: ComponentFixture<PmoProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmoProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
