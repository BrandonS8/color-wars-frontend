var socket

var config = {
  server: 'https://brandons8-color-war-server.glitch.me/',
  canvasSize: { x: 600, y: 600 }
}

var colorSelector = document.querySelector('#color-select')

var colorOptions = ['blue', 'red', 'green']

var colorOptions = {
  red: {
    r: 255,
    g: 0,
    b: 0
  },
  green: {
    r: 0,
    g: 255,
    b: 0
  },
  blue: {
    r: 0,
    g: 0,
    b: 255
  }
}

var chosenColor = colorOptions.red

colorSelector.addEventListener('input', function(e) {
  chosenColor = colorOptions[e.currentTarget.value]
})

function setup() {
  console.log('setup')
  createCanvas(config.canvasSize.x, config.canvasSize.y)
  background(1)
  socket = io.connect(config.server)
  socket.on('mouse', function(data) {
    console.log('received:')
    console.log(data)
    smooth()
    strokeWeight(3)
    stroke(data.color.r, data.color.g, data.color.b)
    line(data.x, data.y, data.px, data.py)
  })
}

function draw() {}

function mouseDragged() {
  smooth()
  strokeWeight(3)
  stroke(chosenColor.r, chosenColor.g, chosenColor.b)
  line(mouseX, mouseY, pmouseX, pmouseY)
  sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

function sendmouse(xpos, ypos, pxpos, pypos) {
  var data = {
    x: xpos,
    y: ypos,
    px: pxpos,
    py: pypos,
    color: chosenColor
  }

  socket.emit('mouse', data)
}
