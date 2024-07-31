let actor

litecanvas({
  loop: { init, update, draw },
})

function init() {
  // load the plugin
  use(pluginJoystick, {
    color: 5,
    size: HEIGHT / 12,
    opacityActive: 0.75,
    opacityInactive: 0.1,
    zone: [0, CENTERY, WIDTH / 2, HEIGHT / 2],
  })

  // the player object
  actor = {
    x: CENTERX,
    y: CENTERY,
    speed: 200,
  }
}

function update(dt) {
  // use the joystick to move the player object
  if (JOYSTICK.active) {
    const force = min(JOYSTICK.force, 2)
    actor.x += actor.speed * force * cos(JOYSTICK.angle) * dt
    actor.y += actor.speed * force * sin(JOYSTICK.angle) * dt
  }
}

function draw() {
  cls(1)
  circfill(actor.x, actor.y, 32, 6)
  rect(...JOYSTICK.zone, 4)
}
