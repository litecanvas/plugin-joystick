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
    speed: 200,
  }
}

function update(dt) {
  if (joystick.on) {
    const [angle, force] = joystick.get()
    actor.x += actor.speed * force * cos(angle) * dt
    actor.y += actor.speed * force * sin(angle) * dt
  }
}

function draw() {
  cls(0)
  circfill(actor.x, actor.y, 32, 3)
}
```

[Live Demo](https://litecanvas.js.org?c=eJx1ks1ugzAQhO88xRztFiUo6aFCyqG3vEEOVQ%2BuMdSNayN780Mr3r3GkDQo6gHstWe%2BHVYYTUoKexSB8SyrD1aSdhbaamIcPxmwXEJ%2Ftc6TsFRCWfFuFOhD4dN1gbTcI%2BpbI7rGu4OtouNysRjFAzhhXDuwhSnhlXS21s2Mc%2Bv0KihiQ3tAOuN8iVWeqqC%2FVYmn57FyrZCaupeY%2BhiPi8U6HvepoZDkPDYYIecSu%2BWE6EpsL%2FvQKlVFeFEMdZ%2F1N0M4tJUgxSoaB6FrsGtAZzku8WwgvArbGJWjdl6qt9j2qmzih%2FCkTK8Ua3HG42bapgR4GJ1xlS6wBOOxqOjG1P1vCtremWbtNjh50bKpzFHk2PEZe6bokmLL72ZSeXGafgxpAisGhdRe1tqYP%2FoVsl7Fh2f9Lz5dt0U%3D)

For more advance usage, check the [samples](samples) code or clone this repository to run them locally:

```
git clone https://github.com/litecanvas/plugin-joystick
cd plugin-joystick
npm install
npm run dev
```
