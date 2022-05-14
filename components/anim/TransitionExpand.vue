<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot> </slot>
  </transition>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  components: { },
  props: {
    from: String,
    to: String,
  },
  methods: {
    enter(element) {
      const width = getComputedStyle(element).width;
      element.style.width = width;
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.height = this.to;
      const height = getComputedStyle(element).height;
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = this.from;
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = this.to;
    },
    leave(element) {
      const height = getComputedStyle(element).height;
      element.style.height = height;
      getComputedStyle(element).height;
      requestAnimationFrame(() => {
        element.style.height = this.from;
      });
    },
  },
});
</script>

<style scoped>
* {
  will-change: height;
  /* transform: translateZ(0); */
  backface-visibility: hidden;
  /* perspective: 1000px; */
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out, opacity 0.3s;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style>
