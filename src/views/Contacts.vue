<template>
  <div class="about">
    <Navs>
      <div slot="left">
        <router-link to="/information">
          <img class="imgbox" :src="portrait" alt />
        </router-link>
      </div>
      <div slot="center" class="xiaotext">联系人</div>
      <router-link slot="right" class="as" to="/addfriends">+</router-link>
    </Navs>
    <div class="content">
      <div class="content-box">
        <router-link tag="div" to="/newFriend" class="new-friend-box">
          新朋友
          <p class="jiantou">></p>
        </router-link>
        <cube-scroll-nav-bar
          class="cube-nav"
          :current="current"
          :labels="labels"
          @change="changeHandler"
        />

        <Haoyou v-show="current==='好友'"></Haoyou>
        <Fenzu v-show="current==='分组'"></Fenzu>
        <Qunliao v-show="current==='群聊'"></Qunliao>
      </div>

      <TabBar></TabBar>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import TabBar from '@/components/TabBar'
import Haoyou from '../components/nav-bar/Haoyou'
import Fenzu from '../components/nav-bar/Fenzu'
import Qunliao from '../components/nav-bar/Qunliao'
import { mapState } from 'vuex'
export default {
  components: { Navs, TabBar, Haoyou, Fenzu, Qunliao },
  data () {
    return {
      text: '',
      current: '分组',
      labels: ['好友', '分组', '群聊', '设备', '通讯录', '公众号'],
      txts: ['好友', '分组', '群聊', '设备', '通讯录', '公众号'],
      friendLsit: []
    }
  },
  computed: {
    ...mapState(['portrait', 'friendsData', 'GroupObj'])

  },
  created () {
    if (this.friendsData.length === 0 || Object.keys(this.GroupObj).length === 0) {
      this.$store.dispatch('getfriendstate')
      this.$store.dispatch('getgroupLists')
    }
  },
  methods: {
    changeHandler (cur) {
      this.current = cur
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
  font-size: 63px;
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
  height: 500px;
  background: #fff;
  position: absolute;
  top: 100px;
  right: 10px;
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
  font-size: 28px;
  height: 30px;
  width: 75vw;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #000;
}
.as {
  color: #fff;
  font-size: 60px;
}
.new-friend-box {
  text-align: left;
  line-height: 100px;
  background: #fff;
  margin: 20px 0;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 36px;
  width: 100%;
  display: flex;
}
.jiantou {
  text-align: right;
  flex: 1;
  color: #a6a5a5;
  font-size: 40px;
}
</style>
<style>
.cube-scroll-nav-bar-item {
  width: 20vw;
  font-size: 33px;
  color: #000;
  height: 60px;
  line-height: 60px;
}
</style>
