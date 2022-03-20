export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export function fps() {
  var ctx = (document.getElementById('fps') as HTMLCanvasElement).getContext(
    '2d',
  )!
  var rAF = (function () {
    return (
      window.requestAnimationFrame ||
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  var frame = 0
  var allFrameCount = 0
  var lastTime = Date.now()
  var lastFameTime = Date.now()

  var loop = function () {
    var now = Date.now()
    var fs = now - lastFameTime
    var fps = Math.round(1000 / fs)

    lastFameTime = now
    //Do not set to 0, record the difference of this value at the beginning and end of the animation to calculate FPS
    allFrameCount++
    frame++

    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime))

      ctx.clearRect(0, 0, 100, 100)
      ctx.font = '14px Serif'
      ctx.fillStyle = 'rgb(127,127,127)'
      ctx.fillText(`FPS: ${fps}`, 10, 20)

      frame = 0
      lastTime = now
    }

    rAF(loop)
  }

  loop()
}
