import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCarComponent } from './settings-car.component';

describe('SettingsCarComponent', () => {
  let component: SettingsCarComponent;
  let fixture: ComponentFixture<SettingsCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
