import "litecanvas"
import { colrectcirc, Vector, vec, clamp } from "@litecanvas/utils"

const math = Math

const defaults = {
  // if false, you must enable manually with joystick.enable()
  enabled: true,

  color: 1,
  size: 64,

  position: [0.5, 0.5],
  fixed: false,

  opacityActive: 1,
  opacityInactive: 0,

  // default is the whole game screen
  zone: null,

  /**
   * null = any direction
   *
   * @type {"x"|"y"|null} lock
   */
  lock: null,

  /**
   * @type {null|(position:Vector, vector:Vector, style:object)=>void}
   */
  render: null,
}

export default function plugin(engine, config = {}) {
  const initialized = engine.stat(1)

  if (!initialized) {
    throw 'Plugin Joystick should be loaded after or inside of the "init" event'
  }

  const _events = {
      "before:tap": startJoystick,
      "before:untap": stopJoystick,
      "before:tapping": updateJoystick,
      "after:draw": drawJoystick,
    },
    _listeners = []

  let _zone = [],
    _isFullscreenZone = true,
    _position = vec(0, 0),
    _tapID,
    _enabled = false,
    _config = null

  const joystick = {
    /**
     * check if the joystick is active
     */
    on: false,

    /**
     * only for backwards compatibility
     * @deprecated
     */
    active: false,

    vector: vec(0, 0),
    angle: 0,
    force: 0,
    forceMax: 2,
    forceMin: 0,

    // TODO: only move on the X axis
    // lockX: false,
    // TODO: only move on the Y axis
    // lockY: false,

    tapSize: 16,
    stickSize: 0.5,
    style: null,

    /**
     *
     * @param {Vector} position
     * @param {Vector} vector
     * @param {object} style
     * @param {LitecanvasInstance} engine
     */
    draw(position, vector, style, engine) {
      engine.linewidth(joystick.style.border)
      engine.circ(position.x, position.y, style.size, style.color)
      engine.circfill(
        vector.x,
        vector.y,
        style.size * joystick.stickSize,
        style.color
      )
    },

    checkTap(x, y) {
      return colrectcirc(
        _zone[0],
        _zone[1],
        _zone[2],
        _zone[3],
        x,
        y,
        joystick.tapSize
      )
    },

    // Set a zone to activate the joystick
    // by default is the entire game screen
    set zone(arr) {
      const fullscreen = !Array.isArray(arr) || arr.length === 0
      const [x, y, w, h] = !fullscreen ? arr : getFullScreenZone()
      _zone = [~~x, ~~y, ~~w, ~~h]
      _isFullscreenZone = fullscreen
    },

    get zone() {
      return _zone
    },

    enable() {
      if (!_enabled) {
        for (const [event, callback] of Object.entries(_events)) {
          engine.listen(event, callback)
          _listeners.push([event, callback])
        }
        _enabled = true
      }
    },

    disable() {
      if (_enabled) {
        for (const args of _listeners) {
          engine.unlisten(...args)
        }
        _listeners.length = 0
        _enabled = joystick.active = joystick.on = false
        _tapID = null
      }
    },

    reset(config) {
      if (config) {
        _config = Object.assign({}, _config ?? defaults, config)
      }

      if (!this.style || config) {
        this.style = {
          color: _config.color,
          size: _config.size,
          opacityActive: _config.opacityActive,
          opacityInactive: _config.opacityInactive,
          border: 2,
        }
      }

      if (!_zone || config) {
        joystick.zone = _config.zone
      }

      const margin = this.style.size + this.style.border
      const width = _zone[2] - 2 * margin
      const height = _zone[3] - 2 * margin

      _position.x = _zone[0] + margin + _config.position[0] * width
      _position.y = _zone[1] + margin + _config.position[1] * height

      if (config) {
        if (_config.enabled) {
          joystick.enable()
        } else {
          joystick.disable()
        }
      }

      _tapID = null
      this.active = this.on = false
      joystick.force = joystick.angle = 0
    },
  }

  function startJoystick(x, y, id) {
    if (null === _tapID && joystick.checkTap(x, y)) {
      _tapID = id
      joystick.active = joystick.on = true

      if (!_config.fixed) {
        _position.x = x
        _position.y = y
      }

      joystick.vector.x = x
      joystick.vector.y = y

      updateJoystick(x, y, id)
    }
  }

  function stopJoystick(x, y, id) {
    if (_tapID === id) {
      joystick.reset()
    }
  }

  function updateJoystick(tapx, tapy, id) {
    if (id !== _tapID) return

    const dx = "y" === _config.lock ? 0 : tapx - _position.x
    const dy = "x" === _config.lock ? 0 : tapy - _position.y

    const dist = math.hypot(dx, dy)

    if (dist === 0) return

    const size = joystick.style.size
    const limit = math.min(dist, size)

    joystick.vector.x =
      _position.x +
      math.cos(joystick.angle) * ("y" === _config.lock ? 0 : limit)

    joystick.vector.y =
      _position.y +
      math.sin(joystick.angle) * ("x" === _config.lock ? 0 : limit)

    joystick.angle = math.atan2(dy, dx)

    joystick.force = clamp(
      math.abs(dist / size),
      joystick.forceMin,
      joystick.forceMax
    )

    engine.emit("joystick-update")
  }

  function drawJoystick() {
    let opacity =
      joystick.style[joystick.on ? "opacityActive" : "opacityInactive"]
    if (opacity > 0) {
      engine.push()
      engine.alpha(opacity)

      const render = _config.render ? _config.render : joystick.draw
      render(
        _position,
        joystick.on ? joystick.vector : _position,
        joystick.style,
        engine
      )
      engine.pop()
    }
  }

  engine.listen("resized", () => {
    if (_isFullscreenZone) {
      _zone = getFullScreenZone()
    }
  })

  function getFullScreenZone() {
    return [0, 0, engine.W, engine.H]
  }

  joystick.reset(config)

  return {
    // recommended
    joystick,

    // only for backwards compatibility
    JOYSTICK: joystick,
  }
}
