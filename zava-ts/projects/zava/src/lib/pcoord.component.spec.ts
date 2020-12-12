import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcoordComponent } from './pcoord.component';

describe('PcoordComponent', () => {
  let component: PcoordComponent;
  let fixture: ComponentFixture<PcoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcoordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
