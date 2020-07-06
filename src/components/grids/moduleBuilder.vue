<template>
  <div id="module-builder">
    <div class="row">
      <div class="col-3">
        <h3>Modules available</h3>
        <draggable class="list-group" :list="list1" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in list1"
            :key="element.name"
          >
          {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="col-4">
        <h3>Experiment</h3>
        <draggable class="list-group" :list="list2" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="(element) in list2"
            :key="element.name"
          >
          <!-- {{ element.name }} {{ index }} -->
            <component v-bind:is="moduleNXP[element.id].prime.type" ></component>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NxpQuestion from '@/components/experiments/nxpQuestion.vue'
import NxpDevice from '@/components/experiments/nxpDevice.vue'
import NxpDapp from '@/components/experiments/nxpDapp.vue'
import NxpCompute from '@/components/experiments/nxpCompute.vue'
import NxpControl from '@/components/experiments/nxpControl.vue'
import NxpVisualise from '@/components/experiments/nxpVisualise.vue'
import NxpSciencereview from '@/components/experiments/nxpSciencereview.vue'
import nxpLifestylemedicine from '@/components/experiments/nxpLifestylemedicine.vue'
import NxpPrescription from '@/components/experiments/nxpPrescription.vue'
import NxpCommunicate from '@/components/experiments/nxpCommunicate.vue'
import NxpEvolve from '@/components/experiments/nxpEvolve.vue'

export default {
  name: 'ModuleBuilder',
  components: {
    draggable,
    NxpQuestion,
    NxpDevice,
    NxpDapp,
    NxpCompute,
    NxpVisualise,
    NxpControl,
    NxpSciencereview,
    nxpLifestylemedicine,
    NxpPrescription,
    NxpCommunicate,
    NxpEvolve
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      moduleNXP:
      {
        0: { 'prime': { 'type': 'nxp-question' } },
        1: { 'prime': { 'type': 'nxp-device' } },
        2: { 'prime': { 'type': 'nxp-dapp' } },
        3: { 'prime': { 'type': 'nxp-compute' } },
        4: { 'prime': { 'type': 'nxp-visualise' } },
        5: { 'prime': { 'type': 'nxp-education' } },
        6: { 'prime': { 'type': 'nxp-errormgt' } },
        7: { 'prime': { 'type': 'nxp-control' } },
        8: { 'prime': { 'type': 'nxp-lifestylemedicine' } },
        9: { 'prime': { 'type': 'nxp-prescription' } },
        10: { 'prime': { 'type': 'nxp-communication' } },
        11: { 'prime': { 'type': 'nxp-clone' } }
      },
      moduleList: ['Question', 'Device/source', 'Dapps', 'Compute', 'Visulisation'],
      list1: [
        { name: 'Device/source', id: 1 },
        { name: 'Mobile/Dapps', id: 2 },
        { name: 'Compute', id: 3 },
        { name: 'Visulisation', id: 4 },
        { name: 'Education', id: 5 },
        { name: 'Error Mgt', id: 6 },
        { name: 'Control', id: 7 },
        { name: 'Lifestyle medicine', id: 8 },
        { name: 'Prescription', id: 9 },
        { name: 'Communication', id: 10 }
      ],
      list2: [
        { name: 'Question', id: 0 }
      ]
    }
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan' })
    },
    replace: function () {
      this.list = [{ name: 'Edgard' }]
    },
    clone: function (el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>

<style>
#module-builder {
}

.row {
  border: 3px solid green;
  min-height: 2em;
}

.col-3 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 15%;
  border: 2px solid grey;
  margin-right: 4em;
}

.col-4 {
  display: inline-block;
  vertical-align: text-top;
  min-height: inherit;
  width: 80%;
  border: 2px solid grey;
}

.list-group {
  border: 1px solid red;
  min-height: inherit;
}

.list-group-item {
  display: block;
  width: 80%;
  padding: .5em;
  margin: 1em;
  border: 1px solid lightgrey;
  background-color: #E6ECEC;
}
</style>
