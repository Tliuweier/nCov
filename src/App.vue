<template>
  <div id="app">
    <div  class="wrap">

       <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

<style lang='stylus'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  // max-width: 500px;
  // max-width 500px;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  .wrap {
    width:100%;
    overflow:hidden;

  }
}
</style>
