# Joystick plugin for litecanvas

Adds a virtual joystick (based on [NippleJS](https://www.npmjs.com/package/nipplejs)) in [litecanvas](https://github.com/litecanvas/game-engine) games.

## Install

**NPM**: `npm i @litecanvas/plugin-joystick`

**CDN**: `https://unpkg.com/@litecanvas/plugin-joystick/dist/dist.js`

## Usage

```js
import litecanvas from "@litecanvas/litecanvas"
import pluginJoystick from "@litecanvas/plugin-joystick"

litecanvas({
  plugins: [pluginJoystick],
  loop: { init, update, draw },
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

[See this demo in litecanvas playground](https://litecanvas.js.org?c=eJx9T9FqwjAUfe9X3DcTV1vnYA8Fx4aToRsK6sN8DGnqojEtya1TRv99NY1SGewlybk5555zlETBmT4wS34CAGTF%2BCA02gQypqwIg4oGQVZqjjLXILVEQuHMVDlLl9zIAknnC7GwSRyXuthtIp7v42d13RsXqtxI3dvmJ4uS7%2BJUWnRHtLWdEIgRlsLwyW0FaNikuaZeQ%2BuvcxAAxjE3MPTkYwKj8Ww1XnyGDp8ueN1gWwiRJjDo98%2B4CqpWl7JIGQqSYtNHZkA%2B5i%2Bvk9kbBSOwNNpPp%2FP1cjUZvUe1tzwI6r15ri1Clhsu6jz7OvOV6IYh3FNHdJGjI9wN%2FdOlgq7XdutNtmWiN6r26EKKLfXpr7p3kdu29a38tnFq2Df5ry1XghniYnNpeCaVIj59eAkSwsMghEcaVL%2BaR61S)
