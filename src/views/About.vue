<template>
  <div class="about">
    <h1>Bentobox - Decentralised data science toolkit</h1>
    <div id="toolkit-summary">
      <ul>
        <li>
          <article>
            <p>
              <img class="small-bbdds" alt="bentox data science" src=".././assets/bbdds.png">
            </p>
            <p>
              The BB - Decentralised Data Science Toolkit is an open source project providing graphical tools and no coding required to perform data science: whether that is looking at historical data today or looking ahead to tomorrow for our self, family, community or nature.
            </p>
            <p>
              The toolkit connects to the <a href="#" @click="webLink">Health Oracle Protocol</a> and use the <a href="#" @click="webLinkdamahub">DaMaHub Network Library</a>
            </p>
            <p>
            </p>
              The software is still at an experimental stage of development.  Drop by <a href="#" @click="webLinkgithub">github heathscience</a> repository to clone the code.
            <p>
            </p>
          </article>
        </li>
        <li>
          <article>
            <p>INSTRUCTIONS</p>
            <p>
              1. Interacive lifeboard visualisations
            </p>
            <p>
              Interactive charts come with a toolbar to select different time periods, present in time series or overlay mode.  Select what data to present.
            </p>
          </article>
        </li>
        <li>
          <article>
            <p>
              2. Join network experiments
            </p>
            <p>
              a) First connect to the network using the Connect Button top right
            </p>
            <p>
              b) A list of network experiments from the network will be listed or search for key words or click New Network Exeriment button to contribute
            </p>
            <p>
              c) Click Preview / Join Button to learn more about the experiment and select from options to join.  Click on Join the Network Experiment Button
            </p>
            <p>
              d) The Network Experiment will now be listed in Peer list.  Click on View Button to display visualisation and access toolbars
            </p>
          </article>
        </li>
        <li>
          <article>
            <p>
              3. Share knowledge with peers & communities
            </p>
            <p>
              Form Peer to Peer networks by sharing public keys. Click on Edit-Connection Button
            </p>
            <p>
              Click on the Add Peer Button and enter public key and select type of peer to peer connect e.g. connect network libraries or network experiments.
            </p>
            </article>
        </li>
        <li>
          <article>
            <p>
              4. Personal AI - CALE (not active)
            </p>
            <p>
              The first goal of CALE AI is to produce future times series data based on learning from historical data. This uses an evolutionary algorithm to tune variables in an autregressional model.
            </p>
            <p>
              The toolkit is open source to encourage others to add AI and other capabilites to aid none-code tools
            </p>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// const { BrowserWindow } = require('electron')

export default {
  name: 'about',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    webLink () {
      // window.open('https://www.healthscience.network', '_blank')
      // shell.openExternal('https://www.healthscience.network')
      /* const win = new BrowserWindow()
      // Instead bare webContents:
      win.webContents.on('will-navigate', '_blank')
      win.loadURL('https://www.healthscience.network') */
      window.open('https://www.healthscience.network', '_blank')
    },
    webLinkdamahub () {
      window.open('https://www.damahub.org/', '_blank')
    },
    webLinkgithub () {
      window.open('https://www.github.com/healthscience/diyhstoolkit', '_blank')
    }
  }
}
</script>

<style lang="scss">
#about h1 {
  font-size: 1.4em;
}
.small-bbdds {
  width: 400px;
}

#toolkit-summary ul li {
  display: block;
  text-align: center;
  margin: auto;
  width: 80%;
  padding-top: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid grey;
}

.clear {
  clear: both;
}
</style>
