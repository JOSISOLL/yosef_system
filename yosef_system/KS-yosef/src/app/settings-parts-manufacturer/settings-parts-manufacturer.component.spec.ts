import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPartsManufacturerComponent } from './settings-parts-manufacturer.component';

describe('SettingsPartsManufacturerComponent', () => {
  let component: SettingsPartsManufacturerComponent;
  let fixture: ComponentFixture<SettingsPartsManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPartsManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPartsManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
