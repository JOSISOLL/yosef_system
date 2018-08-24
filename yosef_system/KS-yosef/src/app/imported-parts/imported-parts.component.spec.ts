import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedPartsComponent } from './imported-parts.component';

describe('ImportedPartsComponent', () => {
  let component: ImportedPartsComponent;
  let fixture: ComponentFixture<ImportedPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
