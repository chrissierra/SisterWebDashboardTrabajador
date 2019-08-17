import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaFotoCarnetRespaldoComponent } from './toma-foto-carnet-respaldo.component';

describe('TomaFotoCarnetRespaldoComponent', () => {
  let component: TomaFotoCarnetRespaldoComponent;
  let fixture: ComponentFixture<TomaFotoCarnetRespaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaFotoCarnetRespaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaFotoCarnetRespaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
