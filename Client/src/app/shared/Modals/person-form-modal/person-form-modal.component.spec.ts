import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormModalComponent } from './person-form-modal.component';

describe('PersonFormModalComponent', () => {
  let component: PersonFormModalComponent;
  let fixture: ComponentFixture<PersonFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
