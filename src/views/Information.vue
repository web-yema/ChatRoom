<template>
<div>
   <Navs :showlt="true" >
     <div slot="center">设置</div>
   </Navs>

  <div class="new-content-box content">

    <div class="new-content-list">
      <div>
        <slot name="lsit-left"></slot>
      </div>
      <img
        class="imgbox"
        :src='portrait'
        alt
      />
      <ul class="list-item">
        <li class="title">{{user}}</li>
        <li class="text-item">{{autograph}}</li>
      </ul>
    </div>
    <ul class="edit">
        <router-link to="/editinfo" tag="li" class="editdata">编辑资料</router-link>
        <router-link to="/modifypwd" tag="li" class="editdata">修改密码</router-link>
    </ul>
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Navs from '@/components/Nav'

export default {
  components: { Navs },

  data () {
    return {
      arra: true
    }
  },
  computed: {
    ...mapState(['user', 'username', 'portrait', 'autograph'])
  }
}
</script>
<style lang="less" scoped>
.new-content-box {
  padding: 0 20px 20px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  text-align: left;
  background-color: #F6F6F6;
}
.new-content-list {
  display: flex;
  justify-content: space-between;
  text-align: left;
  color: #aaa;
  height: 200px;
  margin-top: 20px;
  overflow: hidden;
  .imgbox {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: block;
  }
  .list-item {
    flex: 1;
    font-size: 30px;
    padding: 0 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70vw;
    li {
      margin-bottom: 5px;
    }
    .title {
      color: #000;
      font-size: 50px;
      height: 56px;
      line-height: 56px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .text-item {
      font-size: 32px;
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
.edit{
    height: 200px;
    margin: 20px 0;
    .editdata{
        height: 100px;
        line-height: 100px;
        font-size: 40px;
        border-bottom: 1px solid #394A5B;
        background-color: #F6F6F6;
    }
}
</style>
