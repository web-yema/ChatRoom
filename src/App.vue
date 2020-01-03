<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  // computed: {
  //   ...mapState(['user', 'username'])
  // },
  // mounted () {
  //   console.log(this.username)
  //   // this.$socket.id = this.username
  // }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
}
input,
button {
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
.content {
  height: calc(100vh - 100px);
  background: rgba(245, 245, 245, 0.89);
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
}
.content-box {
  height: calc(100% - 120px);
  overflow: hidden;
  overflow-y: scroll;
}
.nar-bar-content {
  height: calc(100% - 100px);
  overflow: hidden;
  overflow-y: scroll;
  // background: pink;
}
</style>
