'use strict'
/**
*  SAFEflow API vue connector to safeFLOW
*
*
* @class safeFLOWAPI
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var safeFlowAPI = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(safeFlowAPI, events.EventEmitter)

/**
* Network Authorisation & CONNECT
* @method connectPeerNSnetwork
*
*/
safeFlowAPI.prototype.connectPeerNSnetwork = async function (authNetwork, authBundle) {
  console.log('ask connect to HS NETWORK')
  let startNXP = {}
  // connect self verified
  if (authNetwork === 'safenetwork') {
    // implement in network release see DIY repo on github.
  } else if (authNetwork === 'cloud') {
    startNXP = await this.startPeerCycle(authBundle)
  }
  return startNXP
}

/**
* Network Authorisation & CONNECT
* @method connectNSnetwork
*
*/
safeFlowAPI.prototype.connectNSnetwork = async function () {
  console.log('ask connect to HS NETWORK')
  let network = 'peerlink'
  let starthsNXP = {}
  // connected annon
  if (network === 'safenetwork') {
    // safe Test network coming soon
  } else if (network === 'cloud') {
    let readOnly = { 'publickey': 'e97bd0056edae2a5da49b7868167b6c9d13bc3d5', 'token': 'CVUbN3zCmvubqNpJ3ru6YLtwLRMv6kfa9NmRAzTGSiUQA', 'cnrl': 'cnrl-33221101' }
    starthsNXP = await this.startannonCycle(readOnly)
  }
  return starthsNXP
}

/**
*
* @method deviceGetter
*
*/
safeFlowAPI.prototype.deviceGetter = async function (NXPlist) {
  console.log('lookup devices per nxpContract')
  let devicesNXP = await this.SAPI.liveEManager.deviceFlow(NXPlist)
  return devicesNXP
}

/**
*
* @method
*
*/
safeFlowAPI.prototype.startannonCycle = async function (authIN) {
  let entityData = {}
  // AUTHORISATION KLB entry or non for network KBLedger
  let defaultAPI = '33221100'
  let authStatus = this.checkAuthorisation(defaultAPI, authIN)
  if (authStatus === true) {
    // What network experiments entries are indexed in KBLedger?
    entityData = await this.SAPI.startFlow(defaultAPI)
  }
  return entityData
}

/**
*
* @method startCycle
*
*/
safeFlowAPI.prototype.startCycle = async function (authIN) {
  let entityData = {}
  // AUTHORISATION KLB entry or non for network KBLedger
  let defaultAPI = '33221100'
  let authStatus = this.checkAuthorisation(defaultAPI, authIN)
  if (authStatus === true) {
    // What network experiments entries are indexed in KBLedger?
    entityData = await this.SAPI.startFlow(defaultAPI)
  }
  return entityData
}

/**
*
* @method startPeerCycle
*
*/
safeFlowAPI.prototype.startPeerCycle = async function (authIN) {
  let entityData = {}
  // AUTHORISATION KLB entry or non for network KBLedger
  let defaultAPI = '33221100'
  let authStatus = this.checkAuthorisation(defaultAPI, authIN)
  if (authStatus === true) {
    // What network experiments entries are indexed in KBLedger?
    // entityData = await this.SAPI.startPeerFlow(defaultAPI)
    entityData = true
  }
  return entityData
}

/**
* OK to sign in to this peers account?
* @method checkAuthorisation
*
*/
safeFlowAPI.prototype.checkAuthorisation = function (defaultAPI, authBundle) {
  let auth = false
  auth = this.SAPI.networkAuthorisation(defaultAPI, authBundle)
  return auth
}

/**
*
* @method ECSinput
*
*/
safeFlowAPI.prototype.ECSinput = async function (InputBundle) {
  let entityComplete = await this.SAPI.liveEManager.peerInput(InputBundle)
  return entityComplete
}

/**
*
* @method
*
*/
safeFlowAPI.prototype.moduleKBID = async function (cnrl) {
  let kbidData = this.SAPI.CNRLmodKBID(cnrl)
  return kbidData
}

/**
*
* @method diplayFilter
*
*/
safeFlowAPI.prototype.displayFilter = function (shellID, modules, time, entityData) {
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

export default safeFlowAPI
