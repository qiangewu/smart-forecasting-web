<template>
  <el-form ref="form" :model="form.data">
    <el-form-item label="编码">
      <el-input v-model="form.data.code"/>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="form.data.name"/>
    </el-form-item>
    <el-form-item label="详情">
      <el-input v-model="form.data.detail"/>
    </el-form-item>
    <div style="text-align: right">
      <el-button
        type="primary"
        v-if="!sysDictDataId" @click="onAdd" :disabled="form.disabled">
        创建
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button
        type="primary"
        v-if="sysDictDataId" @click="onUpdate" :disabled="form.disabled">更新
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  _querySysDictDataById,
  _addSysDictData,
  _updateSysDictData,
} from '@/api/sysDictDataApi';

async function getSysDictData() {
  const result = await _querySysDictDataById(this.sysDictId, this.sysDictDataId);
  if (result.code === 1200) {
    this.form.data.code = result.data.sysDictData.code;
    this.form.data.name = result.data.sysDictData.name;
    this.form.data.detail = result.data.sysDictData.detail;
    this.form.data.sysDictId = result.data.sysDictData.sysDictId;
  }
}

async function onAdd() {
  const result = await _addSysDictData(
    this.sysDictId,
    {
      code: this.form.data.code,
      name: this.form.data.name,
      detail: this.form.data.detail,
    },
  );
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
  const result = await _updateSysDictData(
    this.sysDictId,
    this.sysDictDataId,
    {
      code: this.form.data.code,
      name: this.form.data.name,
      detail: this.form.data.detail,
    },
  );
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
  name: 'SysDictDataEdit',
  props: {
    sysDictId: String,
    sysDictDataId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    sysDictDataId() {
      if (this.sysDictDataId) {
        this.getSysDictData();
      }
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getSysDictData,
  },
  data() {
    return {
      form: {
        data: {
          code: '',
          name: '',
          detail: '',
        },
        title: '',
      },
    };
  },
  created() {
    if (this.sysDictDataId) {
      this.getSysDictData();
    }
  },
};
</script>
