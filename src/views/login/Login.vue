<template>
  <div style="
  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;" v-on:keyup.enter=login>
    <canvas class="canvas" ref="canvas"/>
    <el-row :gutter="10" style="margin-top: 25vh">
      <el-col :md="{span:6,offset:9}" :sm="{span:12,offset:6}" :xs="{span:24,offset:0}">
        <el-card>
          <div style="padding-top: 10px;padding-bottom: 10px;font-weight: 100;color:#5d7191">
            Smart Forecasting
          </div>
          <el-form
            ref="form"
            :model="form.data" :rules="form.rule" v-loading="autoLogin" v-on:keyup.enter=login
          >
            <el-form-item :label="$t('LOGIN_NAME')||'账号'" prop="loginName">
              <el-input
                v-model="form.data.loginName"
                :disabled="form.disabled"
              />
            </el-form-item>
            <el-form-item :label="$t('PASSWORD')||'密码'" prop="password">
              <el-input
                v-on:keyup.enter=login
                v-model="form.data.password"
                :disabled="form.disabled"
                show-password/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="login" v-on:keyup.enter=login :disabled="form.disabled">
                {{$t('LOGIN')||'登录'}}
                <i class="el-icon-arrow-right el-icon--right" v-if="!form.disabled"/>
                <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
              </el-button>
              <language-switch style="float: right"/>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  _login,
  _loginByUserId,
} from '@/api/loginApi';
import LanguageSwitch from '@/components/LanguageSwitch.vue';

async function login() {
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      this.form.disabled = true;
      const result = await _login({
        loginName: this.form.data.loginName,
        password: this.form.data.password,
      });
      if (result && result.code === 1200) {
        this.$store.commit('setLoginInfo', {
          userName: result.data.user.userName,
          id: result.data.user.id,
          token: result.data.token,
        });
        localStorage.setItem('roles', JSON.stringify(result.data.roles));
        const menus = result.data.menus.filter(menu => menu.type === 'MENU')
          .sort((a, b) => a.sort.localeCompare(b.sort));
        localStorage.setItem('MENUS', JSON.stringify(menus));
        const BUTTON = result.data.menus.filter(menu => menu.type === 'BUTTON')
          .map(x => x.path);
        localStorage.setItem('BUTTONS', JSON.stringify(BUTTON));
        await this.$router.push('/');
        return;
      }
      this.form.disabled = false;
    }
  });
}


export default {
  name: 'Login',
  components: { LanguageSwitch },
  async created() {
    if (this.$route.query.userId) {
      this.autoLogin = true;
    }
    if (this.autoLogin) {
      const result = await _loginByUserId({
        userId: this.$route.query.userId,
      });
      if (result && result.code === 1200) {
        this.$store.commit('setLoginInfo', {
          userName: result.data.user.userName,
          id: result.data.user.id,
          token: result.data.token,
        });
        localStorage.setItem('roles', JSON.stringify(result.data.roles));
        const menus = result.data.menus.filter(menu => menu.type === 'MENU')
          .sort((a, b) => a.sort.localeCompare(b.sort));
        localStorage.setItem('MENUS', JSON.stringify(menus));
        const BUTTON = result.data.menus.filter(menu => menu.type === 'BUTTON')
          .map(x => x.path);
        localStorage.setItem('BUTTONS', JSON.stringify(BUTTON));
        await this.$router.push('/');
        return;
      }
      this.form.disabled = false;
    }
  },
  methods: {
    login,
  },
  mounted() {
  },
  data() {
    return {
      autoLogin: false,
      form: {
        disabled: false,
        data: {
          loginName: null,
          password: null,
        },
        rule: {
          loginName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }],
        },
      },
    };
  },
};
</script>

<style scoped>
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
