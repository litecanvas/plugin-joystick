# Joystick plugin for Litecanvas

Adds a virtual joystick to [litecanvas](https://github.com/litecanvas/game-engine) games.

<!-- prettier-ignore -->
> [!TIP]
> **This plugin is automatically loaded on Litecanvas [playground](https://litecanvas.js.org/).**

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

function init() {
  use(pluginJoystick) // load the plugin

  actor = {
    x: W / 2,
    y: H / 2,
    speed: 100,
  }
}

function update(dt) {
  if (joystick.on) {
    actor.x += actor.speed * joystick.force * cos(joystick.angle) * dt
    actor.y += actor.speed * joystick.force * sin(joystick.angle) * dt
  }
}

function draw() {
  cls(0)
  circfill(actor.x, actor.y, 32, 3)
}
```

[Live Demo](https://litecanvas.js.org?c=eJyNkstuwyAQRff%2BillCGzlW0kWFlEV3%2BYOsKR67tJRBgJO4lf%2B9GDsPq6rUBRJzuXPmIYyOqKQ9ysB4UTSdVVGTBW11ZBy%2BC4D1GvSnIx%2BljQLQyleDEN8Q3qkPUasPSH5nZN966mydMi4P5WQewRlDbmRLI8CjItvodsG5z%2FQYMLKxPMwlawHRd7jKkiJDXsBmioL%2BQgFPz1NETiod%2B5c0yDHJVblN8pB7kCqShx1M3LOAw3pG9AL2l3twOFbbVNUYD8Vwt5fO1TIiq%2BO0G90Au%2FZMls%2FkXKc8w%2BNuvmYkPNzma8grTIKicANI2xrkSa3jHab%2FByZo%2BzcmrTqQwdJQy5aZPL8vWt7ByUvH5nAF1QoOfNHNwtFnx57%2FWlTt5Wn%2BQMoEVo0Opb1qtDE3%2BhWy3aTDi%2BEHpGTIIg%3D%3D)

For more advance usage, check the [samples](samples) code or clone this repository to run them locally:

```
git clone https://github.com/litecanvas/plugin-joystick
cd plugin-joystick
npm install
npm run dev
```
