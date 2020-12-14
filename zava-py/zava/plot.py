from collections import ChainMap

import gif
import matplotlib.pyplot as plt
import numpy as np


class SinglePlotter(object):
    """
    Parallel coordinate and Grand Tour plotter for a single
    dataset.
    """

    def __init__(self, grand_tour, params={}):
        """
        ctor.

        :param grand_tour: Grand Tour instance.
        :param params: Parameters for line plots.
        """
        self.__grand_tour = grand_tour
        self.__params = {
            'kind': 'line',
            'color': 'r',
            'marker': 'h',
            'markeredgewidth': 1,
            'markersize': 5,
            'linewidth': 0.8
        }

        if params is not None and len(params) > 0:
            self.__params = ChainMap(params, self.__params)
            self.__params['kind'] = 'line'

    def init(self):
        """
        Initialization. Does nothing for now.
        """
        pass

    def __call__(self, degree, ax):
        """
        Instance method that performs rotation and plot.

        :param degree: Degree.
        :param ax: Plotting axis.
        """
        S = self.__grand_tour.rotate(degree)

        params = {**self.__params, **{'ax': ax}}
        S.plot(**params)

    @property
    def grand_tour(self):
        """
        Gets the Grand Tour instance.

        :return: Grand Tour.
        """
        return self.__grand_tour


class MultiPlotter(object):
    """
    Parallel coordinate and Grand Tour plotter for multiple dataset.
    """

    def __init__(self, plotters, ax, **kwargs):
        """
        ctor.

        :param plotters: List of SinglePlotter.
        :param ax: Plotting axis.
        :param kwargs: Additional arguments (e.g. title for plot).
        """
        self.__plotters = plotters
        self.__ax = ax
        self.__kwargs = kwargs

    def init(self):
        """
        Initialization.
        """
        for plotter in self.__plotters:
            plotter.init()

    def __call__(self, degree):
        """
        Instance method to produce plot.

        :param degree: Degree.
        """
        self.__ax.clear()

        for plotter in self.__plotters:
            plotter(degree, self.__ax)

        headers = self.__plotters[0].grand_tour.headers
        _ = self.__ax.set_xticks(np.arange(len(headers)))
        _ = self.__ax.set_xticklabels(headers)
        _ = self.__ax.get_yaxis().set_ticks([])

        if self.__ax.get_legend() is not None:
            _ = self.__ax.get_legend().remove()

        if 'title' in self.__kwargs:
            title = self.__ax.set_title('title')
        else:
            title = 'Grand Tour'
        _ = self.__ax.set_title(title)

        return self.__ax

    @gif.frame
    def __get_gif_frame(self, degree, figsize):
        """
        Gets a GIF frame.

        :param degree: Degree.
        :param figsize: Tuple of figure size (matplotlib).
        :return: None.
        """
        fig, ax = plt.subplots(figsize=figsize)

        for plotter in self.__plotters:
            plotter(degree, ax)

        headers = self.__plotters[0].grand_tour.headers
        _ = ax.set_xticks(np.arange(len(headers)))
        _ = ax.set_xticklabels(headers)
        _ = ax.get_yaxis().set_ticks([])

        if ax.get_legend() is not None:
            _ = ax.get_legend().remove()

        if 'title' in self.__kwargs:
            title = ax.set_title('title')
        else:
            title = 'Grand Tour'
        _ = ax.set_title(title)

    def __get_gif_frames(self, start=0, stop=360, figsize=(15, 3)):
        """
        Gets a list of GIF frames.

        :param start: Start degree.
        :param stop: Stop degree.
        :param figsize: Figure size. Default is (15, 3).
        :return:List of frames.
        """
        frames = [self.__get_gif_frame(degree, figsize) for degree in range(start, stop + 1, 1)]
        return frames

    def save_gif(self, output, duration, start=0, stop=360, figsize=(15, 3), unit='s'):
        """
        Saves the animation as an animated GIF.

        :param output: Output path.
        :param duration: Duration per frame.
        :param start: Start degree.
        :param stop: Stop degree.
        :param figsize: Figure size. Default is (15, 3).
        :param unit: Time units. Default is 's' for seconds.
        :return: None.
        """
        frames = self.__get_gif_frames(start, stop, figsize)
        gif.save(frames, output, duration=duration, unit=unit)
