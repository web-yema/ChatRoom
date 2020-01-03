<template>
  <div class="new-content-box">
    <div class="new-content-list" v-if="itemarr">
      <div>
        <slot name="lsit-left"></slot>
      </div>
      <img class="imgbox" :src="itemarr.portrait" alt />
      <ul class="list-item">
        <li class="title">{{itemarr.user}}</li>
        <li class="text-item">{{itemarr.content?itemarr.content:'sdsdsd'}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['itemarr'],
  data () {
    return {
      arra: true
    }
  }
  // mounted() {
  //   console.log(this.itemarr)
  // }
}
</script>
<style lang="less" scoped>
.new-content-box {
  width: 100%;
  padding: 0 20px 20px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
}
.new-content-list {
  display: flex;
  justify-content: space-between;
  text-align: left;
  color: #aaa;
  height: 100px;
  margin-top: 20px;
  overflow: hidden;
  .imgbox {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
  }
  .list-item {
    flex: 1;
    font-size: 30px;
    padding: 0 20px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background: red;
    width: 70vw;
    li {
      margin: 8px;
    }
    .title {
      color: #000;
      font-size: 40px;
      height: 42px;
      line-height: 42px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .text-item {
      font-size: 28px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .list-state {
    font-size: 33px;
    line-height: 100px;
    text-align: right;
    .tian {
      padding: 15px 30px;

      background: rgba(245, 245, 245, 0.89);
      border-radius: 50px;
      border: none;
    }
  }
}
</style>
