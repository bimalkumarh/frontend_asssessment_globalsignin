import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MygameInfoComponent } from './mygame-info.component';

describe('MygameInfoComponent', () => {
  let component: MygameInfoComponent;
  let fixture: ComponentFixture<MygameInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MygameInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MygameInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
