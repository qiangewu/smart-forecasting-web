<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="form.data.loginName"/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.data.logName"/>
    </el-form-item>
    <el-form-item label="是否有效">
      <el-radio v-model="form.data.isActive" label="YES">有效</el-radio>
      <el-radio v-model="form.data.isActive" label="NO">无效</el-radio>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.data.email"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="!logId" @click="onAdd">创建</el-button>
      <el-button type="primary" v-if="logId" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _queryLog,
  _addLog,
  _updateLog,
} from '@/api/sysLogApi';

async function getLog() {
  const result = await _queryLog(this.logId);
  if (result.code === 1200) {
    this.form.data.loginName = result.data.log.loginName;
    this.form.data.logName = result.data.log.logName;
    this.form.data.isActive = result.data.log.isActive;
    this.form.data.email = result.data.log.email;
  }
}

async function onAdd() {
  const result = await _addLog({
    loginName: this.form.data.loginName,
    logName: this.form.data.logName,
    isActive: this.form.data.isActive,
    email: this.form.data.email,
  });
  if (result.code === 1200) {
    if (this.onSubmitHandler) {
      this.$message({
        message: '添加成功',
        type: 'success',
      });
      this.onSubmitHandler();
    }
  }
}

async function onUpdate() {
  const result = await _updateLog(this.logId, {
    loginName: this.form.data.loginName,
    logName: this.form.data.logName,
    isActive: this.form.data.isActive,
    email: this.form.data.email,
  });
  if (result.code === 1200) {
    if (this.onSubmitHandler) {
      this.$message({
        message: '更新成功',
        type: 'success',
      });
      if (this.onSubmitHandler) {
        this.onSubmitHandler();
      }
    }
  }
}

function onCancel() {
  if (this.onCancelHandler) {
    this.onCancelHandler();
  }
}

export default {
  name: 'LogEdit',
  props: {
    logId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    logId(val) {
      if (val) {
        this.getLog();
      }
      this.form.data = {
        loginName: '',
        logName: '',
        isActive: 'YES',
        email: '',
      };
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getLog,
  },
  data() {
    return {
      form: {
        data: {
          loginName: '',
          logName: '',
          isActive: 'YES',
          email: '',
        },
        title: '',
      },
    };
  },
  created() {
    if (this.logId) {
      this.getLog();
    }
  },
};
</script>
