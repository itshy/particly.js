const minDistance = 125
const minDistancePoints = 200
const width = 800
const height = 800
const countPoints = 50
let points = []
let lines = []

for (let i = 0; i < countPoints; i++) {
  points.push({
    top: Math.floor(Math.random() * 800),
    left: Math.floor(Math.random() * 800),
    cosMoving: Math.random() * 1,
    directionX: ((Math.random() * 2 - 1) >= 0) ? 1 : -1,
    directionY: ((Math.random() * 2 - 1) >= 0) ? 1 : -1,
  })
}

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
    lines = []
    ctx.clearRect(0, 0, 800, 800);

    points.map((point, index) => {
      const hypo = 1
      const cosCatHyp = point.cosMoving
      let xCat = 0
      let yCat = 0

      xCat = cosCatHyp * hypo
      yCat = Math.sqrt(hypo*hypo - xCat*xCat)

      points[index].top = points[index].top + (yCat * points[index].directionY)
      points[index].left = points[index].left + (xCat * points[index].directionX)
    })

    points = points.filter(point => (point.top > 0) && (point.left > 0) && (point.top < width) && (point.left < height))

    for (let i = points.length; i < countPoints; i++) {
      points.push({
        top: Math.floor(Math.random() * 800),
        left: Math.floor(Math.random() * 800),
        cosMoving: Math.random() * 1,
        directionX: ((Math.random() * 2 - 1) >= 0) ? 1 : -1,
        directionY: ((Math.random() * 2 - 1) >= 0) ? 1 : -1,
      })
    }

    for (let i = 0; i < countPoints; i++) {
      for (let j = 0; j < countPoints; j++) {
        if (i !== j) {
          const diffX = Math.abs(points[i].left - points[j].left)
          const diffY = Math.abs(points[i].top - points[j].top)
          const diffHyp = Math.sqrt(diffX*diffX + diffY*diffY)
  
          if (diffHyp < minDistancePoints) {
            lines.push({
              lineX1: points[i].left,
              lineY1: points[i].top,
              lineX2: points[j].left,
              lineY2: points[j].top,
              opacity: 1 - diffHyp / minDistancePoints,
            })
          }
        }
      }
    }

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
      ctx.arc(points[index].left, points[index].top, 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    })

    lines.length > 0 && lines.map(line => {
      ctx.beginPath()
      ctx.moveTo(line.lineX1, line.lineY1)
      ctx.lineTo(line.lineX2, line.lineY2)
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(0, 0, 0, ${line.opacity})`
      ctx.stroke()
    })
  }

  canvas.addEventListener('mousemove', mouseMoveCanvas)
  setInterval(redraw, 15)
}

initParticly()