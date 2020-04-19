<template>
  <div>
    <span style="padding-left: 20px;font-size:16px;color: #ffffff">Smart Forecasting</span>
    <side-trigger :collapsed="collapsed" v-on:on-change="handleCollpasedChange"/>
    <full-screen v-model="isFullScreen" style="margin-right: 10px;"/>
    <el-dropdown style="float: right;color: #ffffff" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userName}}<i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="password">
          {{$t("CHANGE_PASSWORD")||'修改密码'}}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          {{$t("LOGOUT")||'退出登录'}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <language-switch style="float: right"/>
  </div>
</template>

<script>
import SideTrigger from '../components/SideTrigger.vue';
import FullScreen from '../components/FullScreen.vue';
import LanguageSwitch from '../components/LanguageSwitch.vue';

export default {
  name: 'TopHeader',
  components: {
    LanguageSwitch,
    FullScreen,
    SideTrigger,
  },
  props: {
    collapsed: Boolean,
  },
  data() {
    return {
      isFullScreen: false,
      userName: this.$store.state.userName,
    };
  },

  methods: {
    goto(path) {
      this.$router.push({ path });
    },
    handleCommand(command) {
      this[command]();
    },
    logout() {
      this.$store.commit('clearLoginInfo');
      this.$router.push({ path: 'login' });
    },
    password() {
      this.$router.push({ path: 'user-password' });
    },
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state);
    },
  },
};
</script>

<style scoped>
  .header-menu {
    float: right;
    padding-right: 10px;
    cursor: pointer;
    color: #339f67;
  }

  .title {
    line-height: 25px;
    border-left: 3px solid #344E75;
    font-size: 15px;
    /* margin-left: 20px; */
    /* margin-top: 20px; */
    color: #344E75;
    padding: 5px 20px;
    /* padding-left: 10px; */
    /* border-bottom: 1px solid #344E75; */
    /* background: #eeeeee87; */
    -webkit-box-shadow: inset 0px 0px 5px #adadad;
    box-shadow: inset 0px 0px 5px #adadad;
  }
</style>
