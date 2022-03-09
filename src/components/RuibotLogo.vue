<template>
  <div>
    <transition name="ruibot" mode="out-in">
      <div v-if="state === 'normal'">
        <img :src="normalImg" class="robot-img" />
      </div>
      <div v-else-if="state === 'waiting'">
        <img :src="waitingImg" class="robot-img" />
      </div>
      <div v-else-if="state === 'finished'">
        <img :src="finishedImg" class="robot-img" />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RuibotLogo",
  props: ["state"],
  components: {},
  setup() {
    const normalImg = ref(require("../assets/logo-3d.png"));
    const waitingImg = ref(require("../assets/logo-waiting-3d.png"));
    const finishedImg = ref(require("../assets/logo-finished-3d.png"));
    return {
      normalImg,
      waitingImg,
      finishedImg,
    };
  },
};
</script>

<style>
.robot-img {
  width: 100%;
  height: auto;
  padding: 10px;
}

.ruibot-enter-active,
.ruibot-leave-active {
  transition: opacity 0.3s ease;
}

.ruibot-enter-from,
.ruibot-leave-to {
  opacity: 0;
}
</style>