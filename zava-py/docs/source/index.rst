.. meta::
   :description: Parallel coordinates with Grand Tour on massive and high-dimensional data
   :keywords: visualization, parallel coordinates, grand tour, statistics, dataframe, data, data mining, exploratory data visualization, machine learning, artificial intelligence, data science
   :robots: index, follow
   :abstract: Conduct exploratory data visualization using parallel coordinates with the Grand Tour technique on massive and high-dimensional data.
   :author: Jee Vang, Ph.D.
   :contact: g@oneoffcoder.com
   :copyright: One-Off Coder
   :content: global
   :generator: Sphinx
   :language: English
   :rating: general
   :reply-to: info@oneoffcoder.com
   :web_author: Jee Vang, Ph.D.
   :revisit-after: 1 days


.. zava documentation master file, created by
   sphinx-quickstart on Wed Dec  9 22:52:58 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

zava
====

.. image:: _static/images/logo.png
   :align: center
   :alt: zava logo.

``zava`` rocks!

Massive and high-dimensional numerical (or continuous) data may visualized using parallel coordinates. For a technical discussion of parallel coordinates see :cite:`1990:wegman`. In parallel coordinates, axes are drawn parallel. A vector (or row) of data, (x1, x2, …, xn), is plotted by drawing x1 on axis 1, x2 on axis 2, and so on through xn on axis n. The plotted points are joined by a broken line. The use of parallel coordinates to visualize massive and high-dimensional data is often a first step in exploratory data analysis (EDA) where one may wish to visually identify patterns, clusters, or outliers. Towards the purpose of EDA, a generalized rotation of the coordinate axes in high-dimensional space, referred to as the grand tour :cite:`2002:wegman`, may be used in combination with hue and saturation brushing techniques :cite:`1996:wegman`.

.. toctree::
   :maxdepth: 2
   :caption: Contents

   quickstart
   zzz-bib

.. toctree::
   :maxdepth: 2
   :caption: API Documentation

   modules



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
