<template>
<div>
  <Navs :showlt="true">
    <div slot="center">群聊成员</div>
  </Navs>
  <div>
    {{infodata}}
    <!-- 前段套路深不要瞎尝试 -->
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import Navs from '@/components/Nav'

export default {
  components: { Navs },
  data () {
    return {
      datas: {}
    }
  },
  computed: {
    ...mapState(['user', 'username', 'portrait', 'infodata'])
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>

</style>
