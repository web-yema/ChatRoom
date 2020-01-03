<template>
  <div class="nav-con" :style="styles">
    <div class="left-boxs">
      <span v-if="showlt" class="jian" @click="go">&lt;</span>
      <slot name="left"></slot>
    </div>
    <slot name="center"></slot>
    <div class="right-boxs">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['navs', 'showlt', 'styles', 'tos'],
  methods: {
    go () {
      if (this.tos) {
        this.$router.push(this.tos)
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style  scoped>
.nav-con {
  width: 100%;
  height: 100px;
  padding: 0 20px;
  line-height: 100px;
  font-size: 36px;
  color: #fff;
  background: deepskyblue;
  box-sizing: border-box;
  position: relative;
}
.left-boxs {
  position: absolute;
  top: 0;
  left: 20px;
}
.right-boxs {
  position: absolute;
  top: 0;
  right: 20px;
}
.jian {
  font-size: 40px;
  font-weight: 800;
}
</style>
