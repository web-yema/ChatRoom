<template>
  <div>
    <div class="home">
      <Navs :showlt="true" :tos="tosd">
        <div slot="center">{{datas.user}}</div>
        <div slot="right" @click="showInfo">三</div>
      </Navs>
      <div class="content">
        <ul class="liao-content pad" ref="scrllele">
          <li v-for="(item,index) in list " :key="index" :class="username===item.userId?'a':'b'">
            <div v-if="username!==item.userId">
              <img class="imgbox" :src="item.portrait" alt />
            </div>
            <div>
              <p
                class="nameuser"
                v-if="datas.groupMembers"
                :class="username===item.userId?'a':'b'"
              >{{item.user}}</p>
              <div class="con-text">{{item.text}}</div>
            </div>
            <div v-if="username===item.userId">
              <img class="imgbox" :src="portrait" alt />
            </div>
          </li>
        </ul>
        <div class="incontexts pad">
          <input type="text" class="inputs" v-model="input" :disabled="false" @keydown="onkeyd" />
          <button :class="jing?'fa fad':'fa' " :disabled="jing" @click="btn">发送</button>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navs from '@/components/Nav'
import { setmessagelist } from '@/api/user.js'

export default {
  name: 'home',
  components: { Navs },
  data () {
    return {
      input: '',
      jing: true,
      list: [],
      datas: {},
      tosd: '/',
      scrollId: 0
    }
  },
  watch: {
    input: function (newQuestion, oldQuestion) {
      if (newQuestion.length !== 0) {
        this.jing = false
      } else {
        this.jing = true
      }
    },
    list: function (newQuestion, oldQuestion) {
      this.$nextTick(() => {
        this.soll()
      })
    }
  },
  mounted () {
    // if (this.$route.params.item) {
    this.datas = this.infodata.item
    // }

    let aa = () => {
      this.$socket.emit('sendMsg', {
        roomNumber: this.datas.roomNumber,
        user: this.user,
        userId: this.username,
        portrait: this.portrait
      })
    }
    aa()
    // 接收服务端的信息
    this.sockets.subscribe(this.datas.roomNumber, data => {
      this.list = data
    })
  },
  computed: {
    ...mapState(['user', 'username', 'RoomList', 'portrait', 'infodata'])
  },
  destroyed () {
    this.sockets.unsubscribe(this.datas.roomNumber)
  },
  methods: {
    showInfo () {
      this.$router.push('/setchatlist')
    },
    async setmessagelists (data) {
      await setmessagelist(data)
    },
    btn () {
      this.$socket.emit('sendMsg', {
        roomNumber: this.datas.roomNumber,
        user: this.user,
        userId: this.username,
        portrait: this.portrait,
        text: this.input
      })
      // 存储消息列表
      let obj = {
        ...this.datas,
        userId: this.username
      }
      this.setmessagelists(obj)
      this.input = ''
    },
    onkeyd (e) {
      if (e.keyCode === 13) {
        if (this.input.length) {
          this.btn()
        }
      }
    },
    // 滚动事件
    soll () {
      let { scrollTop, scrollHeight, clientHeight } = this.$refs.scrllele
      if (this.scrollId === 0) {
        this.$refs.scrllele.scrollTop = scrollHeight + clientHeight
        this.scrollId = 1
        return
      }
      let id = this.list.length - 1
      if (scrollTop < scrollHeight - clientHeight * 2) {
        if (this.list[id].userId === this.username) {
          let num = scrollTop
          let Inter = null
          Inter = setInterval(() => {
            num += 20
            if (num + clientHeight > scrollHeight) {
              clearInterval(Inter)
            }
            this.$refs.scrllele.scrollTop = num + clientHeight
          }, 10)
        }
      } else {
        this.$refs.scrllele.scrollTop = scrollHeight + clientHeight
      }
    }
  }
}
</script>

<style  scoped>
.inputs {
  height: 80px;
  flex: 1.5;
  font-size: 33px;
  line-height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: 1px solid rgba(245, 245, 245, 0.712);
  border-radius: 40px;
}
.a {
  color: red;
  display: flex;
  justify-content: flex-end;
}
.nameuser {
  font-size: 30px;
  margin-bottom: 20px;
}
.b {
  color: dodgerblue;
  display: flex;
  justify-content: flex-start;
}
.pad {
  padding: 0 20px;
}
.con-text {
  max-width: 60vw;
  background: #fff;
  text-align: left;
  word-wrap: break-word;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 33px;
  line-height: 50px;
}

.liao-content {
  height: calc(100% - 160px);
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  overflow: hidden;
  overflow-y: scroll;
}
.liao-content li {
  margin: 20px 0;
}

.incontexts {
  display: flex;
  height: 160px;
  background: whitesmoke;
  box-sizing: border-box;
  overflow: hidden;
  /* padding-top: 20px; */
}
.usernames {
  font-size: 34px;
  padding: 10px 0;
}
.a .usernames {
  text-align: right;
  color: #000;
  margin-bottom: 10px;
}
.b .usernames {
  text-align: left;
  color: #000;
}
.fa {
  padding: 0 30px;
  background: dodgerblue;
  border: none;
  margin-left: 10px;
  border-radius: 40px;
  color: #fff;
  height: 80px;
}
.fad {
  opacity: 0.5;
}
.imgbox {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 10px;
}
</style>
