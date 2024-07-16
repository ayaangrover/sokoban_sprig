/*
@title: candyshopper
@author: ayaangrover
@tags: ["puzzle"]
@addedOn: 2024-07-15
*/

const player = "p"
const juice = "a"
const chocolate = "b"
const candycane = "o"
const goal = "g";
const wall = "w";

setLegend(
  /* [ player, bitmap`
................
.....77777......
....7777777.....
...777777777....
...7777777777...
...777777777777.
...6666666666...
...0000000000...
...6666660000...
...6666666666...
...66666666666..
...66666CCCCC...
...666666CC66...
...6666666CCC...
...66666666CC...
................` ], */
  [player, bitmap`
................
....00000000....
..000......000..
.00..........00.
.0..0......0..0.
.0....0..0....0.
.0....0000....0.
.00..........00.
..000......000..
....00000000....
....0......0....
....0......0....
.0000......0000.
................
................
................`],
  [juice, bitmap`
................
....1111........
.......1........
.......1........
...99999999999..
...92222222229..
...92222242229..
...9222C422229..
...92299992229..
...92999999229..
...92999999229..
...92299992229..
...92222222229..
...92222222229..
...92222222229..
...99999999999..`],
  [chocolate, bitmap`
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....0000000.....
....0C0C0C0.....
....1110000.....
....3311111.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....
....3333333.....`],
  [candycane, bitmap`
................
................
......343.......
.....4...4......
....3.....3.....
....4.....4.....
....3.....3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........4.....
..........3.....
..........2.....`],
  [goal, bitmap`
................
................
................
..LLLLLLLLLLL...
..L.........L...
..L.........L...
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
L.L.L.L.L.L.L.L.
LLLLLLLLLLLLLLL.
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);


let level = 0
const levels = [
  map`
p..
..a
..g`,
  map`
p..ag
.....
a.b..
.o...
g.g.g`,
  map`
p..
ww.
...
.ww
...
ww.
...
.ww
...
ww.
ga.
www`,
  map`
w..w
.a.w
ww.w
ww..
g...
....
....
....
....
....
....
....
....
.o..
bg..`,
  map`
p..
..a
..g`,
  map`
p..
..a
..g`,
  map`
p..
..a
..g`,
  map`
p..
..a
..g`,
  map`
p..
..a
..`,
  map`
p..
..a
..g`,
  map`
p..
..a
..g`
]

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, juice, chocolate, candycane, wall]);

setPushables({
  [player]: [juice, chocolate, candycane]
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const baskets = tilesWith(goal).length;

  const successes = tilesWith(goal, juice).length + tilesWith(goal, chocolate).length + tilesWith(goal, candycane).length;
  if (successes === baskets) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("game over");
    }
  }
});