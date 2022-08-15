<template>
  <div class="iframe">
    <div class="head"></div>
    <div class="content">
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <div :key="index" v-for="(item, index) in meunJson">
            <el-submenu index="1" v-if="item.child.length">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="it.url" :key="it.code" v-for="it in item.child">
                <i class="el-icon-setting"></i>
                <span slot="title">{{ it.name }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item :index="item.url" v-else>
              <i class="el-icon-setting"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div class="conten_two">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meunJson: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const url = "/v1/manage/admin/menu";
      const data = await this.$axios.get(url);
      if (data.code === 1) {
        console.log(data);
        this.meunJson = data.data.permissions;
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped lang='less'>
.iframe {
  width: 100%;
  height: 100vh;
}
.head {
  width: 100%;
  height: 56px;
  background: #444;
}
.content {
  width: 100%;
  display: flex;
  height: calc(100vh - 56px);
}
.menu {
  width: 200px;
  height: 100%;
  overflow: auto;
  border-left: 1px solid #444;
}

.conten_two {
  width: calc(100% - 200px);
  height: 100%;
}
.menu/deep/ .el-menu {
  width: 200px;
  border: none;
}



</style>