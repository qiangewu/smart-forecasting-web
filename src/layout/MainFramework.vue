<template>
  <div>
    <el-header class="header" style="height: 40px">
      <top-header :collapsed="collapsed" v-on:on-coll-change="handleCollapsedChange"/>
    </el-header>
    <el-container>
      <el-aside
        :width="collapsed?'65px':'300px'"
        class="aside">
        <side-bar :is-collapse="collapsed">
        </side-bar>
      </el-aside>
      <el-container>
        <el-main style="padding: 20px">
          <router-view/>
        </el-main>
        <el-footer>
          <bottom-footer/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';
import TopHeader from './TopHeader.vue';
import BottomFooter from './BottomFooter.vue';

export default {
  components: {
    BottomFooter,
    TopHeader,
    SideBar,
  },
  data() {
    return {
      collapsed: false,
      sideBarWidth: 200,
      isFullScreen: false,
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
  methods: {
    handleCollapsedChange(state) {
      this.collapsed = state;
      this.$store.commit('changeCollapsed', state);
      if (state) {
        this.sideBarWidth = 60;
      } else {
        this.sideBarWidth = 200;
      }
    },
  },
};
</script>
<style scoped>
  .aside {
    padding-top: 5px;
    height: calc(100vh - 80px);
    border-right: 1px solid #eeeeee;
    transition: width 0.3s, transform 2s;
  }

  .header {
    line-height: 40px;
    height: 40px;
    /*box-shadow: #efefef 0 1px 1px;*/
    background: #344E75;
  }

</style>
