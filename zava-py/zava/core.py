import math
from functools import reduce, lru_cache
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


def __rescale(M, C, D):
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


def _rotate(M, c=0.0, d=100.0, deg=0.0):
    """
    Rotates and scales the specified matrix.

    :param M: Matrix.
    :param c: Vector of new target minimums. Default vector of 0.0.
    :param d: Vector of new target maximums. Default vector of 100.0.
    :param deg: Rotation in degrees. Default 0.0.
    :return: Matrix (rotated + scaled).
    """
    R = __get_givens(M.shape[1], deg)
    N = np.dot(M, R)

    C = np.repeat(c, M.shape[1])
    D = np.repeat(d, M.shape[1])
    S = __rescale(N, C, D)

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
        self.__matrix = matrix
        self.__is_df = isinstance(matrix, pd.core.frame.DataFrame)
        self.__c = c
        self.__d = d

    @property
    @lru_cache(maxsize=None)
    def headers(self):
        """
        Gets a list of headers. The variable names or column names
        if the matrix is a Pandas dataframe; otherwise, a list of
        generic names :math:`x_0, x_1, \\ldots, x_n` if the matrix
        is an ``ndarray``.
        """
        if self.__is_df:
            return list(self.__matrix.columns)
        else:
            return [f'x{i}' for i in range(self.__matrix.shape[1])]

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
        S = _rotate(self.__matrix, self.__c, self.__d, degree)
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
