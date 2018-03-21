<template>
  <div id="home">
    <router-view/>
  </div>
</template>

<script>
    import router from './router'
    export default {
        name: 'Home',
        mounted() {
            this.$store.dispatch('authenticate')
        }
    }
</script>

<style>

</style>