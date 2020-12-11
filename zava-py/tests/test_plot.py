import random

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib import animation
from nose import with_setup

from zava.core import GrandTour
from zava.plot import SinglePlotter, MultiPlotter


def setup():
    """
    Setup.
    :return: None.
    """
    np.random.seed(37)
    random.seed(37)
    plt.rcParams.update({'figure.max_open_warning': 0})
    plt.style.use('ggplot')


def teardown():
    """
    Teardown.
    :return: None.
    """
    pass


@with_setup(setup, teardown)
def test_plot():
    """
    Tests plotting of data.
    """
    columns = ['v0', 'v1', 'v2', 'v3']

    M1 = np.array([
        [1, 1, 1, 1],
        [2, 2, 2, 1],
        [3, 3, 3, 3]
    ])
    M2 = np.array([
        [1, 2, 3, 4],
        [2, 2, 1, 1],
        [1, 1, 3, 3]
    ])

    M1 = pd.DataFrame(M1, columns=columns)
    M2 = pd.DataFrame(M2, columns=columns)

    c = 0.0
    d = 100.0

    gt1 = GrandTour(M1, c, d)
    gt2 = GrandTour(M2, c, d)

    sp1 = SinglePlotter(gt1, params={'color': 'r'})
    sp2 = SinglePlotter(gt2, params={'color': 'g'})

    fig, ax = plt.subplots(figsize=(15, 3))
    mp = MultiPlotter([sp1, sp2], ax=ax)

    params = {
        'fig': fig,
        'func': mp,
        'frames': np.linspace(0, 360, 360),
        'interval': 20,
        'init_func': mp.init
    }
    anim = animation.FuncAnimation(**params)

    plt.close(fig)
    params = {
        'filename': 'test.mov',
        'dpi': 500,
        'progress_callback': lambda i, n: print(f'saving frame {i} / {n}'),
        'writer': 'ffmpeg',
        'metadata': {
            'title': 'Parallel Coordinates with Grand Tour',
            'artist': 'Clint Eastwood',
            'genre': 'Action',
            'subject': 'Exploratory data visualization',
            'copyright': '2020',
            'comment': 'One-Off Coder'
        }
    }
    anim.save(**params)
