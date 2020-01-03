<template>
  <div>
    <div class="addto-contens" v-if="shows">
      <div class="nar-bar-content">
        <div class="addto-top" v-bind:style="{'background':`url(${sss})`}">
          <div class="jian-box">
            <span @click="addtoGo">&lt;</span>
          </div>
          <div class="top-box">
            <img class="imgbox" :src="data.portrait" alt />
          </div>
          <div class="names">{{data.user}}</div>
        </div>

        <div class="addto-content">
          <p v-if='messageValue!=2'>
            <span>账号：</span>
            {{data.username}}
          </p>
           <p v-else>
            <span>账号：</span>
            {{data.roomNumber}}
          </p>
        </div>

      </div>
      <div v-if='messageValue!=2'>
        <div class="button-box" v-if="username!==data.username">
        <button @click="onJiabtn">加好友</button>
      </div>
      </div>
      <div v-else>
        <div class="button-box" v-if="username!==data.username">
        <button @click="onaddgoup">加群</button>
      </div>
      </div>

    </div>
    <div v-if="!shows">
      <div v-if="!fen">
        <Navs>
          <div slot="left" @click="onJiabtn">取消</div>
          <div slot="center">添加好友</div>
          <div slot="right" @click="onSend">发送</div>
        </Navs>
        <div class="content text">
             <div class="bei">
          设置备注和分组
          </div>
          <div class="contents">
            <div>备注 {{remarks}}</div>
            <div  @click="fenzu">分组  {{title}} ></div>
          </div>
        </div>

      </div>
      <div v-if="fen">
        <Navs>
          <div slot="left" @click="fenzu">&lt;</div>
          <div slot="center">移至分组</div>
        </Navs>
        <div  class="content text">
            <ul>
              <li v-for="item in friendsList" :key='item' @click="onbtnTitle(item)">
                <span>{{item}} </span>
                <span v-if="item==title">✔️</span>
              </li>
            </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getlookforsb, setaddfriends, getaddgroup } from '@/api/user'
import { mapState } from 'vuex'
import Navs from '@/components/Nav'
export default {
  components: { Navs },
  created () {
    let { id, messageValue } = this.$route.query
    if (messageValue === '2') {
      this.messageValue = messageValue
      this.getaddgroups({
        username: id
      })
    } else {
      this.getlookforsbs({
        username: id
      })
    }
  },
  data () {
    return {
      data: {

      },
      messageValue: 1,
      shows: true,
      fen: false,
      remarks: '',
      title: '我的好友',
      sss:
        'http://img4.imgtn.bdimg.com/it/u=3862462025,4084711461&fm=26&gp=0.jpg'
    }
  },
  computed: {
    ...mapState(['user', 'username', 'friendsList'])
  },

  mounted () {
    if (this.friendsList.length === 0) {
      this.$store.dispatch('getfriendstate')
    }
    // // 接收服务端的信息
    // this.sockets.subscribe(this.username, data => {
    //   this.$message({ title: `${data.user}${data.title}` })
    // })
  },
  methods: {
    onbtnTitle (item) {
      this.title = item
      this.fen = !this.fen
    },
    //
    async getaddgroups (data) {
      await getaddgroup(data).then(item => {
        if (item.code === 200) {
          this.data = item.data[0]
          this.remarks = item.data[0].user
        }
      })
    },
    async getlookforsbs (data) {
      await getlookforsb(data).then(item => {
        if (item.code === 200) {
          this.data = item.data
          this.remarks = item.data.user
        }
      })
    },
    async setAddfriends (data, value) {
      await setaddfriends(data).then(item => {
        if (item.code === 20000) {
          this.$socket.emit('AddFriends', {
            username: this.data.username,
            text: value ? '请求加群' : '请求加为好友',
            user: this.user,
            newFriendUsernaem: this.username
          })
          this.$message({ title: '请求已发送' })
        }
      })
    },

    addtoGo () {
      this.$router.go(-1)
    },
    onJiabtn () {
      this.shows = !this.shows
    },
    fenzu () {
      this.fen = !this.fen
    },
    onaddgoup () {
      this.setAddfriends({
        remarks: this.remarks,
        newuser: this.user,
        username: this.username,
        nweusername: this.data.username,
        roomNumber: this.data.roomNumber,
        messageValue: 2
      }, 2)
      this.$router.push('/')
    },
    onSend () {
      this.setAddfriends({
        remarks: this.remarks,
        title: this.title,
        newuser: this.user,
        username: this.username,
        nweusername: this.data.username
      })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>

.imgbox {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.addto-contens {
  height: 100vh;
}
.jian-box {
  text-align: left;
  padding: 20px;
  color: #fff;
}

.button-box {
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  background: rgba(245, 245, 245, 0.89);
}
.button-box button {
  flex: 1;
  background: deepskyblue;
  border-radius: 15px;
  border: none;
}
.addto-top {
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  overflow: hidden;
}
.names {
  margin: 20px 0;
}
.addto-content {
  text-align: left;
  padding: 10px 20px;
  box-sizing: border-box;
}
.addto-content p {
  margin: 20px 0;
}

.text{
  text-align: left;
  line-height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 40px;
}
.bei{
  font-size: 30px;
}
</style>
