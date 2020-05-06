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

import SAFEflow from 'node-safeflow'
const util = require('util')
const events = require('events')

var safeFlowAPI = function () {
  events.EventEmitter.call(this)
  this.SAPI = new SAFEflow()
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
  let network = 'cloud'
  let starthsNXP = {}
  // connected annon
  if (network === 'safenetwork') {
    // implement in network release see DIY repo on github.
  } else if (network === 'cloud') {
    let readOnly = { 'publickey': 'e97bd0056edae2a5da49b7868167b6c9d13bc3d5', 'token': 'CVUbN3zCmvubqNpJ3ru6YLtwLRMv6kfa9NmRAzTGSiUQ', 'cnrl': 'cnrl-33221101' }
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
    entityData = await this.SAPI.startPeerFlow(defaultAPI)
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
* @method
*
*/
safeFlowAPI.prototype.ECSinput = async function (cnrl) {
  let entityComplete = await this.SAPI.liveEManager.peerInput(cnrl)
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
safeFlowAPI.prototype.displayFilter = async function (shellID, modBundle) {
  // setup return vis Object
  let entityID = modBundle[shellID].status
  let entityData = await this.SAPI.entityGetter(entityID)
  console.log('dataBACK ECS--up to UI to use')
  console.log(entityData)
  console.log('chart data')
  console.log(entityData.liveVisualC.visualData)
  let TestDataBundle = {}
  for (let mod of modBundle[shellID].modules) {
    console.log(mod)
    // need to match each modules to Component Data
    if (mod.type === 'Question') {
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': mod.grid, 'data': [{ 'form': 'html' }, { 'content': 'Movement Summary' }], 'message': 'compute-complete' }
    } else if (mod.type === 'Device') {
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': mod.grid, 'data': entityData.liveDeviceC.devices, 'message': 'compute-complete' }
    } else if (mod.type === 'Dapp') {
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': mod.grid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.type === 'Compute') {
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-compute', 'text': 'Compute', 'active': true }, 'grid': mod.grid, 'message': 'compute-complete' }
    } else if (mod.type === 'Errors') {
      // [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} }], '1': { 'chartPackage': { 'labels': [2, 4] }, { 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': {} } }, 'message': 'compute-complete'
    } else if (mod.type === 'Visualise') {
      TestDataBundle[mod.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Visualise', 'active': true }, 'grid': mod.grid, 'data': { '0': entityData.liveVisualC.visualData, '1': { 'chartPackage': { 'labels': [2, 4], 'datasets': [{ label: 'Wearable', backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', 'data': [1, 2] }] }, 'chartOptions': { }, 'message': 'compute-complete' } } }
    }
  }
  console.log('mock XLP data bundle')
  console.log(TestDataBundle)
  return TestDataBundle
}

export default safeFlowAPI
