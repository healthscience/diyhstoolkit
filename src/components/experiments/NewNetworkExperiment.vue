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
            This is the default tile!
          </slot>

        <button
          type="button"
          class="btn-close"
          @click="closeNnxp"
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
              N=1 network experiment summary
            </slot>
          </div>
          <div class="network-dashboard">
            <slot name="dashboard">
              I'm the default body!
            </slot>
          </div>
          <div id="join-submit">
            <slot name="submit-join">
              <!-- no default button -->
            </slot>
          </div>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="closeNnxp"
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
    closeNnxp () {
      this.$emit('closeNnxp')
    },
    routerStatus () {
      // console.log(this.$router.currentRoute)
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
    height: auto;
    z-index: 32;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    width: 92%;
    height: auto;
  }

  .modal-header,
  .modal-footer {
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

.network-experiment {
  margin: 20px;
  border: 0px solid blue;
}

.network-connect {
  margin: 20px;
  border: 0px solid blue;
}

.network-dashboard {
  margin: 20px;
  border: 1px solid lightgrey;
}

#setup-flow {
  width: 600px;
}

</style>
