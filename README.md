# Joystick plugin for litecanvas

Adds a virtual joystick to [litecanvas](https://github.com/litecanvas/game-engine) games.

## Install

**NPM**: `npm i @litecanvas/plugin-joystick`

**CDN**: `https://unpkg.com/@litecanvas/plugin-joystick/dist/dist.js`

## Basic Usage

```js
import litecanvas from "@litecanvas/litecanvas"
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
    actor.y += actor.speed * -force * sin(JOYSTICK.angle) * dt
  }
}

function draw() {
  clear(1)
  circfill(actor.x, actor.y, 32, 6)
}
```

[See this demo in litecanvas playground](https://litecanvas.js.org?c=eJxtkEFPAjEQhe%2F7K%2Ba2LZbdFRMPJBgNEgMaSICDHJtuFwulu2lnEWL47y6lKEQvTWc6X9%2B8pxVKwc2WO0KjiAssLfTgKwLYdaE%2FGM8H03fWVPtztThWrpIy70Iny1h0iKKiNgJVaUAZhYR6XJc8nwmrKiTxB2Llumlam2q9TES5SR%2F1j25a6XqpTHtV7h0qsU5z5dAfycrFDIiVjkLvwf8KUDtJTsQoALTpH%2BjVHnWVc5Qkx9MuqgDyNnl6Ho5fKFiJtTWhO5osZvNh%2FzVpnKutpEFElMYhFKUVskljo8zvoG8yuKV%2B0AeW7OCmF64%2BGWgFttX85C5EzFI3Gi3I8YLe%2F6XbZ9xdSl%2FjhyvHueWfIXmhJbfEL%2FiPcUC5Q5KxjMXhJUmS%2BDgslBWF0poEU%2By8H4O7DoP7JuJvrZKo%2FQ%3D%3D)

For more details, check the [demo](demo/index.html).
