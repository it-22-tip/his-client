function createBodyClickListener (fn) {
  let isListening = false

  return {
    isListening () {
      return isListening
    },

    start (cb) {
      window.addEventListener('click', _onclick, true)
      window.addEventListener('keyup', _onescape, true)
      isListening = true
      if (typeof cb === 'function') cb()
    },

    stop (cb) {
      window.removeEventListener('click', _onclick, true)
      window.removeEventListener('keyup', _onescape, true)
      isListening = false
      if (typeof cb === 'function') cb()
    }
  }

  function _onclick (e) {
    e.preventDefault()
    if (typeof fn === 'function') fn(e)
  }

  function _onescape (e) {
    if (e.keyCode === 27) _onclick(e)
  }
}

export default createBodyClickListener
