<template>
  <div>
    <div class="addto-contens" v-show="showis">
      <div class="nar-bar-content">
        <div class="addto-top" v-bind:style="{'background':`url(${sss})`}">
          <div class="jian-box">
            <P @click="addtoGo">&lt;</P>
            <P @click="addtosetfrind" class="set-rigth">设置</P>
          </div>
          <div class="top-box">
            <img class="imgbox" :src="data.portrait" alt />
          </div>
          <div class="names">{{remarks}}</div>
        </div>

        <div class="addto-content">
          <p>
            <span>账号：</span>
            {{data.username}}
          </p>
          <p>
            <span>个性签名：</span>
            {{data.autograph}}
          </p>
        </div>
      </div>
      <div class="button-box">
        <button @click="onJiabtn">发消息</button>
      </div>
    </div>
    <div v-if="!showis">
      <Nav>
        <P slot="left" @click="addtosetfrind">&lt;</P>
        <div slot="center">设置</div>
      </Nav>
      <div>
        sd
        <input type="text" v-model="remarks" id />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../components/Nav'
import { mapState } from 'vuex'
export default {
  components: {
    Nav
  },
  data () {
    return {
      showis: true,
      data: {},
      remarks: '',
      sss:
        'http://img4.imgtn.bdimg.com/it/u=3862462025,4084711461&fm=26&gp=0.jpg'
    }
  },

  mounted () {
    // console.log(this.infodata.item)
    // if (this.$route.params.item) {
    this.data = this.infodata.item
    this.remarks = this.infodata.remarks
    // }
  },
  computed: {
    ...mapState(['infodata'])
  },
  methods: {
    addtoGo () {
      this.$router.go(-1)
    },
    onJiabtn () {
      this.$router.push({
        name: 'chat',
        params: { item: this.data }
      })
    },
    addtosetfrind () {
      this.showis = !this.showis
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
  display: flex;
  justify-content: space-between;
}
.set-rigth {
  font-size: 40px;
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

.text {
  text-align: left;
  line-height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 40px;
}
.bei {
  font-size: 30px;
}
</style>
