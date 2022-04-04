'use strict'
/**
*  position utilty for bento spaces
*
*
* @class PositionUtility
* @package    LKN health
* @copyright  Copyright (c) 2022 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var PositionUtility = function () {
  events.EventEmitter.call(this)
  this.ctx = {}
  this.liveSpaceCoord = {}
  this.liveMinimapCoord = {}
  this.mouseHistory = {}
  this.firstClick = false
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PositionUtility, events.EventEmitter)

/**
* set the minimap canvas context
* @method setCanvas
*
*/
PositionUtility.prototype.setCanvas = function (canvascontext) {
  this.ctx = canvascontext
}

/**
* prepare grid layout for display per module type.
* @method displayPrepareModules
*
*/
PositionUtility.prototype.startPositionSpace = function (nxpID, spaceCoord) {
  let coord = {}
  // loop over existing coordination and avoid clash
  let spaceItems = Object.keys(spaceCoord)
  let coordList = []
  if (spaceItems.length !== 0) {
    spaceItems.forEach(
      element => coordList.push(spaceCoord[element])
    )
    coord.x = 20 + (spaceItems.length * 1600) + 20
    coord.y = 20
  } else {
    coord = { x: 20, y: 20 }
  }
  // need to both add and remove and change position
  this.liveSpaceCoord[nxpID] = coord
  return coord
}

/**
* draw the current dashboard mini map locations
* @method miniMapLocations
*
*/
PositionUtility.prototype.miniMapLocations = function () {
  const localthis = this
  function placeBBox (box) {
    let xStart = box.x / 42
    let yStart = box.y / 42
    localthis.ctx.beginPath()
    localthis.ctx.strokeStyle = '#000000'
    localthis.ctx.rect(xStart, yStart, 15, 30)
    localthis.ctx.stroke()
  }
  let liveBBox = Object.keys(this.liveSpaceCoord)
  console.log(liveBBox)
  liveBBox.forEach(
    element => placeBBox(this.liveSpaceCoord[element]))
}

/**
* clear the mini map ready for update
* @method clearMMap
*
*/
PositionUtility.prototype.clearMMap = function (newCoord) {
  console.log('clear')
  this.ctx.clearRect(0, 0, 200, 200)
}

/**
* draw the current mini this of bentospace
* @method drawmMap
*
*/
PositionUtility.prototype.drawmMMap = function () {
  console.log('clear mmMap and update locations and mouse pointer')
}

/**
* update locations of Dashboards and mouse
* @method updateMmap
*
*/
PositionUtility.prototype.updateMMapSpace = function (newCoord) {
  console.log('update the locations mmap location')
  this.clearMMap()
  // update mini coords  update nxp key
  this.liveSpaceCoord[newCoord.nxp] = newCoord
  // redraw the dashboards and mouse pointer
  this.miniMapLocations()
}

/**
* draw postition of mouse pointer
* @method updateMmap
*
*/
PositionUtility.prototype.mousePointer = function (update) {
  if (this.firstClick !== true) {
    // this.ctx.clearRect(0, 0, 200, 200)
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'lightgrey'
    this.ctx.lineWidth = '3'
    this.ctx.rect(this.mouseHistory.x, this.mouseHistory.y, 10, 10)
    this.ctx.stroke()
    this.ctx.closePath()
  } else {
    this.firstClick = false
  }
  let xStart = update.x / 42
  let yStart = update.y / 42
  let mousePair = {}
  mousePair.x = xStart
  mousePair.y = yStart
  this.mouseHistory = mousePair
  this.ctx.beginPath()
  this.ctx.strokeStyle = '#FF0000'
  this.ctx.lineWidth = '1'
  this.ctx.rect(xStart, yStart, 10, 10)
  this.ctx.stroke()
  this.ctx.closePath()
}

export default PositionUtility
