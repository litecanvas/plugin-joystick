/*! Joystick plugin for litecanvas v0.4.2 by Luiz Bills | MIT Licensed */
window.pluginJoystick = plugin

export default function plugin(engine, _, config = {}) {
  // vector 2d helpers
  const vec = (x = 0, y = 0) => ({ x, y })
  const veclen = (v) => vecdot(v, v) ** 0.5
  const vecdot = (a, b) => a.x * b.x + a.y * b.y
  const vecscale = (v, n) => vec(v.x * n, v.y * n)
  const vecadd = (a, b) => vec(a.x + b.x, a.y + b.y)

  let _zone = [],
    _disableDefaultZone,
    _position = vec(0, 0),
    _tapID = null

  const joystick = {
    enabled: true,
    active: false,

    vector: vec(0, 0),
    angle: 0,
    force: 0,

    //  TODO: only move on the X axis
    lockX: false,
    // TODO: only move on the Y axis
    lockY: false,

    tapSize: 25,

    // Set a zone to activate the joystick
    // by default is the entire game screen
    set zone(value) {
      const [x, y, width, height] = value
      _zone = [~~x, ~~y, ~~width, ~~height]

      if (_disableDefaultZone) {
        _disableDefaultZone()
        _disableDefaultZone = null
      }
    },

    get zone() {
      return _zone
    },

    style: {
      color: config.color ?? 3,
      size: config.size ?? 100,
      opacityActive: config.opacityActive ?? 0.5,
      opacityInactive: config.opacityInactive ?? 0,
    },

    draw(position, vector, style) {
      engine.circfill(position.x, position.y, style.size, style.color)
      engine.circfill(vector.x, vector.y, style.size * 0.4, style.color)
    },

    checkTap(x, y) {
      return engine.colrect(
        x,
        y,
        joystick.tapSize,
        joystick.tapSize,
        _zone[0],
        _zone[1],
        _zone[2],
        _zone[3]
      )
    },

    reset() {
      _tapID = null
      this.active = false
      if (_zone) {
        _position.x = _zone[0] + _zone[2] / 2
        _position.y = _zone[1] + _zone[3] / 2
      }
    },
  }

  engine.listen("before:tap", startJoystick)
  engine.listen("before:untap", stopJoystick)
  engine.listen("before:tapping", updateJoystick)
  engine.listen("after:draw", drawJoystick)

  _disableDefaultZone = engine.listen("resized", updateDefaultZone)

  if (config.zone) {
    joystick.zone = config.zone
  } else {
    updateDefaultZone()
  }

  joystick.reset()

  function startJoystick(x, y, id) {
    if (!joystick.enabled) return

    if (null === _tapID && joystick.checkTap(x, y)) {
      _tapID = id
      joystick.active = true
      _position.x = joystick.vector.x = x
      _position.y = joystick.vector.y = y
    }
  }

  function stopJoystick(x, y, id) {
    if (_tapID === id) {
      joystick.reset()
    }
  }

  function updateJoystick(tapx, tapy, id) {
    if (!joystick.enabled) return
    if (id !== _tapID) return

    let tap = vecadd(vec(tapx, tapy), vecscale(_position, -1))
    let dist = veclen(tap)
    let force = abs(dist / joystick.style.size)

    if (dist > joystick.style.size) {
      let ratio = joystick.style.size / dist
      tap = vecscale(tap, ratio)
    }

    joystick.vector = vecadd(_position, tap)
    joystick.angle = atan2(tap.y, tap.x)
    joystick.force = force
  }

  function drawJoystick() {
    if (!joystick.enabled) return

    let style = joystick.style
    let opacity = style[joystick.active ? "opacityActive" : "opacityInactive"]
    if (opacity > 0) {
      engine.push()
      engine.alpha(opacity)
      joystick.draw(
        _position,
        joystick.active ? joystick.vector : _position,
        style
      )
      engine.pop()
    }
  }

  function updateDefaultZone() {
    _zone = [0, 0, engine.WIDTH, engine.HEIGHT]
  }

  return { JOYSTICK: joystick }
}
