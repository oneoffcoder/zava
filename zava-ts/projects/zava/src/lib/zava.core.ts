import {multiply, transpose} from 'mathjs';

/**
 * Grand Tour.
 */
export class GrandTour {
  /**
   * Scaled data.
   */
  private readonly M: Array<Array<number>>;

  /**
   * ctor.
   *
   * @param M Matrix.
   * @param c Minimum (for scaling).
   * @param d Maximum (for scaling).
   */
  constructor(M: Array<Array<number>>, c= 0.0, d= 100.0) {
    const minMax = Util.findColMinMax(M);
    const A = minMax[0];
    const B = minMax[1];
    const C = Util.getVector(M[0].length, c);
    const D = Util.getVector(M[0].length, d);

    this.M = Util.rescale(M, A, B, C, D);
  }

  /**
   * Rotates the data.
   *
   * @param degree Degree.
   * @param doTranspose Boolean indicating if output matrix should be transposed.
   * @return Rotated matrix.
   */
  public rotate(degree: number, doTranspose= false): Array<Array<number>> {
    let G = Util.rotate(this.M, degree);

    if (doTranspose === true) {
      G = transpose(G);
    }

    return G;
  }
}

/**
 * Utility class.
 */
export class Util {

  /**
   * Converts degree to radian.
   * @param degree Degree.
   * @return Radian.
   */
  static toRadians(degree: number): number {
    return degree * (Math.PI / 180.0);
  }

  /**
   * Gets a rotation matrix. The rotation matrix is
   *
   * - 1 along the diagonal,
   * - 0 every where else,
   * - except for the (i,i), (j,j), (i,j) and (j,i) positions.
   *
   * The following indices will have the specified values.
   *
   * - (i,i) : cos(theta)
   * - (j,j) : cos(theta)
   * - (i,j) : sin(theta)
   * - (j,i) : -sin(theta)
   *
   * @param n The n x n dimensions of the rotation matrix.
   * @param sin The sine value.
   * @param cos The cosine value.
   * @param i The i-th index.
   * @param j The j-th index.
   * @param Rotation matrix.
   */
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

  /**
   * Gets a Givens rotation matrix.
   *
   * @param n The n x n dimensions of the Givens rotation matrix.
   * @param degree Degree.
   * @param Givens rotation matrix.
   */
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

  /**
   * Gets the column minimums and maximums.
   *
   * @param M Matrix.
   * @return Array<Array<number>> where first array stores minimums and second array stores maximums.
   */
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

  /**
   * Gets a vector of the specified value repeated n times.
   *
   * @param n Number of repeats.
   * @param val Value.
   * @return Vector.
   */
  static getVector(n: number, val: number): Array<number> {
    const v = new Array<number>();
    for (let i = 0; i < n; i++) {
      v.push(val);
    }
    return v;
  }

  /**
   * Rescales the specified matrix. Each new value is scaled accoring to the following.
   *
   * - v_new = (v_old - a) / (b - a) * (d - c) + c
   *
   * @param M Matrix.
   * @param A Current minimum values of the columns.
   * @param B Current maximum values of the columns.
   * @param C Target minimum values of the columns.
   * @param D Target maximum values of the columns.
   * @return Matrix (scaled).
   */
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

  /**
   * Rotates a matrix.
   *
   * @param M Matrix.
   * @param degree Degree.
   * @return Matrix (rotated).
   */
  static rotate(M: Array<Array<number>>, degree: number): Array<Array<number>> {
    const R = Util.getGivens(M[0].length, degree);
    const G = multiply(M, R);
    return G;
  }
}
