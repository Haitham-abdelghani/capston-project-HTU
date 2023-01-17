import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstartupComponent } from './addstartup.component';

describe('AddstartupComponent', () => {
  let component: AddstartupComponent;
  let fixture: ComponentFixture<AddstartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddstartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
