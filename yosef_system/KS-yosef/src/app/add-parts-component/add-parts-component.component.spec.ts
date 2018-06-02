import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartsComponentComponent } from './add-parts-component.component';

describe('AddPartsComponentComponent', () => {
  let component: AddPartsComponentComponent;
  let fixture: ComponentFixture<AddPartsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
