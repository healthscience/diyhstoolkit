'use strict'
/**
*  KBL crypto Utility
*
*
* @class KBLcrytoUtility
* @package    KBL Crypto
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')
const hashObject = require('object-hash')

var KBLcryptoUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(KBLcryptoUtility, events.EventEmitter)

/**
*  make KBID hash this is compute Ref. compute contract hash with results
* @method hashKBID
*
*/
KBLcryptoUtility.prototype.hashKBID = function (newContract, resulthash) {
  // prepare Contract evidence
  let contractEvidence = {}
  // contractEvidence.previous = null
  contractEvidence.contract = newContract
  contractEvidence.results = resulthash
  // let hashKBID = '39493493943949394'
  let hashKBID = this.evidenceProof(contractEvidence)
  return hashKBID
}

/**
*  return true or false
* @method compareHashes
*
*/
KBLcryptoUtility.prototype.compareHashes = function (inA, inB) {
  let hashMatch = false
  if (inA === inB) {
    hashMatch = true
  }
  return hashMatch
}

/**
*  hash of proof of work
* @method evidenceProof
*
*/
KBLcryptoUtility.prototype.evidenceProof = function (dataEvidence) {
  let kbundleHashPart = hashObject(dataEvidence)
  // need some sort of holder back in ECS to build up evidence trail
  return kbundleHashPart
}

export default KBLcryptoUtility
