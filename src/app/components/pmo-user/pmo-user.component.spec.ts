import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmoUserComponent } from './pmo-user.component';

describe('PmoUserComponent', () => {
  let component: PmoUserComponent;
  let fixture: ComponentFixture<PmoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
