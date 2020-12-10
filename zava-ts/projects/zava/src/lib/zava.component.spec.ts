import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZavaComponent } from './zava.component';

describe('ZavaComponent', () => {
  let component: ZavaComponent;
  let fixture: ComponentFixture<ZavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
