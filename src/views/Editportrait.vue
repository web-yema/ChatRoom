<template>
  <div>
      <Navs :showlt="true">
        <div slot="center">编辑头像</div>
    </Navs>
    <cube-upload
      ref="upload"
      v-model="files"
      :action="action"
      @files-added="addedHandler"
      @file-error="errHandler"
      @file-success="bbb"
      @data="datas"
      @file-submitted="sss"
    >
      <div class="clear-fix">
        <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
        <cube-upload-btn>
          <div class="imgbox-s">
            <img :src="imgUrl||portrait" alt />
          </div>
        </cube-upload-btn>
      </div>
    </cube-upload>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { baseURL } from '@/api/api'
// import { Headportrait } from '@/api/user.js'
import Navs from '@/components/Nav'
export default {
  components: { Navs },
  data () {
    return {
      action: {
        target: baseURL + '/headportrait',
        data: {}
      },
      files: [],
      imgUrl: null
    }
  },

  computed: {
    ...mapState(['user', 'username', 'RoomList', 'portrait'])
  },
  mounted () {
    this.action = {
      ...this.action,
      data: {
        filenames: this.username
      }
    }
  },
  methods: {
    sss () {
      // Headportrait({
      //   username: this.username
      // })
    },
    bbb () {
      this.imgUrl = this.files[0].response.imgUrl
      this.files = []
    },
    datas () {},
    addedHandler () {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler (file) {
      // const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    }
  }
}
</script>

<style lang="stylus" >
.clear-fix{
    margin: 0 auto;
    width: 300px;
    height: 300px;
    overflow hidden;
    border-radius: 50%;
}
.cube-upload {
  .cube-upload-file, .cube-upload-btn {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    overflow hidden;
    border-radius: 50%;
  }

  .cube-upload-file {
    margin: 0 auto;

    + .cube-upload-btn {
      margin-top: -300px;
      opacity: 0;
    }
  }
  .imgbox-s img {
    display: block;
    width: 300px;
    height: 300px;

    border-radius: 50%;
  }

  .cube-upload-file-def {
    width: 100%;
    height: 100%;
    overflow hidden;
    margin: 0 auto;
    border-radius: 50%;
    .cubeic-wrong {
      display: none;
    }
  }
  .cube-upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      text-align: center;
    }

    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
      font-size: 32px;
      line-height: 1;
      font-style: normal;
      color: #fff;
      background-color: #333;
      border-radius: 50%;
    }
  }
}
</style>
