import { TestBed } from '@angular/core/testing';

import { Util } from './zava.core';

describe('ZavaCore.Util', () => {

  it('should create a 3 x 3 square rotation matrix', () => {
    const n = 3;
    const i = 0;
    const j = 1;
    const deg = 1.0;
    const sin = Math.sin(deg);
    const cos = Math.cos(deg);
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
    const sin = Math.sin(deg);
    const cos = Math.cos(deg);
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
    const sin = Math.sin(deg);
    const cos = Math.cos(deg);
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
});
