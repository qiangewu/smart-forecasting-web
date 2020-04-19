<template>
  <el-form ref="form" :model="form.data">
    <el-form-item label="编码">
      <el-input v-model="form.data.code"/>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="form.data.name"/>
    </el-form-item>
    <div style="text-align: right">
      <el-button
        type="primary"
        v-if="!sysCodingRuleId" @click="onAdd" :disabled="form.disabled">
        创建
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button
        type="primary"
        v-if="sysCodingRuleId" @click="onUpdate" :disabled="form.disabled">更新
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  _querySysCodingRule,
  _addSysCodingRule,
  _updateSysCodingRule,
} from '@/api/sysCodingRuleApi';

async function getSysCodingRule() {
  const result = await _querySysCodingRule(this.sysCodingRuleId);
  if (result.code === 1200) {
    this.form.data.code = result.data.sysCodingRule.code;
    this.form.data.name = result.data.sysCodingRule.name;
    this.form.data.review = result.data.sysCodingRule.review;
  }
}

async function onAdd() {
  const result = await _addSysCodingRule({
    code: this.form.data.code,
    name: this.form.data.name,
    review: this.form.data.review,
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
  const result = await _updateSysCodingRule(this.sysCodingRuleId, {
    code: this.form.data.code,
    name: this.form.data.name,
    review: this.form.data.review,
  });
  if (result.code === 1200) {
    if (this.onSubmitHandler) {
      this.$message({
        message: '更新成功',
        type: 'success',
      });
      this.onSubmitHandler();
    }
  }
}

function onCancel() {
  if (this.onCancelHandler) {
    this.onCancelHandler();
  }
}

export default {
  name: 'SysCodingRuleEdit',
  props: {
    sysCodingRuleId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    sysCodingRuleId() {
      if (this.sysCodingRuleId) {
        this.getSysCodingRule();
      }
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getSysCodingRule,
  },
  data() {
    return {
      form: {
        data: {
          code: '',
          name: '',
          review: '',
        },
        title: '',
      },
    };
  },
  created() {
    if (this.sysCodingRuleId) {
      this.getSysCodingRule();
    }
  },
};
</script>
