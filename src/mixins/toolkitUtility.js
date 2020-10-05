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
* @method prepareExperimentSummarySingle
*
*/
ToolkitUtility.prototype.prepareExperimentSummarySingle = function (peerExpModules) {
  let gridDatapeer = {}
  let question2 = {}
  for (const mod of peerExpModules.modules) {
    if (typeof mod.info === 'object' && Object.keys(mod.info).length > 0) {
      if (mod.info.type === 'question') {
        question2 = mod.info.question
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
* Prepare table list view of experiments joined
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
  console.log(refCont)
  console.log(allContracts)
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
  // console.log('DISPLAYflitttter')
  // console.log(entityData)
  // console.log(modules)
  let TestDataBundle = {}
  let gridPerModule = {}
  for (let mod of modules) {
    // need to match each modules to Component Data
    if (mod.type === 'Question') {
      gridPerModule[mod.cnrl] = mod.grid
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': mod.grid, 'data': [{ 'form': 'html' }, { 'content': 'Movement Summary' }], 'message': 'compute-complete' }
    } else if (mod.type === 'Device') {
      gridPerModule[mod.cnrl] = mod.grid
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': mod.grid, 'data': entityData.liveDeviceC.devices, 'message': 'compute-complete' }
    } else if (mod.type === 'Dapp') {
      gridPerModule[mod.cnrl] = mod.grid
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': mod.grid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.type === 'compute') {
      gridPerModule[mod.cnrl] = mod.grid
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': mod.grid, 'message': 'compute-complete' }
    } else if (mod.type === 'Errors') {
      // gridPerModule[mod.cnrl] = mod.grid
      // [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} }], '1': { 'chartPackage': { 'labels': [2, 4] }, { 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} } }, 'message': 'compute-complete'
    } else if (mod.type === 'Visualise') {
      // loop over data vis read
      mod.grid = []
      let makeGrid = []
      // let dataIndex = Object.keys(entityData.liveVisualC.visualData)
      if (entityData.liveVisualC.singlemulti.chartPackage) {
        // single chart multi datasets
        let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'singlemulti', static: false }
        makeGrid.push(newGriditem)
        // gridPerModule = {}
        gridPerModule[mod.cnrl] = makeGrid
        TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': { 'singlemulti': entityData.liveVisualC.singlemulti } }
      } else {
        // normal display indivduals charts
        for (let dr of entityData.liveVisualC.liveVislist) {
          // need to add to grid for multi charts asked for
          // structre for new grid item  { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': 'cnrl-8856388711', static: false }
          let newGriditem = { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': dr, static: false }
          makeGrid.push(newGriditem)
        }
        // gridPerModule = {}
        gridPerModule[mod.cnrl] = makeGrid
        TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': makeGrid, 'data': entityData.liveVisualC.visualData }
      }
    }
  }
  console.log('TIMEPLATE DATA XLP')
  console.log(TestDataBundle)
  let displayData = {}
  displayData.data = TestDataBundle
  displayData.grid = gridPerModule
  return displayData
}

export default ToolkitUtility
