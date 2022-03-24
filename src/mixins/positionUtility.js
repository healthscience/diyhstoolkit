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
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PositionUtility, events.EventEmitter)

/**
* prepare grid layout for display per module type.
* @method displayPrepareModules
*
*/
PositionUtility.prototype.startPosition = function (nxpID, spaceCoord) {
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
  return coord
}

export default PositionUtility
