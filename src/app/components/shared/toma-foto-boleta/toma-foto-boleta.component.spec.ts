import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaFotoBoletaComponent } from './toma-foto-boleta.component';

describe('TomaFotoBoletaComponent', () => {
  let component: TomaFotoBoletaComponent;
  let fixture: ComponentFixture<TomaFotoBoletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaFotoBoletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaFotoBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
