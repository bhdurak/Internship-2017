import io
import os
import sys
ph = raw_input()

phsliced = ph[16:39]


with open(ph, 'rb') as inf:
    jpgdata = inf.read()


if ph.endswith('.jpg'):
    text = 'This is a jpg file!'
elif ph.endswith('.png'):
    text = 'This is ('+phsliced+ ') a png file!'

else:
    text = 'This is a random file (%d bytes long)\n'

sys.stdout.write(text)
sys.stdout.flush()


