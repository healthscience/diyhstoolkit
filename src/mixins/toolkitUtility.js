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
  let gridDatapeer = this.prepareExperimentSummary(peerExpModules)
  let gridPeer = {}
  gridPeer.columns = gridColumns
  gridPeer.data = gridDatapeer
  return gridPeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummary
*
*/
ToolkitUtility.prototype.prepareExperimentSummary = function (peerExpModules) {
  let gridDatapeer = []
  let question2 = {}
  for (let nxp of peerExpModules) {
    // look up question
    for (const mod of nxp.modules) {
      if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
        if (mod.value.info.type === 'question') {
          question2 = mod.value.info.question
        } else {
          question2 = 'none'
        }
      }
    }
    gridDatapeer.push({ id: nxp.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' })
  }
  return gridDatapeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummarySingle
*
*/
ToolkitUtility.prototype.prepareExperimentSummarySingle = function (peerExpModules) {
  console.log(peerExpModules)
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
    console.log(mod)
    if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
      if (mod.info.type === 'question') {
        question2 = mod.value.info.question
      } else {
        question2 = 'none'
      }
    }
  }
  gridDatapeer = { id: peerExpModules.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'View' }
  return gridDatapeer
}

/**
* Prepare experiment data list
* @method prepareExperimentSummarySingleGenesis
*
*/
ToolkitUtility.prototype.prepareExperimentSummarySingleGenesis = function (peerExpModules) {
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
    if (typeof mod.value.info === 'object' && Object.keys(mod.value.info).length > 0) {
      if (mod.value.info.moduleinfo.name === 'question') {
        question2 = mod.value.info.question
      } else {
        question2 = 'none'
      }
    }
  }
  gridDatapeer = { id: peerExpModules.exp.key, name: question2.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview/ Join' }
  return gridDatapeer
}

/**
* Prepare table list view of experiments
* @method prepareAnnonNXPlist
*
*/
ToolkitUtility.prototype.prepareAnnonNXPlist = function (peerExpModules) {
  let gridColumns = ['id', 'name', 'description', 'time', 'dapps', 'device', 'action']
  let gridData = []
  let question = {}
  for (let nxp of peerExpModules) {
    // look up question
    for (const mod of nxp.modules) {
      if (mod.value.info.moduleinfo.name === 'question') {
        question = mod.value.info.question
      }
    }
    gridData.push({ id: nxp.exp.key, name: question.text, description: '--', time: Infinity, dapps: 'Yes', device: 'Yes', action: 'Preview / Join' })
  }
  let gridAnnon = {}
  gridAnnon.columns = gridColumns
  gridAnnon.data = gridData
  return gridAnnon
}

/**
* Check if ref contract is in toolkit if not ask network library via peerlink
* @method refcontractLookup
*
*/
ToolkitUtility.prototype.refcontractLookup = function (refCont, allContracts) {
  let matchKey = {}
  for (const rc of allContracts) {
    if (refCont.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
}

/**
*
* @method diplayFilter
*
*/
ToolkitUtility.prototype.displayFilter = function (shellID, modules, time, entityData) {
  // setup return vis Object
  console.log('DISPLAYflitttter')
  console.log(shellID)
  console.log(modules)
  console.log(time)
  console.log(entityData)
  let testDataBundle = {}
  let gridPerModule = {}
  for (let mod of modules) {
    console.log('prepare display modules')
    console.log(mod.type)
    // need to match each modules to Component Data
    if (mod.value.type === 'question') {
      let qgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: true }]
      gridPerModule[mod.key] = qgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': qgrid, 'data': [{ 'form': 'html' }, { 'content': 'Movement Summary' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'device') {
      let dgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
      gridPerModule[mod.key] = dgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': dgrid, 'data': entityData.liveDeviceC.devices, 'message': 'compute-complete' }
    } else if (mod.value.type === 'dapp') {
      let ddgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }]
      gridPerModule[mod.key] = ddgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': ddgrid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.value.type === 'compute') {
      let cgrid = [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }]
      gridPerModule[mod.key] = cgrid // mod.grid
      testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': cgrid, 'message': 'compute-complete' }
    } else if (mod.value.type === 'Errors') {
      // gridPerModule[mod.cnrl] = mod.grid
      // [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} }], '1': { 'chartPackage': { 'labels': [2, 4] }, { 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} } }, 'message': 'compute-complete'
    } else if (mod.value.type === 'visualise') {
      // loop over data vis read
      mod.grid = []
      let makeGrid = []
      // let dataIndex = Object.keys(entityData.liveVisualC.visualData)
      if (entityData.liveVisualC.singlemulti.chartPackage) {
        // single chart multi datasets
        let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'singlemulti', static: false }
        makeGrid.push(newGriditem)
        // gridPerModule = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': { 'singlemulti': entityData.liveVisualC.singlemulti } }
      } else {
        // normal display indivduals charts
        for (let dr of entityData.liveVisualC.liveVislist) {
          // need to add to grid for multi charts asked for
          // structre for new grid item  { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'cnrl-8856388711', static: false }
          let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
          makeGrid.push(newGriditem)
        }
        // gridPerModule = {}
        gridPerModule[mod.key] = makeGrid
        testDataBundle[mod.key] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': entityData.liveVisualC.visualData }
      }
    }
  }
  console.log('TIMEPLATE DATA XLP')
  console.log(testDataBundle)
  let displayData = {}
  displayData.data = testDataBundle
  displayData.grid = gridPerModule
  return displayData
}

/**
* givin input time and context work work current time data request
* @method prepareTime
*
*/
ToolkitUtility.prototype.prepareTime = function (timeIN, update) {
  console.log('PREPARE timmmmee')
  console.log(timeIN)
  console.log(update)
  let newStartTime = []
  if (timeIN === 0) {
    let freshStart = Date.now() + update.startperiodchange
    newStartTime.push(freshStart)
  } else {
    // time state available
    if (update.startperiod !== 0 && update.rangechange.length === 0) {
      console.log('update starp0 but range above 1')
      newStartTime.push(update.startperiod)
    } else if (update.rangechange.length > 0) {
      console.log('chage range above zero')
      newStartTime = update.rangechange
      // mmod.value.info.settings.timeseg = update.startperiodchange
    } else if (update.startperiod === 0 && update.startperiodchange) {
      console.log('update starp0 but range above 1')
      console.log(timeIN)
      let timeCon = new Date(timeIN)
      console.log(timeCon)
      console.log(timeCon.getTime())
      let convertTime = timeCon.getTime()
      let updateT = parseInt(convertTime) + update.startperiodchange
      newStartTime.push(updateT)
      // mmod.value.info.settings.timeseg = update.startperiodchange
    } else {
      console.log('elas all otehr opieons')
      let updateSum = parseInt(timeIN) + update.startperiodchange
      newStartTime.push(updateSum)
      // mmod.value.info.settings.timeseg = update.startperiodchange
    }
  }
  return newStartTime
}

export default ToolkitUtility
