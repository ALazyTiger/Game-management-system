<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <transition name="move" mode="out-in">
        <keep-alive :include="tagsList">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import store from '@/store';
// import bus from './bus';
export default {
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar
    //  vTags
  },
  computed: {
    routes(){
      return store.getters.routers
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.wrapper{
  width: 100%;
  height: 100%;
  .content-box {
    position: relative;
    margin-left: 250px;
    height: calc( 100% - 70px );
    transition: left 0.3s ease-in-out;
    background: #e3e3e3;
    .content {
      width: auto;
      height: 100%;
      padding: 10px;
      overflow-y: scroll;
          background: #fff;
    
    }
  }
}
</style>
