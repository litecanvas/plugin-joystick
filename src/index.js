/*! Joystick plugin for litecanvas v0.3.0 by Luiz Bills | MIT Licensed */
export default function plugin(engine) {
  // vector 2d helpers
  const vec = (x = 0, y = 0) => ({ x, y })
  const veclen = (v) => vecdot(v, v) ** 0.5
  const vecdot = (a, b) => a.x * b.x + a.y * b.y
  const vecscale = (v, n) => vec(v.x * n, v.y * n)
  const vecadd = (a, b) => vec(a.x + b.x, a.y + b.y)

  let _zone = [],
    _disableDefaultZone = engine.listen("resized", updateDefaultZone),
    _position = vec(0, 0)

  engine.listen("update", updateJoystick, true)
  engine.listen("draw", drawJoystick)

  updateDefaultZone()

  const joystick = {
    enabled: true,
    active: true,

    vector: vec(0, 0),
    angle: 0,
    force: 0,

    //  TODO: only move on the X axis
    lockX: false,
    // TODO: only move on the Y axis
    lockY: false,

    tapSize: 100,

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
      color: 3,
      size: 100,
      opacityActive: 0.5,
      opacityInactive: 0,
    },

    draw(position, vector, style) {
      engine.circfill(position.x, position.y, style.size, style.color)
      engine.circfill(vector.x, vector.y, style.size * 0.4, style.color)
    },

    checkTap() {
      return engine.colrect(
        engine.TAPX,
        engine.TAPY,
        joystick.tapSize,
        joystick.tapSize,
        _zone[0],
        _zone[1],
        _zone[2],
        _zone[3]
      )
    },
  }

  function updateJoystick() {
    if (!joystick.enabled) return

    if (engine.TAPPING) {
      const tapx = engine.TAPX,
        tapy = engine.TAPY

      if (!joystick.active && joystick.checkTap()) {
        joystick.active = true
        _position.x = tapx
        _position.y = tapy
      }

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
    } else if (joystick.active) {
      joystick.active = false
      if (_zone) {
        _position.x = _zone[0] + _zone[2] / 2
        _position.y = _zone[1] + _zone[3] / 2
      }
    }
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

window.pluginJoystick = plugin
