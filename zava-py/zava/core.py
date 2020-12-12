import math
from functools import reduce
from itertools import combinations

import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix


def __get_givens(n, deg):
    """
    Computes the Givens rotation matrix based on the specified degree.

    :param n: The number of rows and columns.
    :param deg: Degrees.
    :return: A Givens rotation matrix (squared, n x n).
    """

    def get_rot_matrix(sin, cos, i, j):
        def get_val(r, c):
            if (r == i and c == i) or (r == j and c == j):
                return cos
            if r == i and c == j:
                return sin
            if r == j and c == i:
                return -sin
            if r == c:
                return 1.0
            return 0.0

        row = [x for x in range(n)]
        col = [x for x in range(n)]
        data = [get_val(r, c) for r, c in zip(row, col)]

        row = row + [i, j]
        col = col + [j, i]
        data = data + [get_val(r, c) for r, c in [(i, j), (j, i)]]

        m = csr_matrix((data, (row, col)), shape=(n, n))
        return m

    theta = math.radians(deg)
    sin = math.sin(theta)
    cos = math.cos(theta)

    matrices = [get_rot_matrix(sin, cos, i, j) for i, j in combinations(range(n), 2)]

    r = reduce(lambda a, b: a.dot(b), matrices)
    return r.toarray()


def _rescale(M, C, D):
    """
    Rescales the specified matrix, M, according to the new
    minimum, C, and maximum, D. C and D should be of the
    dimension 1 x cols.

    - TODO: avoid recomputing A and B, might not be efficient

    :param M: Matrix.
    :param C: Vector of new target minimums.
    :param D: Vector of new target maximums.
    :return: Matrix.
    """
    A = M.min(axis=0)
    B = M.max(axis=0)

    return (M - A) / (B - A) * (D - C) + C


def _rotate(M, C, D, deg=0.0):
    """
    Rotates the specified matrix.

    :param M: Matrix.
    :param C: Vector of new target minimums.
    :param D: Vector of new target maximums.
    :param deg: Rotation in degrees. Default 0.0.
    :return: Matrix (rotated).
    """
    R = __get_givens(M.shape[1], deg)
    G = np.dot(M, R)
    S = _rescale(G, C, D)

    return S


class GrandTour(object):
    """
    Grand Tour object.
    """

    def __init__(self, matrix, c=0.0, d=100.0):
        """
        ctor

        :param matrix: Pandas dataframe or 2-D numpy ndarray.
        :param c: Minimum value for scaling. Default 0.0.
        :param d: Maximum value for scaling. Default 100.0.
        """
        self.__is_df = isinstance(matrix, pd.core.frame.DataFrame)

        if self.__is_df:
            self.__headers = list(matrix.columns)
        else:
            self.__headers = [f'x{i}' for i in range(matrix.shape[1])]

        self.__C = np.repeat(c, matrix.shape[1])
        self.__D = np.repeat(d, matrix.shape[1])
        self.__matrix = matrix

    @property
    def headers(self):
        """
        Gets a list of headers. The variable names or column names
        if the matrix is a Pandas dataframe; otherwise, a list of
        generic names :math:`x_0, x_1, \\ldots, x_n` if the matrix
        is an ``ndarray``.
        """
        return self.__headers

    def rotate(self, degree, transpose=True, return_dataframe=True):
        """
        Rotates the matrix. When ``transpose`` and ``return_dataframe`` are set to
        ``True``, then a transposed Pandas dataframe is returned. You can just
        issue ``df.plot(kind='line')`` as a start to get the parallel coordinate
        plot.

        :param degree: Degree.
        :param transpose: Boolean. Default is True.
        :param return_dataframe: Boolean. Default is True.
        :return: Pandas dataframe or 2-D numpy ndarray.
        """
        S = _rotate(self.__matrix, self.__C, self.__D, degree)
        if transpose:
            S = S.T

        if return_dataframe:
            S = pd.DataFrame(S)

            if self.__is_df:
                if transpose:
                    S.index = self.__matrix.columns
                else:
                    columns = {i: c for i, c in zip(S.columns, self.__matrix.columns)}
                    S = S.rename(columns=columns)

        return S
