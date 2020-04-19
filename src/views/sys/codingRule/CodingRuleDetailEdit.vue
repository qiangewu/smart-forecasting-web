<template>
  <el-form ref="form" :model="form.data">
    <el-form-item label="类型">
      <el-select v-model="form.data.type" placeholder="请选择">
        <el-option label="固定文本" value="TEXT"></el-option>
        <el-option label="日期类型" value="DATETIME"></el-option>
        <el-option label="自动增长" value="AUTO"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文本内容" v-if="form.data.type === 'TEXT'">
      <el-input v-model="form.data.node"/>
    </el-form-item>
    <el-form-item label="日期格式" v-if="form.data.type === 'DATETIME'">
      <el-select v-model="form.data.node" placeholder="请选择">
        <el-option label="年" value="yyyy">
          <span style="float: left">年</span>
          <span style="float: right; color: #8492a6; font-size: 13px">2019</span>
        </el-option>
        <el-option label="月" value="MM">
          <span style="float: left">月</span>
          <span style="float: right; color: #8492a6; font-size: 13px">03</span>
        </el-option>
        <el-option label="日" value="dd">
          <span style="float: left">日</span>
          <span style="float: right; color: #8492a6; font-size: 13px">07</span>
        </el-option>
        <el-option label="年月" value="yyyyMM">
          <span style="float: left">年月</span>
          <span style="float: right; color: #8492a6; font-size: 13px">201903</span>
        </el-option>
        <el-option label="年月日" value="yyyyMMdd">
          <span style="float: left">年月日</span>
          <span style="float: right; color: #8492a6; font-size: 13px">20190307</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="重复周期" v-if="form.data.type === 'AUTO'">
      <el-select v-model="form.data.cycle" placeholder="请选择">
        <el-option label="不重置" value="NONE"></el-option>
        <el-option label="每日重置" value="DAY"></el-option>
        <el-option label="每周重置" value="WEEK"></el-option>
        <el-option label="每月重置" value="MONTH"></el-option>
        <el-option label="每年重置" value="YEAR"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="步长" v-if="form.data.type === 'AUTO'">
      <el-input-number v-model="form.data.step"/>
    </el-form-item>
    <el-form-item label="长度" v-if="form.data.type === 'AUTO'">
      <el-input-number v-model="form.data.length"/>
    </el-form-item>
    <el-form-item label="当前值" v-if="form.data.type === 'AUTO'">
      <el-input v-model="form.data.currentValue"/>
    </el-form-item>
    <div style="text-align: right">
      <el-button
        type="primary"
        v-if="!sysCodingRuleDetailId" @click="onAdd" :disabled="form.disabled">
        创建
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button
        type="primary"
        v-if="sysCodingRuleDetailId" @click="onUpdate" :disabled="form.disabled">更新
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  _querySysCodingRuleDetail,
  _addSysCodingRuleDetail,
  _updateSysCodingRuleDetail,
} from '@/api/sysCodingRuleDetailApi';

async function getSysCodingRuleDetail() {
  const result = await _querySysCodingRuleDetail(this.codingRuleId, this.sysCodingRuleDetailId);
  if (result.code === 1200) {
    this.form.data.type = result.data.sysCodingRuleDetail.type;
    this.form.data.node = result.data.sysCodingRuleDetail.node;
    this.form.data.sysCodingRuleId = result.data.sysCodingRuleDetail.sysCodingRuleId;
    this.form.data.cycle = result.data.sysCodingRuleDetail.cycle;
    this.form.data.currentValue = result.data.sysCodingRuleDetail.currentValue;
    this.form.data.step = result.data.sysCodingRuleDetail.step;
    this.form.data.length = result.data.sysCodingRuleDetail.length;
  }
}

async function onAdd() {
  const result = await _addSysCodingRuleDetail(this.codingRuleId, {
    type: this.form.data.type,
    node: this.form.data.node,
    cycle: this.form.data.cycle,
    currentValue: this.form.data.currentValue,
    step: this.form.data.step,
    length: this.form.data.length,
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
  const result = await _updateSysCodingRuleDetail(this.codingRuleId, this.sysCodingRuleDetailId, {
    type: this.form.data.type,
    node: this.form.data.node,
    sysCodingRuleId: this.form.data.sysCodingRuleId,
    cycle: this.form.data.cycle,
    currentValue: this.form.data.currentValue,
    step: this.form.data.step,
    length: this.form.data.length,
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
  name: 'SysCodingRuleDetailEdit',
  props: {
    sysCodingRuleDetailId: String,
    codingRuleId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    sysCodingRuleDetailId() {
      if (this.sysCodingRuleDetailId) {
        this.getSysCodingRuleDetail();
      }
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getSysCodingRuleDetail,
  },
  data() {
    return {
      form: {
        data: {
          type: 'AUTO',
          node: '',
          cycle: 'NONE',
          currentValue: '',
          step: 1,
          length: 5,
        },
        title: '',
      },
    };
  },
  created() {
    if (this.sysCodingRuleDetailId) {
      this.getSysCodingRuleDetail();
    }
  },
};
</script>
