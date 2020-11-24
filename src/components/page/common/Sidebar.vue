<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router>
      <template v-for="item in routers">
        <template v-if="item.children">
          <el-submenu :index="item.id" :key="item.id">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.id" :key="subItem.id">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.path">{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.path">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id" :key="item.id">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      routers:this.$store.getters.routers
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "/");
    }
  },
  created() {
  //  console.log(this.$store.getters.routers)
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
