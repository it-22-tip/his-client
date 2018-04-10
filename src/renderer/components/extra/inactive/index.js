'use strict'

let timeoutID
let wait = 3000

const startTimer = function () {
  // wait 2 seconds before calling goInactive
  timeoutID = window.setTimeout(goInactive, wait)
}

const setup = function () {
  this.addEventListener('mousemove', resetTimer, false)
  this.addEventListener('mousedown', resetTimer, false)
  this.addEventListener('keypress', resetTimer, false)
  this.addEventListener('DOMMouseScroll', resetTimer, false)
  this.addEventListener('mousewheel', resetTimer, false)
  this.addEventListener('touchmove', resetTimer, false)
  this.addEventListener('MSPointerMove', resetTimer, false)

  startTimer()
}
setup()

function resetTimer (e) {
  window.clearTimeout(timeoutID)

  goActive()
}

function goInactive () {
  // do something
}

function goActive () {
  // do something

  startTimer()
}
