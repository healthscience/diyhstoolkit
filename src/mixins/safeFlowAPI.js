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
  // let entityID = modBundle[shellID].status
  let TestDataBundle = {}
  for (let mod of modBundle[shellID].modules) {
    // need to match each modules to Component Data
    if (mod.prime.text === 'Question') {
      TestDataBundle[mod.prime.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true }, 'grid': mod.grid, 'data': [{ 'form': 'html' }, { 'content': 'Movement Summary' }], 'message': 'compute-complete' }
    } else if (mod.prime.text === 'Device') {
      TestDataBundle[mod.prime.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true }, 'grid': mod.grid, 'data': entityData.liveDeviceC.devices, 'message': 'compute-complete' }
    } else if (mod.prime.text === 'Dapp') {
      TestDataBundle[mod.prime.cnrl] = { 'prime': { 'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true }, 'grid': mod.grid, 'data': [{ 'content': 'Gadgetbridge android' }, { 'content2': 'Xdrip android' }], 'message': 'compute-complete' }
    } else if (mod.prime.text === 'Compute') {
      TestDataBundle[mod.prime.cnrl] = { 'prime': { 'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Results', 'active': true }, 'grid': mod.grid, 'data': [{ 'chartPackage': [{ '1': '2' }, { '2': '4' }, { '3': '6' }], 'chartOptions': {} }, { 'chartPackage': [{ '1': '2' }, { '2': '4' }, { '3': '6' }], 'chartOptions': { } }], 'message': 'compute-complete' }
    } else if (mod.prime.text === 'Errors') {
    }
  }
  return TestDataBundle
// TestDataBundle['cnrl-001234543212'] = {'prime': {'cnrl': 'cnrl-112', 'vistype': 'nxp-plain', 'text': 'Question', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543303'] = {'prime': {'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': [{'form': 'miBand3', 'content': [1, 2, 3]}, {'form': 'amazfit', 'content': [1, 2, 3]}], 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543303'] = {'prime': {'cnrl': 'cnrl-112', 'vistype': 'nxp-device', 'text': 'Device', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': this.liveSEntities[entityID].liveDeviceC.devices, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543304'] = {'prime': {'cnrl': 'cnrl-112', 'vistype': 'nxp-dapp', 'text': 'Dapp', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': [{'form': 'gadgetbridge', 'content': [1, 2, 3]}, {'form': 'Xdrip', 'content': [1, 2, 3]}], 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543214'] = {'prime': {'cnrl': 'cnrl-114', 'vistype': 'nxp-visualise', 'text': 'Results', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': '0', static: false }, { 'x': 0, 'y': 0, 'w': 8, 'h': 20, 'i': '1', static: false }], 'data': [{'chartPackage': [{'1': '2'}, {'2': '4'}, {'3': '6'}], 'chartOptions': {}}, {'chartPackage': [{'1': '2'}, {'2': '4'}, {'3': '6'}], 'chartOptions': {}}], 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543213'] = {'prime': {'cnrl': 'cnrl-113', 'vistype': 'nxp-plain', 'text': 'Controls', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543215'] = {'prime': {'cnrl': 'cnrl-115', 'vistype': 'nxp-plain', 'text': 'Errors', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543216'] = {'prime': {'cnrl': 'cnrl-116', 'vistype': 'nxp-plain', 'text': 'Lifestyle Medicine', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543217'] = {'prime': {'cnrl': 'cnrl-117', 'vistype': 'nxp-plain', 'text': 'Educate', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543218'] = {'prime': {'cnrl': 'cnrl-1118', 'vistype': 'nxp-plain', 'text': 'Evovle', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
// TestDataBundle['cnrl-001234543219'] = {'prime': {'cnrl': 'cnrl-119', 'vistype': 'nxp-plain', 'text': 'Communicate', 'active': true}, 'grid': [{ 'x': 0, 'y': 0, 'w': 8, 'h': 2, 'i': '1', static: false }], 'data': {'form': ['a', 'b', 'c'], 'content': [1, 2, 3]}, 'message': 'compute-complete'}
}

export default safeFlowAPI
