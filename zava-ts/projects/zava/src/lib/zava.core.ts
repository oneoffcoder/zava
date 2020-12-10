import {multiply} from 'mathjs';

export class GrandTour {
  constructor() {
  }
}


export class Util {
  private constructor() {
  }

  static toRadians(degree: number): number {
    return degree * (Math.PI / 180.0);
  }

  static getRotationMatrix(n: number, sin: number, cos: number, i: number, j: number): Array<Array<number>> {
    const matrix = new Array<Array<number>>();
    for (let r = 0; r < n; r++) {
      const row = new Array<number>();
      for (let c = 0; c < n; c++) {
        if ((r === i && c === i) || (r === j && c === j)) {
          row.push(cos);
        } else if (r === i && c === j) {
          row.push(sin);
        } else if (r === j && c === i) {
          row.push(-sin);
        } else if (r === c) {
          row.push(1.0);
        } else {
          row.push(0.0);
        }
      }
      matrix.push(row);
    }
    return matrix;
  }

  static getGivens(n: number, degree: number): Array<Array<number>> {
    const theta = Util.toRadians(degree);
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);

    let matrix = Util.getRotationMatrix(n, sin, cos, 0, 1);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (r === 0 && c === 1) {
          continue;
        } else if (c > r) {
          const rhs = Util.getRotationMatrix(n, sin, cos, r, c);
          matrix = multiply(matrix, rhs);
        }
      }
    }
    return matrix;
  }
}
