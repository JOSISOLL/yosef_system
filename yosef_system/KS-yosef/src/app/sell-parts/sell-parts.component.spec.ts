import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPartsComponent } from './sell-parts.component';

describe('SellPartsComponent', () => {
  let component: SellPartsComponent;
  let fixture: ComponentFixture<SellPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
