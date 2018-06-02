import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePartsComponent } from './purchase-parts.component';

describe('PurchasePartsComponent', () => {
  let component: PurchasePartsComponent;
  let fixture: ComponentFixture<PurchasePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
