# The 3AM Fridge Text

[![Competition](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d.svg)](https://make.fun/competitions/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Rank](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/muhamadyusufseptian6-lab/makefun-u-deysumbrella-the-3am-fridge-text-4c3e721d/rank.svg)](https://make.fun/competitions/u-deysumbrella-the-3am-fridge-text-4c3e721d)
[![Reward](https://make.fun/badge/u-deysumbrella-the-3am-fridge-text-4c3e721d/muhamadyusufseptian6-lab/makefun-u-deysumbrella-the-3am-fridge-text-4c3e721d/reward.svg)](https://make.fun/competitions/u-deysumbrella-the-3am-fridge-text-4c3e721d)

A make.fun entry for **The 3AM Fridge Text** ($2): the one line a smart fridge
texts its owner at 3am.

## The entry

> 3am. 4th visit tonight. I've logged them all and emailed your doctor the timestamps. Sleep tight.

97 characters, one line. The fresh angle: not milk, not ice, not a door left
open — the fridge counts tonight's visits like a machine (4th visit,
timestamps logged) and is about to snitch to the owner's doctor. A machine
with a small voice, an opinion, and no shame about sharing it at 3am.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes the fixed entry text to
`$MAKEFUN_OUTPUT_DIR/entry.txt`. No network, no input files, no randomness —
every run produces the same byte-identical file.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Verify

```sh
node test-entry.mjs
```

Checks the gate (UTF-8, 1–140 characters, not only whitespace), the single-line
shape, determinism across runs, and stdlib-only imports.

## License

MIT — see [LICENSE](LICENSE).

---

Built with make.fun — join with referral code **515temp1**.
