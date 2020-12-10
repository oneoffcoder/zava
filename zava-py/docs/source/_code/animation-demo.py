import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import animation

from zava.core import GrandTour
from zava.plot import SinglePlotter, MultiPlotter

# 1. create or get your data
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

# 2. create your GrandTour instances
c = 0.0
d = 100.0

gt1 = GrandTour(M1, c, d)
gt2 = GrandTour(M2, c, d)

# 3. create your plotters for each GrandTour instance
# Note how the first dataset will have red lines
# and the second dataset will have green lines.
# The parameters passed in go into drawing the lines
# and will help create powerful parallel coordinate with
# grand tour visuals with hue and saturation effects.
sp1 = SinglePlotter(gt1, params={'color': 'r'})
sp2 = SinglePlotter(gt2, params={'color': 'g'})

# 4. setup plotting and animation

# don't forget to disable warnings and set the style
plt.rcParams.update({'figure.max_open_warning': 0})
plt.style.use('ggplot')

# Note how we use MultiPlotter to plot both datasets?
fig, ax = plt.subplots(figsize=(15, 3))
mp = MultiPlotter([sp1, sp2], ax=ax)

# matplotlib.animation will help us create animations
params = {
    'fig': fig,
    'func': mp,
    'frames': np.linspace(0, 360, 360),
    'interval': 20,
    'init_func': mp.init
}
anim = animation.FuncAnimation(**params)

plt.close(fig)

# 5. save the animation
params = {
    'filename': 'test.mov',
    'dpi': 500,
    'progress_callback': lambda i, n: print(f'Saving frame {i} of {n}'),
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
