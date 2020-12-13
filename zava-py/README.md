# zava

Parallel coordinates with Grand Tour for exploratory data visualization of massive and high-dimensional data in Python. If you want a desktop application for use, try [VizApp](https://github.com/oneoffcoder/vizapp).

# Requirements

At a minimum, you will need the following packages. 

- python=3.8.3
- numpy=1.19.2
- scipy=1.5.2
- pandas=0.25.3
- matplotlib=3.3.2

If you are generating animation videos, you will also need [ffmpeg](https://ffmpeg.org/) installed, as that is what matplotlib uses by default to render videos. 

## Issues

You may get into situations where ffmpeg appears to hang or stall. There are a lot of issues reported with matplotlib and ffmpeg interoperability.

- [Matplotlib + ffmpeg crashes when saving MP4 file](https://github.com/spack/spack/issues/18071)
- [ffmpeg hangs when run in background](https://stackoverflow.com/questions/16523746/ffmpeg-hangs-when-run-in-background)

# Installation

## From pypi

``bash
pip install zava
``

## From source

```bash
python setup.py install
```