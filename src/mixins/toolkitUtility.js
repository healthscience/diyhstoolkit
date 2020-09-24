'use strict'
/**
*  toolkit Utilitiy functions
*
*
* @class ToolkitUtility
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var ToolkitUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ToolkitUtility, events.EventEmitter)

/**
* Prepare table list view of experiments joined
* @method prepareJoinedNXPlist
*
*/
ToolkitUtility.prototype.prepareJoinedNXPlist = function (peerExpModules) {
  let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
  let gridDatapeer = []
  let question2 = {}
  for (let nxp of peerExpModules) {
    // look up question
    // console.log(nxp)
    for (const mod of nxp.modules) {
      if (typeof mod.value.concept === 'object' && Object.keys(mod.value.concept).length > 0) {
        if (mod.value.concept.type === 'question') {
          question2 = mod.value.concept.question
        } else {
          question2 = 'none'
        }
      }
    }
    gridDatapeer.push({ id: nxp.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' })
  }
  let gridPeer = {}
  gridPeer.columns = gridColumns
  gridPeer.data = gridDatapeer
  return gridPeer
}

/**
* Prepare table list view of experiments joined
* @method prepareJoinedNXPlist
*
*/
ToolkitUtility.prototype.prepareAnnonNXPlist = function (peerExpModules) {
  let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
  let gridData = []
  let question = {}
  for (let nxp of peerExpModules) {
    // look up question
    for (const mod of nxp.modules) {
      if (mod.value.concept.moduleinfo.name === 'question') {
        question = mod.value.concept.question
      }
    }
    gridData.push({ id: nxp.exp.key, name: question.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview / Join' })
  }
  let gridAnnon = {}
  gridAnnon.columns = gridColumns
  gridAnnon.data = gridData
  return gridAnnon
}

export default ToolkitUtility
