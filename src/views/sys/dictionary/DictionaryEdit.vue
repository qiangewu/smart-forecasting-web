<template>
  <el-form ref="form" :model="form.data" :rules="form.rules">
    <el-form-item label="字典名称" prop="name">
      <el-input v-model="form.data.name"/>
    </el-form-item>
    <el-form-item label="字典编码" prop="code">
      <el-input v-model="form.data.code"/>
    </el-form-item>
    <el-form-item label="是否有效" prop="isActive">
      <el-radio v-model="form.data.isActive" label="YES">有效</el-radio>
      <el-radio v-model="form.data.isActive" label="NO">无效</el-radio>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        type="textarea"
        autosize
        v-model="form.data.remark">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="!dictionaryId" @click="onAdd">创建</el-button>
      <el-button type="primary" v-if="dictionaryId" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _addDictionary,
  _queryDictionary,
  _queryAllDictionaries,
  _updateDictionary,
} from '@/api/sysDictionaryApi';

async function getDictionary() {
  const result = await _queryDictionary(this.dictionaryId);
  if (result.code === 1200) {
    this.form.data.name = result.data.sysDictionary.name;
    this.form.data.code = result.data.sysDictionary.code;
    this.form.data.isActive = result.data.sysDictionary.isActive;
    this.form.data.remark = result.data.sysDictionary.remark;
  }
}

async function onAdd() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const result = await _addDictionary({
        name: this.form.data.name,
        code: this.form.data.code,
        isActive: this.form.data.isActive,
        remark: this.form.data.remark,
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
    } else {
      this.form.disabled = false;
    }
  });
}

async function onUpdate() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const result = await _updateDictionary(this.dictionaryId, {
        name: this.form.data.name,
        code: this.form.data.code,
        isActive: this.form.data.isActive,
        remark: this.form.data.remark,
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
    } else {
      this.form.disabled = false;
    }
  });
}

function onCancel() {
  if (this.onCancelHandler) {
    this.onCancelHandler();
  }
}

export default {
  name: 'DictionaryEdit',
  props: {
    dictionaryId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    dictionaryId(val) {
      if (val) {
        this.getDictionary();
      }
      this.form.data = {
        name: '',
        code: '',
        isActive: 'YES',
        remark: '',
      };
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getDictionary,
  },
  data() {
    const checkCode = async (rule, value, callback) => {
      const result = await _queryAllDictionaries({ code: value });
      const { sysDictionaries } = result.data;
      if (sysDictionaries.length > 0 && sysDictionaries[0].id !== this.dictionaryId) {
        callback(new Error('编码已存在'));
      }
    };
    return {
      dictionary: {
        data: [],
        tree: [],
      },
      form: {
        data: {
          name: '',
          code: '',
          isActive: '',
          remark: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入字典名称',
            trigger: 'blur',
          }],
          code: [{
            required: true,
            message: '请输入字典编码',
            trigger: 'blur',
          }, {
            validator: checkCode,
            trigger: 'blur',
          }],
        },
        disabled: false,
        title: '',
      },
    };
  },
  created() {
    if (this.dictionaryId) {
      this.getDictionary();
    }
  },
};
</script>
