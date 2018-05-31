import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupliersPageComponentComponent } from './supliers-page-component.component';

describe('SupliersPageComponentComponent', () => {
  let component: SupliersPageComponentComponent;
  let fixture: ComponentFixture<SupliersPageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupliersPageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupliersPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
