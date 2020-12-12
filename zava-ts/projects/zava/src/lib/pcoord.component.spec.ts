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
    expect(component.data.data.length).toBe(0);
    expect(component.data.headers.length).toBe(0);
    expect(component.data.colors.length).toBe(0);
    expect(component.xScaler === undefined).toBe(true);
    expect(component.yScalers === undefined).toBe(true);
    expect(component.degree).toBe(0.0);
    expect(component.degreeDelta).toBe(0.5);
    expect(component.minScaling).toBe(0.0);
    expect(component.maxScaling).toBe(100.0);
    expect(component.timer === undefined).toBe(true);
    expect(component.line === undefined).toBe(false);
    expect(component.lineAttrs.size).toBe(2);
    expect(component.axisLabelAttrs.size).toBe(5);
    expect(component.totalWidth).toBe(960);
    expect(component.totalHeight).toBe(500);
  });

  it('should set data correctly', () => {
    const data = [[1, 2], [3, 4], [5, 6]];
    const headers = ['x1', 'x2'];
    const colors = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];

    component.data = {headers, data, colors};
    expect(component.data.data.length).toBe(3);
    expect(component.data.headers.length).toBe(2);
    expect(component.data.colors.length).toBe(3);
    expect(component.xScaler === undefined).toBe(false);
    expect(component.yScalers === undefined).toBe(false);
  });

  it('should rotate manually', () => {
    const data = [[1, 2], [3, 4], [5, 6]];
    const headers = ['x1', 'x2'];
    const colors = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];

    component.data = {headers, data, colors};
    const data1 = component.data.data;

    for (let i = 0; i < 100; i++) {
      component.rotateForward();
    }
    const data2 = component.data.data;

    for (let i = 100; i > 0; i--) {
      component.rotateBackward();
    }
    const data3 = component.data.data;

    for (let r = 0; r < data1.length; r++) {
      for (let c = 0; c < data1[0].length; c++) {
        if (data1[r][c] === data2[r][c]) {
          continue;
        }
        expect(data1[r][c] === data2[r][c]).toBe(false);
      }
    }

    for (let r = 0; r < data1.length; r++) {
      for (let c = 0; c < data1[0].length; c++) {
        expect(data1[r][c] === data3[r][c]).toBe(true);
      }
    }
  });

  it('should reset the rotation', () => {
    const data = [[1, 2], [3, 4], [5, 6]];
    const headers = ['x1', 'x2'];
    const colors = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];

    component.data = {headers, data, colors};
    const data1 = component.data.data;

    for (let i = 0; i < 100; i++) {
      component.rotateForward();
    }
    component.resetRotation();
    const data2 = component.data.data;

    for (let r = 0; r < data1.length; r++) {
      for (let c = 0; c < data1[0].length; c++) {
        expect(data1[r][c] === data2[r][c]).toBe(true);
      }
    }
  });

  it('should animate the rotation', () => {
    const data = [[1, 2], [3, 4], [5, 6]];
    const headers = ['x1', 'x2'];
    const colors = ['#e0e0e0', '#e0e0e0', '#e0e0e0'];

    component.data = {headers, data, colors};

    expect(component.timer === undefined).toBe(true);
    expect(component.stopAnimation).toBe(true);

    const data1 = component.data.data;

    component.startRotationAnimation();

    expect(component.timer === undefined).toBe(false);
    expect(component.stopAnimation).toBe(false);

    for (let i = 0; i < 10000; i++) {
      // do nothing
    }

    component.stopAnimationRotation();

    expect(component.stopAnimation).toBe(true);

    const data2 = component.data.data;

    for (let r = 0; r < data1.length; r++) {
      for (let c = 0; c < data1[0].length; c++) {
        expect(data1[r][c] === data2[r][c]).toBe(true);
      }
    }
  });
});
