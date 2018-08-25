import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImportComponent } from './add-import.component';

describe('AddImportComponent', () => {
  let component: AddImportComponent;
  let fixture: ComponentFixture<AddImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
