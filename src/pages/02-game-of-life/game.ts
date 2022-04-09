import { Application, Graphics } from 'pixi.js'
import { delay } from '../../utils'

enum Cell {
  Alive = 1,
  Died = 0,
}

type Position = {
  x: number
  y: number
}

type World = Cell[][]

export interface GameOption {
  el: HTMLCanvasElement
  size: number
}

function worldMap(
  fn: (cell: Cell, x: number, y: number) => Cell,
  world: World,
) {
  const mappedWorld: World = []
  for (let y = 0; y < world.length; y++) {
    mappedWorld[y] = []
    for (let x = 0; x < world[y].length; x++) {
      mappedWorld[y].push(fn(world[y][x], x, y))
    }
  }

  return mappedWorld
}

function renderCell(
  graphics: Graphics,
  pos: Position,
  size: number,
  cell: Cell,
) {
  // console.log('pos', pos.x, pos.y, cell)
  switch (cell) {
    case Cell.Alive:
      graphics.beginFill(0x646464, 1)
      graphics.drawRect(pos.x, pos.y, size, size)
      graphics.endFill()
      break
    case Cell.Died:
      // graphics.beginFill(255)
      // graphics.drawRect(pos.x, pos.y, size, size)
      // graphics.endFill()
      break
    default:
      throw new Error('unknown cell status: ' + cell)
  }
}

function genRandomCell() {
  return Math.random() > 0.08 ? Cell.Died : Cell.Alive
}

function genWorld(size: number) {
  const world: World = []
  for (let y = 0; y < size; y++) {
    world[y] = []
    for (let x = 0; x < size; x++) {
      const cell = genRandomCell()
      world[y].push(cell)
    }
  }

  return world
}

function isOverflow(pos: Position, world: World) {
  return (
    pos.x < 0 ||
    pos.y < 0 ||
    world.length == 0 ||
    pos.x >= world[0].length ||
    pos.y >= world.length
  )
}

function getAliveNeighbors(x: number, y: number, world: World) {
  let acc = 0

  for (let offsetX = -1; offsetX < 2; offsetX++) {
    for (let offsetY = -1; offsetY < 2; offsetY++) {
      const offset: Position = {
        x: x + offsetX,
        y: y + offsetY,
      }

      if (offsetX === 0 && offsetY === 0) {
        continue
      }

      if (isOverflow(offset, world)) {
        continue
      }

      acc += world[offset.y][offset.x]
    }
  }

  return acc
}

function _run(
  graphics: Graphics,
  canvasSize: number,
  size: number,
  world: World,
) {
  let cellSize = canvasSize / size
  graphics.clear()
  return worldMap((cell, x, y) => {
    renderCell(graphics, { x: x * cellSize, y: y * cellSize }, cellSize, cell)
    const aliveNeighbors = getAliveNeighbors(x, y, world)

    switch (cell) {
      case Cell.Alive:
        return aliveNeighbors < 2 || aliveNeighbors > 3 ? Cell.Died : Cell.Alive
      case Cell.Died:
        return aliveNeighbors >= 3 ? Cell.Alive : Cell.Died
    }
  }, world)
}

export function run(option: GameOption) {
  const { el, size } = option

  if (!el) {
    throw new Error("rendering context can't be null")
  }

  const app = new Application({
    height: el.offsetWidth,
    width: el.offsetWidth,
    backgroundAlpha: 0,
  })

  el.appendChild(app.view)

  const graphics = new Graphics()

  app.stage.addChild(graphics)

  let world = genWorld(size)

  // app.ticker.maxFPS = 1
  // app.ticker.add(() => {
  //   world = _run(graphics, el.offsetWidth, size, world)
  // })

  const loop = () => {
    requestAnimationFrame(async () => {
      world = _run(graphics, el.offsetWidth, size, world)
      await delay(500)
      loop()
    })
  }

  loop()

  const stop = app.destroy.bind(app)

  return stop
}
