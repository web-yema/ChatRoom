<template>
  <div class="nar-bar-content">
    <div v-if="friendLsit.length!==0">
      <div class="fenzu-box" v-for="(item,index) in friendLsit" :key="index">
        <div @click="btn(index)">
          <span>{{showilist[index]==true?"↓":">"}}</span>
          {{item.title}} {{item.groupList.length}}
        </div>
        <ul v-show="showilist[index]">
          <div v-for="(items,index) in item.groupList" :key="index">
            <div @click="btns(items)">
              <HaoList :itemarr="items"></HaoList>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div class="nogroup" v-else>暂无群聊</div>
  </div>
</template>

<script>
import HaoList from '../Haolist'
import { mapState } from 'vuex'
// import { getaddfriendstates } from '@/api/user'

export default {
  components: { HaoList },
  computed: {
    ...mapState(['user', 'username', 'RoomList', 'GroupObj'])
  },
  data () {
    return {
      friendLsit: [
        {
          title: '我创建的群',
          groupList: []
        },
        {
          title: '我加入的群',
          groupList: []
        },
        {
          title: '我管理的群',
          groupList: []
        }
      ],
      showilist: [],
      GroupObjs: {}
    }
  },
  watch: {
    GroupObjs (newdata, b) {
      this.friendLsit = [
        {
          title: '我创建的群',
          groupList: newdata.myGroupList || []
        },
        {
          title: '我加入的群',
          groupList: newdata.addGroupList || []
        },
        {
          title: '我管理的群',
          groupList: newdata.myManagedList || []
        }
      ]
    },
    GroupObj (a, b) {
      if (a) {
        this.GroupObjs = this.GroupObj
      }
    },
    friendLsit (newdata, b) {
      newdata.map((item, index) => {
        this.showilist[index] = false
      })
    }
  },
  created () {
    this.GroupObjs = this.GroupObj
    // this.getaddfriendstate({
    //   username: this.username,
    //   stateValue: 3,
    //   groupChat: 2
    // })
  },
  mounted () {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.sockets.subscribe(`${this.username}Agree`, data => {
    //       this.getaddfriendstate({
    //         username: this.username,
    //         stateValue: 3,
    //         groupChat: 2
    //       })
    //     })
    //   }, 0)
    // })
  },
  methods: {
    // async getaddfriendstate (data) {
    // await getaddfriendstates(data).then(data => {
    //   if (data.code === 20000) {
    //     this.friendLsit = data.data
    //     // console.log(data)
    //   }
    // })
    // },

    btn (id) {
      let arr = JSON.parse(JSON.stringify(this.showilist))
      arr[id] = !arr[id]
      this.showilist = arr
    },
    btns (item) {
      this.$store.dispatch('chatdata', { item, groupChat: 2 })
      this.$router.push({
        name: 'chat'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nogroup {
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a6a5a5;
  font-size: 30px;
}
</style>
