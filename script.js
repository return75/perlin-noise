let canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    circleRadius = 2,
    focalLength = 300,
    sphereRadius = width > 600 ? 200 : (width - 100) / 2,
    sphereCenterZ = 0,
    pointsSpeed = .008,
    pointsNumber = 50,
    animationFrameId = null,
    disappearTime = 500,
    frameCount = 0;
const noise = new perlinNoise3d();
let allPoints = []
let colors = ['#3a86ff','#ef233c','#0ead69', '#ffbe0b', '#fb5607', '#ff006e', '#8338ec']

context.translate(width / 2, height / 2);

function createRandomPointsOnSphere () {
    let points = []
    for (let i = 0; i < pointsNumber; i++ ){
        let initialAlpha = random() * 2 * Math.PI
        let initialTheta = random() * 2 * Math.PI
        let point = Vector.createByPolar(1, 1, sphereRadius)
        point.initialAlpha = initialAlpha
        point.initalTheta = initialTheta
        point.color = colors[i % colors.length]
        points.push(point)
    }
    return points
}


let points = createRandomPointsOnSphere()

function update() {
    frameCount++
    context.clearRect(-width / 2, -height / 2, width, height);

    points.forEach((point, index) => {
        point.creationTime = Date.now()
        allPoints.push(point)
    })
    points = points.map((point, index) => {
        let t = frameCount * pointsSpeed
        let x = noise.get(t) * 2 - 1;
        let y = noise.get(0, t) * 2 - 1 ;
        let z = noise.get(0, 0, t) * 2 - 1 ;
        let newPoint = Vector.createByCartesian(x, y, z)
        newPoint.setLength(sphereRadius)
        newPoint = newPoint.addAlphaAndPolar(point.initialAlpha, point.initalTheta)
        newPoint.initialAlpha = point.initialAlpha
        newPoint.initalTheta = point.initalTheta
        newPoint.color = point.color
        return newPoint
    })
    allPoints.forEach(point => drawPoint(point))
    allPoints = allPoints.filter(point => Date.now() - point.creationTime < disappearTime)
    animationFrameId = requestAnimationFrame(update);
}
function drawPoint(point) {
    let perspective = getPerspective(point)
    context.save()
    context.translate(point.getX() * perspective, point.getY() * perspective)
    context.scale(perspective, perspective)
    context.beginPath();
    context.arc(0, 0, circleRadius, 0, Math.PI * 2);
    context.fillStyle = point.color
    context.fill();
    context.restore();
}
function getPerspective(point) {
    return focalLength / (focalLength + sphereCenterZ + point.getZ())
}
function listenToKeyboard () {
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space' && animationFrameId) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = null
        } else if (e.code === 'Space') {
            update()
        }
    })
}
function random () {
    return Math.random()
}
update();
listenToKeyboard()
