# Joystick plugin for litecanvas

Adds a virtual joystick to [litecanvas](https://github.com/litecanvas/game-engine) games.

## Install

**NPM**: `npm i @litecanvas/plugin-joystick`

**CDN**: `https://unpkg.com/@litecanvas/plugin-joystick/dist/dist.js`

## Basic Usage

```js
import litecanvas from "litecanvas"
import pluginJoystick from "@litecanvas/plugin-joystick"

litecanvas({
  loop: { init, update, draw },
})

use(pluginJoystick) // load the plugin

actor = {
  x: CENTERX,
  y: CENTERY,
  speed: 100,
}

function update(dt) {
  if (JOYSTICK.active) {
    const force = min(JOYSTICK.force, 2)
    actor.x += actor.speed * force * cos(JOYSTICK.angle) * dt
    actor.y += actor.speed * force * sin(JOYSTICK.angle) * dt
  }
}

function draw() {
  cls(1)
  circfill(actor.x, actor.y, 32, 6)
}
```

[See this demo in litecanvas playground](https://litecanvas.js.org?c=eJx1UdFOwjAUfd9X3Le1WLeJiQ8kGA0SAxpIhAd5XLoOC6Vb2juEmP27oys6En1pem7PueecVEkUPNX71BIaBHmlOcpCg9QSCYWvAEAVabbgRpZIwg%2FE0g7iuNLldh3xYhc%2FqJ8FcamqtdTXm%2BJoUfJtnEmL7og2NmRAjLAUhvduK0BlBWkVUy%2BgzbxuUgCkHAsDQ888DGA0ni3Hb%2B%2FM4eMZr1psSyGyAfST5ITroO4UqcosRUEybMvIHMjr%2FPFpMnumYARWRvvpdL5aLCejl6jxlntBvTcvtEXIC8NFk2cn9S%2FRDRncUEd0kaMDXA391aWCntf2mk22Y6LXqvHoQYYd9fF%2Fte06X6ovC2cm%2FfQ%2Fx5UlLt0frQHFAUnCEhb6lyiKwhOZS8NzqRTxjdg5HIPbPoM7GtTfQDqpSw%3D%3D)

For more details, check the [demo](demo/index.html).
