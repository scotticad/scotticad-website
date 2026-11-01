# A fit gauge: a 10 mm peg, and a row of holes that get a little bigger.
PEG = 10                              # peg size across, in mm
GAPS = [0.1, 0.2, 0.3, 0.4, 0.5]      # the gap all the way round the peg, in mm
SPACING = 16                          # mm between holes

width = len(GAPS) * SPACING
plate = cad.add_shape("box")
cad.set_bounds(min=[0, 0, 0], max=[width, 26, 5], ids=[plate])

parts = [plate]
for i, gap in enumerate(GAPS):
    x = SPACING / 2 + i * SPACING
    r = PEG / 2 + gap                 # the gap is on both sides
    hole = cad.add_shape("cylinder", hole=True)
    cad.set_param(hole, "sides", 64)
    cad.set_bounds(min=[x - r, 16 - r, -1], max=[x + r, 16 + r, 6], ids=[hole])
    parts.append(hole)
    label = cad.add_shape("text", hole=True)
    cad.set_text(label, str(gap))
    cad.set_bounds(min=[x - 5, 2.5, 4.4], max=[x + 5, 7.5, 6], ids=[label])
    parts.append(label)
cad.group("union", ids=parts)

peg = cad.add_shape("cylinder")
cad.set_param(peg, "sides", 64)
px = width / 2
cad.set_bounds(min=[px - PEG/2, 34, 0], max=[px + PEG/2, 34 + PEG, 15], ids=[peg])
print("made a gauge with", len(GAPS), "holes")
