<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Experiment context
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <div class="network-experiment">
            <slot name="body">
              Question
            </slot>
          </div>
          <div class="network-connect">
            <slot name="connect">
              No suggest mobile applications
            </slot>
          </div>
          <div class="network-packaging">
            <slot name="packaging">
              I'm the default body!
            </slot>
          </div>
          <div class="network-compute">
            <slot name="compute">
              I'm the default body!
            </slot>
          </div>
          <div class="network-dashboard">
            <slot name="dashboard-visualisation">
              No visualisation preview available
            </slot>
          </div>
          <div id="join-submit">
            <slot name="submit-join">
              <!-- default button -->
            </slot>
          </div>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
            >
              Close
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  computed: {
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  z-index: 29;
}

.modal {
  margin-top: 3em;
  height: auto;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 90%;
}

.modal-header,
.modal-footer {
  margin-top: 4em;
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  z-index: 30;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.network-experiment, .network-packaging, .network-compute, .network-dashboard {
  padding:2em;
  margin: 1em;
  border: 1px solid lightgrey;
  background-color: #ffefd5;
}

.network-connect {
  margin: 20px;
  border: 1px solid lightgrey;
}
</style>
