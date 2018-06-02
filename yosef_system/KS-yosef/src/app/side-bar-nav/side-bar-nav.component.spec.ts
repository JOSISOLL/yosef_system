import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNavComponent } from './side-bar-nav.component';

describe('SideBarNavComponent', () => {
  let component: SideBarNavComponent;
  let fixture: ComponentFixture<SideBarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
