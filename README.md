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

let actor

litecanvas({
  loop: { init, update, draw },
})

function init() {
  use(pluginJoystick) // load the plugin

  actor = {
    x: W / 2,
    y: H / 2,
    speed: 200,
  }
}

function update(dt) {
  if (joystick.on) {
    const { angle, force } = joystick
    actor.x += actor.speed * force * cos(angle) * dt
    actor.y += actor.speed * force * sin(angle) * dt
  }
}

function draw() {
  cls(0)
  circfill(actor.x, actor.y, 32, 3)
}
```

[Live Demo](https://litecanvas.js.org?c=eJx1ks1uwyAQhO9%2BijlCaiVW0kNlKYfe8gY5U4xTWgIWbH7cyO9ejJ3UVtSDEQMz3y4rG01KCnsWgfEsq09WknYW2mpiHLcMWK2gj43zJCyVUFZ8GAX6VPhybSAtvxH9jRHtwbuTrWLifrEczD04YVzTs4Up4ZV0ttaHGWea9CooYn15QDrjfIl1nlTQP6rE69ugXCOkpvY9dn2Ox8VyE4%2B7VFBIch5bDJBrif1qRLQldvd9aJSqIrwoet1l3WQIp6YSpFhFwyB0DfZo0FmOe3s2EG4Q9mBUjtp5qdDFwpN3AWlJLS2veNmO21QdizG0iKzAEodHUdEk1P4fCto%2BhWbltrh40bBR5ihy7PmMPXO0ybHjT%2FOovLiMP4U0gRW9Q2ova23MH%2F0B2azjx7PuF0U2tgY%3D)

For more advance usage, check the [samples](samples) code or clone this repository to run them locally:

```
git clone https://github.com/litecanvas/plugin-joystick
cd plugin-joystick
npm install
npm run dev
```
