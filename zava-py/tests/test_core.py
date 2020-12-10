import random

import numpy as np
import pandas as pd
from nose import with_setup

from zava.core import GrandTour


def setup():
    """
    Setup.
    :return: None.
    """
    np.random.seed(37)
    random.seed(37)


def teardown():
    """
    Teardown.
    :return: None.
    """
    pass


@with_setup(setup, teardown)
def test_rotation():
    """
    Tests Grand Tour rotation of ndarray.

    :return: None.
    """
    M = np.array([
        [1, 1, 1, 1],
        [2, 2, 2, 1],
        [3, 3, 3, 3],
        [1, 2, 3, 4],
        [2, 2, 1, 1],
        [1, 1, 3, 3]
    ])
    c = 0.0
    d = 100.0

    gt = GrandTour(M, c, d)

    for degree in range(361):
        S = gt.rotate(degree, transpose=True, return_dataframe=True)

        assert S.shape == (4, 6)
        assert isinstance(S, pd.core.frame.DataFrame)

    for degree in range(361):
        S = gt.rotate(degree, transpose=False, return_dataframe=True)

        assert S.shape == (6, 4)
        assert isinstance(S, pd.core.frame.DataFrame)

    for degree in range(361):
        S = gt.rotate(degree, transpose=True, return_dataframe=False)

        assert S.shape == (4, 6)
        assert isinstance(S, np.ndarray)

    for degree in range(361):
        S = gt.rotate(degree, transpose=False, return_dataframe=False)

        assert S.shape == (6, 4)
        assert isinstance(S, np.ndarray)


@with_setup(setup, teardown)
def test_rotation_with_dataframe():
    """
    Tests Grand Tour rotation of dataframe.

    :return: None.
    """
    M = np.array([
        [1, 1, 1, 1],
        [2, 2, 2, 1],
        [3, 3, 3, 3],
        [1, 2, 3, 4],
        [2, 2, 1, 1],
        [1, 1, 3, 3]
    ])
    columns = ['x1', 'x2', 'x3', 'x4']
    M = pd.DataFrame(M, columns=columns)
    c = 0.0
    d = 100.0

    gt = GrandTour(M, c, d)

    for degree in range(361):
        S = gt.rotate(degree, transpose=True, return_dataframe=True)

        assert S.shape == (4, 6)
        assert isinstance(S, pd.core.frame.DataFrame)
        for i, c in zip(S.index, columns):
            assert i == c

    for degree in range(361):
        S = gt.rotate(degree, transpose=False, return_dataframe=True)

        assert S.shape == (6, 4)
        assert isinstance(S, pd.core.frame.DataFrame)
        for i, c in zip(S.columns, columns):
            assert i == c

    for degree in range(361):
        S = gt.rotate(degree, transpose=True, return_dataframe=False)

        assert S.shape == (4, 6)
        assert isinstance(S, np.ndarray)

    for degree in range(361):
        S = gt.rotate(degree, transpose=False, return_dataframe=False)

        assert S.shape == (6, 4)
        assert isinstance(S, np.ndarray)
