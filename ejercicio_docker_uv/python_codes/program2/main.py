import numpy as np

mensualidades = np.array([650, 700, np.nan, 675, 720])
media = np.nanmean(mensualidades)

print("Media de las mensualidades:", media)
