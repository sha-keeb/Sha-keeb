# Current profile visuals

- `hardware-lab.gif`: user-supplied electronics-workbench animation, preserved unchanged (480 × 270, 96 frames, six-second loop).
- `identity.svg`: nameplate and circuit motif.
- `project-tictactoe.svg` and `project-japantech.svg`: original project cards, linked to their source repositories.
- `toolbox.svg`: current skills and exploration areas, not proficiency ratings.
- `learning-route.svg`: conceptual learning route, not a measured progress chart.
- `signal-footer.svg`: circuit-style closing detail.

All important project and identity information is also available as text in the profile. The animation is decorative and does not represent live hardware telemetry.

## Previous artwork (preserved)


The header combines the profile's original pixel workstation with a dark terminal frame, a moonlit landscape, monochrome textures, and a restrained lime accent. Reference images informed the visual direction; their image files are not embedded or redistributed.

- `embedded-banner.gif`: self-hosted looping animation, 1200 × 400, 32 frames, approximately four seconds.
- `embedded-banner.svg`: static version, linked from the profile for readers who prefer it.
- `cyberpunk-banner.svg`: preserved original workstation artwork.
- `source/`: rendering and GIF-encoding scripts.

The cursor, stars, and signal move gently. The animation is decorative, not a live activity monitor; no statistics or hardware telemetry are implied.

## Regenerate

Requires Node.js with `sharp` and Python with `Pillow`.

From `assets/source/`, run:

```sh
node render-banner.cjs
python encode-gif.py
```

The renderer reads the preserved `../cyberpunk-banner.svg`, writes a static SVG to `../embedded-banner.svg`, and creates temporary PNG frames in `frames/`. The encoder writes `../embedded-banner.gif`.

The README repeats the important identity and project information as normal text, so the artwork is not required to understand the profile.
