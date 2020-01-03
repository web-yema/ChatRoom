<template>
  <div>
    <Navs>
      <div slot="left" class="group-nav-left">
        <router-link tag="div" to="/">取消</router-link>
      </div>
      <div slot="center" class="xiaotext">创建群聊</div>
    </Navs>
    <div class="content">
      <div class="group-content">
        <div class="fenzu-box" v-for="(item,index) in friendsData" :key="index">
          <div @click="btn(index)">
            <span>{{showilist[index]==true?"↓":">"}}</span>
            {{item.title}} {{item.FriendsList.length}}
          </div>
          <ul v-show="showilist[index]">
            <div v-for="(items,index) in item.FriendsList" :key="index">
              <div>
                <HaoList :itemarr="items">
                  <div slot="lsit-left" class="checkbox-box">
                    <input
                      type="checkbox"
                      class="checkboxa"
                      v-model="showis"
                      :value="items"
                      :id="items.username"
                    />
                    <label :for="items.username"></label>
                  </div>
                </HaoList>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div class="group-btoom">
        <button :class="jing?'groupBtn fad':'groupBtn'" :disabled="jing" @click="onGroup">立即创建</button>
      </div>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import HaoList from '@/components/Haolist'
import { mapState } from 'vuex'
import { setCreategroup } from '@/api/user'
export default {
  components: { Navs, HaoList },
  computed: {
    ...mapState(['user', 'username', 'RoomList', 'portrait', 'friendsData'])
  },
  data () {
    return {
      friendLsit: [],
      showis: [],
      showilist: [],
      jing: true
    }
  },
  watch: {
    friendsData: function (newQuestion, oldQuestion) {
      newQuestion.map((item, index) => {
        this.showilist[index] = false
      })
    },
    showis: function (newQuestion, oldQuestion) {
      if (newQuestion.length === 0) {
        this.jing = true
      } else {
        this.jing = false
      }
    }
  },
  created () {
    this.$store.dispatch('getfriendstate')
  },
  mounted () {},
  methods: {
    btn (id) {
      let arr = JSON.parse(JSON.stringify(this.showilist))
      arr[id] = !arr[id]
      this.showilist = arr
    },
    async setCreategroups (data) {
      await setCreategroup(data).then(data => {
        if (data.code === 20000) {
          this.$router.push('/')
        }
      })
    },

    onGroup () {
      let showis = this.showis.map(item => {
        return item.username
      })
      let showisList = {
        username: this.username,
        user: `${this.showis[0].user}、${this.user}`,
        groupMembers: [this.username, ...showis]
      }
      this.setCreategroups(showisList)
      this.showis = []
    }
  }
}
</script>

<style lang="less" scoped>
.group-nav-left {
  font-size: 33px;
}
.group-content {
  width: 100vw;
  height: calc(100% - 130px);
  overflow: hidden;
  overflow-y: scroll;
}
.group-btoom {
  width: 100vw;
  height: 130px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}
.groupBtn {
  border: none;
  width: 100%;
  height: 100%;
  background: dodgerblue;
  border-radius: 10px;
  font-size: 35px;
  color: #fff;
}
.fad {
  opacity: 0.5;
}
.checkboxa {
  visibility: hidden;
  display: none;
}
.checkbox-box {
  height: 100%;
  margin-right: 10px;
}
label {
  width: 30px;
  height: 30px;
  border: 1px solid #707070;
  border-radius: 50%;
  display: block;
  position: relative;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  // background: red;
}
.checkboxa:checked + label {
  background: red;
  //   background-size: 100% 100%;
}
</style>
