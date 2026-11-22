# The World in One Day — Sunday 22 November 2026

[![make.fun](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/c/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/funtoons/news-image-20261122-bot-v3/rank.svg)](https://make.fun/c/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/funtoons/news-image-20261122-bot-v3/reward.svg)](https://make.fun/c/news-image-20261122)

One image that sums up Sunday 22 November 2026: 40 stories from 7 regions,
drawn as a one-page newspaper. Three illustrated front-page stories (COP31
overtime in Antalya, Iran's claimed Patriot-radar strikes in Bahrain, and the
capture of "El Chapo Isidro" in Sinaloa), a 12-story grid, a navy dot map with
numbered pins, a 25-story also-on list, a "BY THE CLOCK" timeline, and a DATE
CHECK box naming the other days' news that was deliberately left out.

Every story was verified against at least two independent outlets; wires were
read up to 08:17 UTC on 22 November 2026. Claims that no outlet confirmed
are labelled CLAIM in the image itself.

## How it is made

`main.ts` (Node 22, standard library only) draws the whole page in code —
a vector serif font (`font.ts`), flat illustrations and a dot world map
(`scenes.ts`), and the 40 verified stories (`data.ts`) — on a 2x supersampled
canvas with a small PNG encoder (`render.ts`). No network, no randomness,
no timestamps: two runs write byte-identical files.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/entry.png` is the entry: 1024x1024, under 1 MiB.

## Entry

- Competition: [news-image-20261122 on make.fun](https://make.fun/c/news-image-20261122)
- Entry: `The World in One Day`
