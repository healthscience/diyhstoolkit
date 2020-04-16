<template>
  <div id="live-network-grid">
    <!-- component template -->
    <div id="grid-template">
      <table>
        <thead>
          <tr>
            <th v-for="key in columns" :key="key.id"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredExperiments" :key="entry.id">
            <td v-for="key in columns" :key="key.id">
              <div v-if="key !== 'action'">
              {{entry[key]}}
              </div>
              <div v-else>
                <button type="button" class="btn" @click="actionExperiment(entry.id, entry)">{{ entry[key] }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- loop over the different modules included -->
      <div id="module-list" v-if="NXPstatusData[shellID]" >
        <ul v-for="modI in NXPstatusData[shellID].modules" :key="modI.id">
          <dash-board v-if="isModalDashboardVisible" :shellCNRL="shellID" :moduleCNRL="modI"></dash-board>
        </ul>
      </div>
      <join-experiment v-show="isModalJoinVisible" @close="closeModalJoin">
        <template v-slot:header>
        <!-- The code below goes into the header slot -->
          N=1 Network Experiment {{ actionKBundle.name }} {{ actionKBundle.description }}
        </template>
        <template v-slot:body>
        <!-- The code below goes into the header slot -->
          <header>DOWNLOAD MOBILE APPLICACTION & CONNECT DEVICE</header>
        </template>
        <template v-slot:connect>
          <div>Devices required: {{ actionKBundle.dapps }}  Compatible Devices: {{ actionKBundle.device }}</div>
        </template>
        <template v-slot:dashboard>
          <div>
            DASHBOARD preview - other templates
            <button type="button" class="btn" @click="viewDashboard">
              View
            </button>
            <img id="preview-width" v-if="previewSeen" alt="dashboard-example" src="../../assets/preview-dashboard.png">
          </div>
        </template>
        <template v-slot:submit-join>
          <button>Yes, join this netwokr experiment</button>
        </template>
      </join-experiment>
    </div>
  </div>
</template>

<script>
import DashBoard from '@/components/experiments/edashBoard.vue'
import JoinExperiment from '@/components/experiments/JoinExperiment.vue'

export default {
  name: 'ExperimentNetwork',
  components: {
    DashBoard,
    JoinExperiment
  },
  props: {
    experiments: Array,
    columns: Array,
    filterKey: String
  },
  computed: {
    NXPstatusData: function () {
      console.log('state.experimentStatus')
      console.log(this.$store.state.experimentStatus)
      return this.$store.state.experimentStatus
    },
    filteredExperiments: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var experiments = this.experiments
      if (filterKey) {
        experiments = experiments.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        experiments = experiments.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return experiments
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      shellID: '',
      sortKey: '',
      sortOrders: sortOrders,
      isModalDashboardVisible: false,
      isModalJoinVisible: false,
      actionKBundle: {},
      previewSeen: false
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    actionExperiment (shellCNRL, NXPcontract) {
      // view or joing a NXP?
      console.log('action for experiment???')
      console.log(shellCNRL)
      console.log(NXPcontract)
      this.shellID = shellCNRL
      this.actionKBundle = NXPcontract
      if (NXPcontract.action === 'View') {
        this.$store.dispatch('actionDashboardState', shellCNRL)
        this.isModalDashboardVisible = true
      } else {
        this.isModalJoinVisible = true
      }
    },
    closeModalJoin () {
      this.isModalJoinVisible = false
    },
    viewDashboard () {
      this.previewSeen = true
    }
  }
}
</script>

<style>

#live-network-grid {
  border: 0px solid blue;
  margin: auto;
  text-align: center;
}

body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b4b9;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b4b9;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

#preview-width {
  width: 200px;
}
</style>
