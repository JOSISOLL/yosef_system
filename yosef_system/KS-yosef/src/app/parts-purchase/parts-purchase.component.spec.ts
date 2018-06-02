import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsPurchaseComponent } from './parts-purchase.component';

describe('PartsPurchaseComponent', () => {
  let component: PartsPurchaseComponent;
  let fixture: ComponentFixture<PartsPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
