Quickstart
==========

Installation
------------

To install ``zava`` from ``pypi``, use ``pip``.

.. code:: bash

    pip install zava

Basic Usage
-----------

Data
^^^^

Everything in zava starts with data. Your data should be either a 2-dimensional ``numpy`` array (ndarray) or a ``pandas`` dataframe. If you are using a pandas dataframe, the axis will be labeled according to the dataframe column names; otherwise, you get generic axis names.

.. code-block:: python
    :linenos:

    import numpy as np
    import pandas as pd

    # you can use this numpy array
    M = np.array([
        [1, 1, 1, 1],
        [2, 2, 2, 1],
        [3, 3, 3, 3],
        [1, 2, 3, 4],
        [2, 2, 1, 1],
        [1, 1, 3, 3]
    ])

    # or you can convert the array to a pandas dataframe
    columns = ['v0', 'v1', 'v2', 'v3']
    M = pd.DataFrame(M, columns=columns)

Grand Tour
^^^^^^^^^^

You can then proceed to create a ``GrandTour`` instance passing in the data. Note the parameters ``c`` and ``d`` which are to control the scaling of your data. Since the variables in your data may be on different scale, this normalization is required to bring all of them into the same range for plotting with parallel coordinates.

.. code-block:: python
    :linenos:

    from zava.core import GrandTour

    c = 0.0
    d = 100.0

    grand_tour = GrandTour(M, c, d)

Rotations
^^^^^^^^^

With the ``GrandTour`` instance, you can invoke the ``rotate()`` method to get the rotated data. If your data is huge, you most likely do **NOT** want to do this operation as shown below, as it will store 360 matrices (you do not even want to do this operation, it's just here for illustration purpose on how to get the rotated data).

.. code-block:: python
    :linenos:

    R = [grand_tour.rotate(degree) for degree in range(361)]

Visualization
^^^^^^^^^^^^^

Most likely, you will want to rotate your data and visualize each transformation at a time. Below is a simple example of what you can do with ``matplotlib`` just visualizing one rotation.

.. code-block:: python
    :linenos:

    import matplotlib.pyplot as plt

    # rotates the data by 1 degree
    S = grand_tour.rotate(1)

    # start setting up plot with matplotlib
    fig, ax = plt.subplots(figsize=(15, 3))

    # note that S is a pandas dataframe
    # we can use S to make line plots that mimics parallel coordinates
    params = {
        'kind': 'line',
        'ax': ax,
        'color': 'r',
        'marker': 'h',
        'markeredgewidth': 1,
        'markersize': 5,
        'linewidth': 0.8
    }
    _ = S.plot(**params))

    # some additional plotting configurations/manipulations
    _ = ax.get_legend().remove()
    _ = ax.xaxis.set_major_locator(plt.MaxNLocator(S.shape[0]))
    _ = ax.get_yaxis().set_ticks([])
    _ = ax.set_title('Grand Tour')

Later, we will look at how to use zava in a Jupyter notebook.

Animations
^^^^^^^^^^

Below is a full example of how to use zava to create and save the animation. You should have `ffmpeg <https://ffmpeg.org/>`_ installed and in your path to get this example to work since ``matplotlib`` relies on ffmpeg to create the video.

.. literalinclude:: _code/animation-demo.py
   :language: python
   :linenos:

Your animation video will look like the following. If you have great tips on how to customize animations with matplotlib, please let us know!

.. raw:: html

    <video controls width="500" height="250" src="_static/videos/test.mov">
        Your browser does not support the video tag.
    </video>

Considerations
^^^^^^^^^^^^^^

It might not be a good idea to plot **ALL** your data due to computation and memory limitations. You might want to sample your data instead and plot that subset. Even with the simple, made-up data in this running example, creating a whole animation was intensive (laptop fans start to crank up).