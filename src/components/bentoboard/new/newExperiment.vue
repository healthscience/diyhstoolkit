<template>
  <div id="new-experimentmenu">
    <button type="button" class="btn-newnxp" @click="newType()">Data</button>
    <div id="new-type" v-if="newtypeShow === true">
      <!-- <button type="button" class="btn-new" @click="newExperiment('lifeboard')">lifeboard</button> -->
      <button type="button" class="btn-new" @click="newExperiment('join')">Join</button>
      <button type="button" class="btn-new" @click="newExperiment('experiment')">Board</button>
      <button type="button" class="btn-new" @click="newLibrary('library')">Library</button>
    </div>
    <new-lifeboard v-show="isModalNewLifeboard" @close="closeModalNewLB">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        NEW LIFEBOARD
      </template>
      <template v-slot:body>
        <div class="scale-item">
          New <input name="query" v-model="lifeboardName">
          <button class="new-lifeboard" @click.prevent="saveLifeboard()">save</button>
        </div>
      </template>
    </new-lifeboard>
    <new-networkexperiment v-show="isModalNewNetworkExperiment" @closeNnxp="closeModalNewN1">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        NEW N=1 Network Experiment
      </template>
      <template v-slot:body>
      <!-- The code below goes into the header slot -->
        <header>Board Builder</header>
      </template>
      <template v-slot:dashboard>
        <module-builder></module-builder>
      </template>
      <template v-slot:submit-join>
        <div id="nxp-feedback" v-if="newNXPfeedbackActive === true">
          {{ newxnpFeedback }}
        </div>
        <button class="contribute-nxp-button" @click="contributeNXP" >Contribute experiment to network</button>
      </template>
    </new-networkexperiment>
    <networklibrary-modal v-show="isModalNLib" @closenl="closeModalNLib">
      <template v-slot:header>
      <!-- The code below goes into the header slot -->
        Network Library
      </template>
      <template v-slot:body>
      </template>
    </networklibrary-modal>
  </div>
</template>

<script>
import NewLifeboard from '@/components/lifeboard/NewLifeboard.vue'
import NewNetworkexperiment from '@/components/bentoboard/NewNetworkExperiment.vue'
import ModuleBuilder from '@/components/bentoboard/new/moduleBuilder.vue'
import NetworklibraryModal from '@/components/bentoboard/networklibrary/networklibraryModal.vue'

export default {
  name: 'new-experiment',
  components: {
    NewLifeboard,
    NewNetworkexperiment,
    ModuleBuilder,
    NetworklibraryModal
  },
  computed: {
    newxnpFeedback: function () {
      return this.$store.state.newNXPfeedback
    },
    newNXPfeedbackActive: function () {
      return this.$store.state.newNXPfeedbackActive
    },
    isModalNewNetworkExperiment: function () {
      return this.$store.state.isModalNewNetworkExperiment
    }
  },
  data () {
    return {
      viewFlowtype: 'Experiment', // 'lifestyleflow',
      isModalNewLifeboard: false,
      searchText: '',
      newtypeShow: false,
      lifeboardName: '',
      flowMenu: false,
      lifeboardState: 'private',
      isModalNLib: false
    }
  },
  methods: {
    newType () {
      this.newtypeShow = !this.newtypeShow
    },
    newExperiment (type) {
      if (type === 'experiment') {
        // create a set of modules and save if contributed
        this.$store.dispatch('actionMakeModuleRefContract')
      } else if (type === 'lifeboard') {
        this.isModalNewLifeboard = true
      } else if (type === 'join') {
        this.$store.dispatch('actionLifeview', 'publicexperiments')
        this.$store.dispatch('actionSpaceList', 'public')
        this.$store.dispatch('actionSpaceJoinListShow', false)
      }
      this.newtypeShow = !this.newtypeShow
    },
    newLibrary () {
      console.log('open DaMaHub Library')
      this.$store.dispatch('actionLibraryStart', true)
      this.isModalNLib = true
    },
    closeModalNLib () {
      this.isModalNLib = false
      // refresh the networklibrary contract to access new contracts
      // this.$store.dispatch('actionRrefreshRefContracts')
    },
    saveLifeboard () {
      this.$store.dispatch('actionSaveLifeboard', this.lifeboardName)
    },
    closeModalNewLB () {
      // this.$store.dispatch('actionClear')
      this.isModalNewLifeboard = false
    },
    closeModalNewN1 () {
      this.$store.dispatch('actionClearContributeNXP')
    },
    contributeNXP () {
      this.nxpState = 'public'
      // start building NXP refcontract
      this.$store.dispatch('actionNewNXPrefcontract')
    }
  }
}
</script>

<style scoped>
#new-experimentmenu {
  z-index: 31;
}

#new-type {

}

.contribute-nxp-button {
  font-size: 1.4em;
}

#nxp-feedback {
  font-size: 2em;
  background-color: #ffcccb;
}

.btn-newnxp, .btn-new {
  font-size: 1.4em;
}

.btn-newnxp:hover, .btn-new:hover {
  font-size: 1.4em;
  background-color: #4CAF50;
}
</style>
