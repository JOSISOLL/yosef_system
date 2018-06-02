import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllNavComponent } from './controll-nav.component';

describe('ControllNavComponent', () => {
  let component: ControllNavComponent;
  let fixture: ComponentFixture<ControllNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
