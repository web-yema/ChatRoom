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
    <div class="setup" v-if="!showis">
      <Nav>
        <P slot="left" @click="addtosetfrind">&lt;</P>
        <div slot="center">设置</div>
      </Nav>
      <div class="setup-content">
        <div class="xx" v-if="!fen">
          <!-- 备注名 -->
          <div class="set-remarks">
            <div class="memoname">备注名</div>
            <p>
              <input type="text" v-model="remarks" id />
            </p>
          </div>
          <!-- 分组 -->
          <div class="grouping" @click="fenzu">
            <div class="grouping-name">分组</div>
            <div class="grouping-name1">{{title}} ></div>
          </div>
        </div>
        <!-- 移至分组 -->
        <div v-if="fen">
          <div class="content text">
            <ul>
              <li v-for="item in friendsList" :key="item" @click="onbtnTitle(item)">
                <span>{{item}}</span>
                <span v-if="item==title">✔️</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 删除好友 -->
        <div class="delete">
          <cube-button class="xx" @click="showActive">删除好友</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/Nav";
import { mapState } from "vuex";
import { deletefriend } from "@/api/user.js";

export default {
  components: {
    Nav
  },
  data() {
    return {
      title: "我的好友",
      fen: false, //分组
      showis: true,
      data: {},
      remarks: "", // 备注名
      sss:
        "http://img4.imgtn.bdimg.com/it/u=3862462025,4084711461&fm=26&gp=0.jpg"
    };
  },

  mounted() {
    this.data = this.infodata.item;
    this.remarks = this.infodata.item.remarks;
     if (this.friendsList.length === 0) {
      this.$store.dispatch("getfriendstate");
    }
  },
  computed: {
    ...mapState(["infodata", "user", "username", "friendsList"])
  },
  methods: {
    addtoGo() {
      this.$router.go(-1);
    },
    onJiabtn() {
      this.$router.push({
        name: "chat",
        params: { item: this.data }
      });
    },
    addtosetfrind() {
      this.showis = !this.showis;
    },
    // 分组
    fenzu() {
      this.fen = !this.fen;
    },
    onbtnTitle(item) {
      this.title = item;
      this.fen = !this.fen;
    },
    // 删除好友
    showActive() {
      this.$createActionSheet({
        title: "同时会屏蔽对方会话，不在接受此人信息",
        // active: 0,
        $class: {
          elasticframe: true
        },
        data: [
          {
            content: "删除好友"
          }
        ],
         onSelect: (item, index,) => {
          this.$createToast({
            txt: "删除成功",
            type: "correct",
            time: 1000,
            $class: {
              elasticframe1: true
            }
          }).show();
          this.delete()

        },
      }).show();
    },
    // 删除好友
    async delete (){
      let data = await deletefriend({username:this.username,newusername:this.data.username})
      if(data.code === 20000){
        this.$router.push('/') // 调用跳转到首页
      }
    }
  }
};
</script>

<style lang="less">
.elasticframe {
  .border-bottom-1px {
    padding: 30px 20px;
  }
  .cube-action-sheet-content {
    .border-bottom-1px {
      color: red;
      font-size: 40px;
    }
  }
  // 取消
  .cube-action-sheet-cancel {
    span {
      padding: 30px 20px;
      font-size: 40px;
    }
  }
}
.elasticframe1 {
  .cube-popup-content {
    width: 450px;
    height: 100px;
    padding: 0px 110px;
    // 删除成功
    .cube-toast-tip {
      max-width: 450px;
      max-height: 100px;
      font-size: 40px !important;
      line-height: 50px;
    }
  }
}
</style>

<style lang="less" scoped>

.setup {
  width: 100%;
  height: 100vh;
  background: rgba(245, 245, 245, 0.89);
  .setup-content {
    margin-top: 40px;
    width: 100%;
    height: 100vh;
    .xx {
      width: 100%;
      height: 200px;
      background: #fff;
      .set-remarks {
        padding: 20px 20px;
        display: flex;
        justify-content: space-between;
        width: 95%;
        height: 50px;
        border-bottom: 1px solid #f2f2f2;
        .memoname {
          width: 20%;
          height: 50px;
          line-height: 50px;
          font-size: 40px;
          color: #868686;
          text-align: center;
        }
        p {
          width: 80%;
          height: 4vh;
          font-size: 40px;
          input {
            width: 90%;
          }
        }
      }
      // 分组
      .grouping {
        // padding-left: 40px;
        padding: 25px 20px;
        width: 95%;
        height: 50px;
        font-size: 40px;
        display: flex;
        justify-content: space-between;
        .grouping-name {
          width: 15%;
          height: 50px;
          line-height: 50px;
          font-size: 40px;
          color: #868686;
          text-align: center;
        }
        .grouping-name1 {
          width: 80%;
          height: 50px;
          line-height: 50px;
          text-align: right;
        }
      }
    }

    // 确定
    .delete {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 100%;
        height: 100px;
        background: #ffffff;
        font-size: 40px;
        color: red;
        border: none;
      }
      button:active {
        background: #e5e8eb;
      }
    }
  }
}


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
