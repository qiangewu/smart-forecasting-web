<template>
  <el-menu
    router
    :default-active="activeRoute"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose">
    <menu-item :menu="item" :key="item.id" v-for="item in menu.data"/>
  </el-menu>
</template>
<script>
import { _treeGenerator } from '../api/sysMenuApi';
import MenuItem from '../components/MenuItem.vue';

export default {
  name: 'SideBar',
  components: { MenuItem },
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      menu: {
        data: [],
      },
      activeRoute: this.$route.fullPath,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    const menus = JSON.parse(localStorage.getItem('MENUS'));
    this.menu.data = menus
      .filter(x => !x.parentId)
      .map(x => _treeGenerator(x, menus));
  },
};
</script>

<style scoped>

</style>
