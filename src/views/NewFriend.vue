<template>
  <div>
    <Navs :showlt="true">
      <div slot="center">新朋友</div>
      <!-- <div slot="right"></div> -->
      <router-link tag="div" slot="right" class="as" to="/addfriends">添加</router-link>
    </Navs>
    <div class="content">
      <div class="new-content-box" v-if="friendLsit.length">
        <div class="new-content-list" v-for="(item,index) in friendLsit" :key="index">
          <img
            class="imgbox"
            :src="item.portrait"
            alt
          />
          <ul class="list-item">
            <li class="title">{{item.messageValue==2?`请求加入${item.user} 群`:item.user}}</li>
            <li v-if="item.stateValue>1">{{item.stateValue==2?'已发送验证消息':'已添加你为好友'}}</li>
            <li v-else>对方请求加为好友</li>
            <li></li>
          </ul>
          <div class="list-state">
            <div v-if="item.stateValue>1">{{item.stateValue==2?'等待验证':'已添加'}}</div>
            <div v-else>
              <button class="tian" @click="onAgree(item)">同意</button>
            </div>
          </div>
        </div>
      </div>
      <div class="notime" v-else>暂无添加信息</div>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import { setAgrees, getNewFriendlist } from '@/api/user'
import { mapState } from 'vuex'
export default {
  components: { Navs },
  data () {
    return {
      friendLsit: []
    }
  },
  computed: {
    ...mapState(['user', 'username'])
  },
  created () {
    this.getaddfriendstate({ username: this.username })
  },

  mounted () {

  },
  methods: {
    async getaddfriendstate (data) {
      await getNewFriendlist(data).then(data => {
        if (data.code === 20000) {
          this.friendLsit = data.data
        }
      })
    },
    async setAgreesa (data) {
      await setAgrees(data).then(datas => {
        if (datas.code === 20000) {
          this.getaddfriendstate({ username: this.username })
          this.$store.dispatch('getfriendstate')
          this.$store.dispatch('getgroupLists')
          this.$socket.emit('Agree', {
            username: data.newFriendUsername,
            userId: this.username
          })
        }
      })
    },

    onAgree (item) {
      let objs = {
        username: this.username,
        nweusername: item.username,
        roomNumber: item.roomNumber
      }
      this.setAgreesa(objs)
      this.$store.dispatch('getfriendstate')
      this.$store.dispatch('getgroupLists')
    }
  }
}
</script>
<style lang="less" scoped>
.notime{
  margin-top: 50px;
  font-size: 40px;
}
.new-friend-nav {
  display: flex;
}
.new-content-box {
  width: 100%;
  padding: 0 20px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  background: #fff;
  overflow: hidden;
}
.new-content-list {
  display: flex;
  justify-content: space-between;

  text-align: left;
  color: #aaa;
  // background: pink;
  height: 130px;
  margin-top: 20px;
  overflow: hidden;
  .imgbox {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    display: block;
  }
  .list-item {
    flex: 1;
    font-size: 30px;
    padding: 0 20px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      margin-bottom: 5px;
    }
    .title {
      color: #000;
      font-size: 36px;
      height: 42px;
      line-height: 42px;
      width: 53vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .list-state {
    // flex: 1;
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
