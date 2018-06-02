import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsColorDoorComponent } from './settings-color-door.component';

describe('SettingsColorDoorComponent', () => {
  let component: SettingsColorDoorComponent;
  let fixture: ComponentFixture<SettingsColorDoorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsColorDoorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsColorDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
