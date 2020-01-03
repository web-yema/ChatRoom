<template>
  <div class="about">
    <Navs>
      <div slot="left">
        <router-link to="/information">
          <img class="imgbox" :src="portrait" alt />
        </router-link>
      </div>
      <div slot="center" class="xiaotext">消息</div>
      <div slot="right">
        <div>
          <span class="jia" @click="jia">+</span>
        </div>
        <div class="ding" v-if="shows" @click.stop="jia">
          <div class="ding-box" @click.stop>
            <ul>
              <li @click="onCreategroup">创建群聊</li>
              <li @click="onAddfriends" class="as">加好友/群</li>
              <li @click="logout">退出登录</li>
            </ul>
          </div>
        </div>
      </div>
    </Navs>
    <div class="content">
      <div class="content-box">
      <div v-if='messageLists.length!==0'>
          <div v-for="(item,idx) in messageLists" :key="idx">
          <div @click="btns(item)">
            <HaoList :itemarr="item"></HaoList>
          </div>
      </div>
       </div>
       <div v-else>
         暂无聊天消息
       </div>
      </div>
      <TabBar></TabBar>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import TabBar from '@/components/TabBar'
import HaoList from '@/components/Haolist'

import { mapState } from 'vuex'
export default {
  components: { Navs, TabBar, HaoList },
  data () {
    return {
      shows: false,
      text: '',
      messageLists: []
    }
  },
  watch: {
    username (a, b) {
      if (a) {
        this.$store.dispatch('getmessagelists')
        this.sockets.subscribe(this.username, data => {
          this.$message({ title: `${data.user}${data.title}` })
        })
      }
    },
    friendsData (a, b) {
      if (a) {
        this.onmessage()
      }
    },
    GroupObj (a, b) {
      if (a) {
        this.onmessage()
      }
    },
    messageList (a, b) {
      if (a) {
        this.onmessage()
      }
    }
  },
  computed: {
    ...mapState(['user', 'username', 'portrait', 'messageList', 'friendsData', 'GroupObj'])
  },

  mounted () {
    if (this.username) {
      this.$store.dispatch('getmessagelists')
      this.onmessage()
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.sockets.subscribe(this.username, data => {
          this.$message({ title: `${data.user}${data.title}` })
        })
        // 添加好友提醒
        this.sockets.subscribe(`${this.username}Agree`, data => {
          console.log(data)
          // this.getaddfriendstate({
          //   username: this.username
          // })
        })
      }, 13)
    })
  },

  methods: {
    // 处理聊天列表的
    onmessage () {
      if (this.friendsData.length === 0) {
        this.$store.dispatch('getfriendstate')
        this.$store.dispatch('getgroupLists')
        return
      }
      let FriendsList = []
      this.friendsData.map(item => {
        FriendsList = [...FriendsList, ...item.FriendsList]
      })
      let GroupArr = []
      if (Object.keys(this.GroupObj).length !== 0) {
        let { addGroupList, myGroupList, myManagedList } = this.GroupObj
        GroupArr = [...addGroupList, ...myGroupList, ...myManagedList]
      }
      //
      let messageLists = this.messageList.map(item => {
        if (item.messageValue === 1) {
          let datalist = FriendsList.find(items => items.username === item.username)
          return datalist
        } else {
          let datalist = GroupArr.find(items => items.username === item.username)
          return datalist
        }
      })
      this.messageLists = messageLists
    },
    // 进去聊天室
    btns (item) {
      this.$store.dispatch('chatdata', { item })
      this.$router.push({
        name: 'chat'
      })
    },
    onCreategroup () {
      this.shows = false
      this.$router.push('/creategroup')
    },

    onAddfriends () {
      this.shows = false
      this.$router.push('/addfriends')
    },
    jia () {
      this.shows = !this.shows
    },

    logout () {
      localStorage.removeItem('token')
      this.$store.dispatch('loginStates')
      this.$socket.emit('logout')
      this.$router.push('/login')
      this.shows = false
    }
  }
}
</script>
<style lang="less" scoped>
.top-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.imgbox {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  vertical-align: middle;
}
.xiaotext {
  font-size: 37px;
}
.jia {
  font-size: 60px;
}
.ding {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(000, 000, 000, 0.1);
  z-index: 10;
}
.ding-box {
  width: 300px;
  // height: 500px;
  background: #fff;
  position: absolute;
  top: 110px;
  right: 10px;
  color: #000;
  padding: 20px 30px;
  text-align: left;
  border-radius: 10px;
}
.listimg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.list-box {
  width: 100%;
  padding: 20px;
  display: flex;
  position: relative;
  background: #fff;
}
.list-box .showbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: #000;
  opacity: 0.1;
  display: none;
}
.list-box:active .showbox {
  display: block;
}
.conboxs {
  text-align: left;
}
.conboxs .title {
  line-height: 70px;
  font-size: 38px;
}
.conboxs .texts {
  font-size: 25px;
  height: 30px;
  width: 75vw;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #aaa;
}
</style>
