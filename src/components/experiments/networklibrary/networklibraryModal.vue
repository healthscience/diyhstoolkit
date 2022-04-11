gi<template>
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
          @click="closeNL"
          aria-label="Close modal"
        >
          x
        </button>
        </header>
        <section class="modal-body">
          <slot name="body">
            Network Library - DaMaHub Project - <img  alt="DaMaHub Network Library" src="../../.././assets/logo-damahub.png">
            <iframe
              :src="`./xlibrary-test.html?` + jwttoken"
              width="90%"
              height="1200px"
              name="networklibrarylive"
              frameborder="0" >
            </iframe>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="closeNL"
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
function findIframeByName (name) {
  return find(window.frames, frame => frame.name === name)
}

export default {
  name: 'modal-nl',
  computed: {
    jwttoken: function () {
      return this.$store.state.jwttoken
    }
  },
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    onLoadIframe (event) {
      const iframe = findIframeByName(event.currentTarget.name)
      iframe.doSomething({
        appID: '123',
        apiKey: '123'
      })
    },
    closeNL () {
      this.$emit('closenl')
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
    z-index: 45;
    overflow: auto;
    resize: both;
  }

  ::-webkit-resizer {
    border: 2px solid black;
    background: grey;
    box-shadow: 0 0 8px 8px lightgrey;
    outline: 8px solid white;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow: auto;
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
    min-height: 1000px;
    border: 1px solid lightgrey;
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
</style>
