<template>
  <div>
    <Navs :showlt="true">
      <div slot="center">{{ datas.groupMembers ? "群聊设置" : "聊天设置" }}</div>
      <div slot="right" @click="preservation">{{ datas.groupMembers ? "保存" : "" }}</div>
    </Navs>
    <div v-if="datas.groupMembers">
      <ul class="detail">
        <router-link to="/total" tag="li" class="detailitem">
          <p>群聊成员</p>
          <p>共{{datas.groupMembers.length}}人 &gt;</p>
        </router-link>
        <li class="detailitem">
          <p>群聊名称</p>
          <input type="text"  v-model="datas.autograph" />
        </li>
        <!-- <li class="detailitem">
          <p>我的群昵称</p>
          <input type="text" :placeholder="datas.usernames" v-model="usernames" />
        </li> -->
        <li class="detailitem">删除聊天记录</li>
        <li class="signout">退出该群</li>
      </ul>
    </div>
    <div v-if="!datas.groupMembers">
      <ul class="detail">
        <li class="detailitem">删除聊天记录</li>
        <li class="signout">删除好友</li>
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
      datas: {},
      users: '',
      autograph: ''
    }
  },
  created () {
    this.autograph = this.datas.autograph
    // this.users = this.datas.users
  },
  computed: {
    ...mapState(['user', 'username', 'RoomList', 'portrait', 'infodata'])
  },
  mounted () {
    this.datas = this.infodata.item
  },
  methods: {
    preservation () {
      let obj = {
        user: this.datas.autograph,

        username: this.username
      }
      console.log(this.datas)
      console.log(obj)
    }
  }

}
</script>
<style lang="less" scoped>
.detail{
  height: 92.5vh;
  background-color: #F6F6F6;
  text-align: left;
  font-size: 35px;
}
.detailitem{
  width: 100%;
  height: 120px;
  line-height: 120px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
}
.signout{
  text-align: center;
  width: 100%;
  height: 120px;
  background-color: #fff;
  line-height: 120px;
  color: red;
  margin-top: 20px;
}
</style>
