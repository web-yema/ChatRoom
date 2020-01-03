<template>
  <div>
    <div class="tips" v-if="show">{{msg.title}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      msg: {}
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = false
    }, 1000)
  }
}
</script>

<style>
.tips {
  position: fixed;
  width: 94%;
  line-height: 90px;
  height: 90px;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid whitesmoke;
  border-radius: 15px;
  background: #fff;
  font-size: 30px;
  text-align: center;
  color: red;
}
</style>
