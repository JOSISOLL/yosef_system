import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsStockComponent } from './parts-stock.component';

describe('PartsStockComponent', () => {
  let component: PartsStockComponent;
  let fixture: ComponentFixture<PartsStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
