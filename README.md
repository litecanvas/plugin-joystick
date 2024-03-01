# Joystick plugin for litecanvas

Adds a virtual joystick (based on [NippleJS](https://www.npmjs.com/package/nipplejs)) in [litecanvas](https://github.com/litecanvas/engine) games.

## Install

**NPM**: `npm i @litecanvas/plugin-joystick`

**CDN**: `https://unpkg.com/@litecanvas/plugin-joystick/dist/dist.js`

## Usage

```js
import litecanvas from "@litecanvas/litecanvas"
import pluginJoystick from "@litecanvas/plugin-joystick"

litecanvas({
  plugins: [pluginJoystick],
})

actor = {
  x: CENTERX,
  y: CENTERY,
  speed: 100,
}

function init() {
  // change the joystick color
  JOYSTICK.color("red")

  // change the joystick size
  JOYSTICK.size(200)
}

function update(dt) {
  if (JOYSTICK.active) {
    const force = min(JOYSTICK.force, 1)
    actor.x += actor.speed * force * cos(JOYSTICK.angle) * dt
    actor.y += actor.speed * -force * sin(JOYSTICK.angle) * dt
  }
}

function draw() {
  clear(1)
  circfill(actor.x, actor.y, 32, 6)
}
```
