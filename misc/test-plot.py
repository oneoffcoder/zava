# https://stackoverflow.com/questions/57316491/how-to-convert-matplotlib-figure-to-pil-image-object-without-saving-image

import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    'x1': [1, 2, 3, 4],
    'x2': [5, 6, 7, 8]
})

fig, ax = plt.subplots(figsize=(10, 4))
df.plot(kind='line', ax=ax)
_ = ax.get_legend().remove()
fig.savefig('test.png', dpi=1000)
plt.tight_layout()
plt.show()