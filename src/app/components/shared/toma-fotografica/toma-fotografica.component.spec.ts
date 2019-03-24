import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaFotograficaComponent } from './toma-fotografica.component';

describe('TomaFotograficaComponent', () => {
  let component: TomaFotograficaComponent;
  let fixture: ComponentFixture<TomaFotograficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaFotograficaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaFotograficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
