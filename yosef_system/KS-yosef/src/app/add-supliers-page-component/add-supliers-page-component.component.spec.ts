import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupliersPageComponentComponent } from './add-supliers-page-component.component';

describe('AddSupliersPageComponentComponent', () => {
  let component: AddSupliersPageComponentComponent;
  let fixture: ComponentFixture<AddSupliersPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupliersPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupliersPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
