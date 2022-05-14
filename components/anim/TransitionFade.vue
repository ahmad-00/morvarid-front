<template>
    <transition name="fade">
        <slot></slot>
    </transition>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
