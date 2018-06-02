import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPartsListComponent } from './sell-parts-list.component';

describe('SellPartsListComponent', () => {
  let component: SellPartsListComponent;
  let fixture: ComponentFixture<SellPartsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPartsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
