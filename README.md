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

[Live Demo](https://litecanvas.js.org?c=eJyNkM1OwzAQhO9%2BijnaEDWh3CL13jfgbGynGMw6sjfQCOXdcdKElgMSB0vj%2FflmtMGzM5o%2BdJZKiG4gwz4SPHmWCl8CqGv49z4m1sQtHOnn4MAvDq9xzOzNG8p8H%2FR4SnEgWza2xu4yPIMBbTgmHBYkcG7xVO%2BrRY8tjpvOvXO2xUPTzP9JTDeZht5qdtLyJZfvIH%2BcIqmVvPjszrg%2FrHJB4u6aqovJuFIwMV8Bmk7BqVK1fIMZ%2F4HJnv7C%2FM5vk%2F5cb2pClo2ahU%2Bm8yHINXa1GVd43JenxPQN%2FcCB8A%3D%3D)

For more advance usage, check the [samples](samples) code or clone this repository to run them locally:

```
git clone https://github.com/litecanvas/plugin-joystick
cd plugin-joystick
npm install
npm run dev
```
