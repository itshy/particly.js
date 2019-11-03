const minDistance = 125
const points = []

for (let i = 0; i <  100; i++) {
  points.push({ top: Math.floor(Math.random() * 800), left: Math.floor(Math.random() * 800), cosMoving: (Math.random() * 2 - 1) })
}

console.log('points', points)

function initParticly() {
  const canvas = document.querySelector('#root-canvas')
  const ctx = canvas.getContext('2d')
  let mouseTop = 0;
  let mouseLeft = 0;

  function mouseMoveCanvas(event) {
    mouseTop = event.clientY - canvas.getBoundingClientRect().top
    mouseLeft = event.clientX - canvas.getBoundingClientRect().left
  }

  function redraw() {
    ctx.clearRect(0, 0, 800, 800);

    points.map((point, index) => {
      const distanceY = Math.abs(mouseTop - point.top)
      const distanceX = Math.abs(mouseLeft - point.left)
      const mouseMoreByY = (mouseTop - point.top) > 0
      const mouseMoreByX = (mouseLeft - point.left) > 0
      const hypo = 1 // hypotenyze
      const cosCatHyp = distanceX / hypo
      let xCat = 0
      let yCat = 0

      xCat = cosCatHyp * hypo
      yCat = Math.sqrt(minDistance*minDistance - xCat*xCat)

      points[index].top = mouseMoreByY ? mouseTop - yCat : mouseTop + yCat
      points[index].left = mouseMoreByX ? mouseLeft - xCat : mouseLeft + xCat
    })

    points.map((point, index) => {
      const distanceY = Math.abs(mouseTop - point.top)
      const distanceX = Math.abs(mouseLeft - point.left)
      const mouseMoreByY = (mouseTop - point.top) > 0
      const mouseMoreByX = (mouseLeft - point.left) > 0
      const distanceMouseToPoint = Math.sqrt(distanceX*distanceX + distanceY*distanceY) // hypotenyze
      const cosCatHyp = distanceX / distanceMouseToPoint
      let xCat = 0
      let yCat = 0

      if (distanceMouseToPoint < minDistance) {
        xCat = cosCatHyp * minDistance
        yCat = Math.sqrt(minDistance*minDistance - xCat*xCat)

        points[index].top = mouseMoreByY ? mouseTop - yCat : mouseTop + yCat
        points[index].left = mouseMoreByX ? mouseLeft - xCat : mouseLeft + xCat
      }

      ctx.beginPath()
      ctx.arc(points[index].left, points[index].top, 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    })
  }

  canvas.addEventListener('mousemove', mouseMoveCanvas)
  setInterval(redraw, 15)
}

initParticly()