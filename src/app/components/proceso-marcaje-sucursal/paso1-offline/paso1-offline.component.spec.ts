import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso1OfflineComponent } from './paso1-offline.component';

describe('Paso1OfflineComponent', () => {
  let component: Paso1OfflineComponent;
  let fixture: ComponentFixture<Paso1OfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paso1OfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paso1OfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
