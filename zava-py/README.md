![logo](https://zava.readthedocs.io/en/latest/_images/logo.png)

# zava

Parallel coordinates with Grand Tour for exploratory data visualization of massive and high-dimensional data in Python. If you want a desktop application for use, try [VizApp](https://github.com/oneoffcoder/vizapp).


- [GitHub](https://github.com/oneoffcoder/zava)
- [Documentation](https://zava.readthedocs.io/)
- [PyPi](https://pypi.org/project/zava/) 
- [Gitter](https://gitter.im/dataflava/zava)

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

# Copyright

## Software

```
Copyright 2020 One-Off Coder

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Art

Copyright 2020 Daytchia Vang

# Citation

```
@misc{oneoffcoder_zava_2020,
title={zava, Parallel Coordinates with Grand Tour for TypeScript and Python},
url={https://github.com/oneoffcoder/zava},
author={Jee Vang},
year={2020},
month={Dec}}
```

# Sponsor, Love

- [Patreon](https://www.patreon.com/vangj)
- [GitHub](https://github.com/sponsors/vangj)
