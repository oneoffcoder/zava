import { Util } from './zava.core';

describe('ZavaCore.Util', () => {

  it('should convert degree to radian', () => {
    const degree = 1;
    const radian = Util.toRadians(degree);
    expect(radian).toBeCloseTo(0.0174533, 0.001);
  });

  it('should create a 3 x 3 square rotation matrix', () => {
    const n = 3;
    const i = 0;
    const j = 1;
    const deg = 1.0;
    const theta = Util.toRadians(deg);
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const matrix = Util.getRotationMatrix(n, sin, cos, i, j);

    expect(matrix.length).toBe(3);
    [...matrix].forEach(row => expect(row.length).toBe(3));
    expect(matrix[i][i]).toBe(cos);
    expect(matrix[j][j]).toBe(cos);
    expect(matrix[i][j]).toBe(sin);
    expect(matrix[j][i]).toBe(-sin);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if ((r === i && c === i) || (r === j && c === j) || (r === i && c === j) || (r === j && c === i)) {
          continue;
        } else if (r === c) {
          expect(matrix[r][c]).toBe(1.0);
        } else {
          expect(matrix[r][c]).toBe(0.0);
        }
      }
    }
  });

  it('should create a 4 x 4 square rotation matrix', () => {
    const n = 4;
    const i = 0;
    const j = 1;
    const deg = 1.0;
    const theta = Util.toRadians(deg);
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const matrix = Util.getRotationMatrix(n, sin, cos, i, j);

    expect(matrix.length).toBe(n);
    [...matrix].forEach(row => expect(row.length).toBe(n));
    expect(matrix[i][i]).toBe(cos);
    expect(matrix[j][j]).toBe(cos);
    expect(matrix[i][j]).toBe(sin);
    expect(matrix[j][i]).toBe(-sin);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if ((r === i && c === i) || (r === j && c === j) || (r === i && c === j) || (r === j && c === i)) {
          continue;
        } else if (r === c) {
          expect(matrix[r][c]).toBe(1.0);
        } else {
          expect(matrix[r][c]).toBe(0.0);
        }
      }
    }
  });

  it('should create a 10 x 10 square rotation matrix', () => {
    const n = 10;
    const i = 0;
    const j = 1;
    const deg = 1.0;
    const theta = Util.toRadians(deg);
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const matrix = Util.getRotationMatrix(n, sin, cos, i, j);

    expect(matrix.length).toBe(n);
    [...matrix].forEach(row => expect(row.length).toBe(n));
    expect(matrix[i][i]).toBe(cos);
    expect(matrix[j][j]).toBe(cos);
    expect(matrix[i][j]).toBe(sin);
    expect(matrix[j][i]).toBe(-sin);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if ((r === i && c === i) || (r === j && c === j) || (r === i && c === j) || (r === j && c === i)) {
          continue;
        } else if (r === c) {
          expect(matrix[r][c]).toBe(1.0);
        } else {
          expect(matrix[r][c]).toBe(0.0);
        }
      }
    }
  });

  it('should get Givens rotation matrix', () => {
    const n = 3;
    const matrix = Util.getGivens(n, 1);
    expect(matrix.length).toBe(n);
    [...matrix].forEach(row => expect(row.length).toBe(n));
  });

  it('should find the min and max of columns', () => {
    const matrix = [
      [1.0, 2.0],
      [2.0, 1.0],
      [3.0, 0.5]
    ];
    const observed = Util.findColMinMax(matrix);
    const expected = [
      [1.0, 0.5],
      [3.0, 2.0]
    ];

    expect(observed.length).toBe(expected.length);
    expect(observed[0].length).toBe(expected[0].length);
    for (let r = 0; r < expected.length; r++) {
      for (let c = 0; c < expected[0].length; c++) {
        expect(observed[r][c]).toBe(expected[r][c]);
      }
    }
  });

  it('should rescale', () => {
    const M = [
      [1.0, 2.0],
      [2.0, 1.0],
      [3.0, 0.5]
    ];
    const A = [1.0, 0.5];
    const B = [3.0, 2.0];
    const C = [0.0, 0.0];
    const D = [100.0, 100.0];

    const E = Util.rescale(M, A, B, C, D);
    const O = [
      [0, 100],
      [50, 33.3333],
      [100, 0]
    ];

    expect(E.length).toBe(O.length);
    expect(E[0].length).toBe(O[0].length);
    for (let r = 0; r < O.length; r++) {
      for (let c = 0; c < O[0].length; c++) {
        expect(E[r][c]).toBeCloseTo(O[r][c], 0.0001);
      }
    }
  });
});
