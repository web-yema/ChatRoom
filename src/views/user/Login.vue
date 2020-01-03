<template>
  <div>
    <div>
      <Navs>
        <div slot="center">登录</div>
      </Navs>
      <div class="content">
        <input class="inputs btm" v-model="form.username" placeholder="账号" />
        <input class="inputs" v-model="form.password" type="password" placeholder="密码" />
        <div class="btn-box">
          <div class="login-btn" @click="onLogin">登录</div>
          <div class="btn-content">
            <span @click="showActive">忘记密码</span>
            <span @click="onregister">用户注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import { mapState } from 'vuex'
export default {
  components: { Navs },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  watch: {
    loginState (a, b) {
      // console.log(a)
      if (a === 2000) {
        this.onJump()
      }
    }
  },
  computed: {
    ...mapState(['loginState'])
  },
  methods: {
    showActive () {
      this.$createActionSheet({
        data: [
          {
            content: '找回密码'
          },
          {
            content: '短信验证登录'
          }
        ],
        onSelect: (item, index) => {
          this.$createToast({
            txt: `Clicked ${item.content}`,
            type: 'correct',
            time: 1000
          }).show()
        }
      }).show()
    },
    onregister () {
      this.$router.push('/register')
    },
    onLogin () {
      if (this.form.username.length === 0) {
        this.$message({ title: '请输入账号' })
        return
      }
      if (this.form.password.length < 6) {
        this.$message({ title: '请输入密码并且密码长度不能小于6位' })
        return
      }
      this.$store.dispatch('logins', this.form)
    },
    onJump () {
      // console.log('几点睡的')
      // this.$socket.id = this.form.username
      // console.log(this.$socket.id)
      this.$socket.emit('login', {
        username: this.form.username
      })
      this.$router.push('/')
    }
  }
}
</script>
<style  scoped>
.inputs {
  height: 80px;
  width: 100%;
  font-size: 33px;
  line-height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
}
.btm {
  border-bottom: 1px solid whitesmoke;
}
.btn-box {
  padding: 0px 20px;
  box-sizing: border-box;
}
.login-btn {
  width: 100%;
  background: deepskyblue;
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-size: 33px;
  border-radius: 15px;
  margin: 40px 0;
}
.btn-content {
  display: flex;
  justify-content: space-between;
  color: deepskyblue;
  font-size: 28px;
}
</style>
