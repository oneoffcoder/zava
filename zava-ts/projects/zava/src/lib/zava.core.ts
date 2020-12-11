import {multiply, subtract, divide, add} from 'mathjs';

// export class GrandTour {
//   constructor() {
//   }
// }


export class Util {

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

        } else if (c > r) {
          const rhs = Util.getRotationMatrix(n, sin, cos, r, c);
          matrix = multiply(matrix, rhs);
        }
      }
    }
    return matrix;
  }

  static findColMinMax(M: Array<Array<number>>): Array<Array<number>> {
    const A = new Array<number>();
    const B = new Array<number>();

    [...M[0]].forEach(v => {
      A.push(v);
      B.push(v);
    });

    const rows = M.length;
    const cols = M[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (M[r][c] < A[c]) {
          A[c] = M[r][c];
        }
        if (M[r][c] > A[c]) {
          B[c] = M[r][c];
        }
      }
    }

    const results = new Array<Array<number>>();
    results.push(A);
    results.push(B);
    return results;
  }

  static rescale(M: Array<Array<number>>, A: Array<number>, B: Array<number>, C: Array<number>, D: Array<number>): Array<Array<number>> {
    const S = new Array<Array<number>>();

    const rows = M.length;
    const cols = M[0].length;

    for (let r = 0; r < rows; r++) {
      const data = new Array<number>();
      for (let c = 0; c < cols; c++) {
        const scaled = (M[r][c] - A[c]) / (B[c] - A[c]) * (D[c] - C[c]) + C[c];
        data.push(scaled);
      }
      S.push(data);
    }

    return S;
  }
}
