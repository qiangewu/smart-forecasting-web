<template>
  <el-form ref="form">
    <el-form-item label="字符编码">
      <el-input v-model="form.data.i18nCode"/>
    </el-form-item>
    <el-form-item
      :key="language.code"
      v-for="language in language.data"
      :label="language.name">
      <el-input v-model="language.value"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _queryLanguages,
} from '@/api/languageApi';
import {
  _queryI18NDetail,
  _updateI18NDetail,
} from '@/api/i18NDetailApi';

async function getI18NDetail() {
  if (this.i18nCode) {
    const result = await _queryI18NDetail(this.i18nCode);
    const map = new Map();
    console.log(result);
    result.data.i18NDetails.forEach(x => map.set(x.languageCode, x.value));
    this.language.data = this.language.data.map(x => ({
      ...x,
      value: map.get(x.code),
    }));
  }
}

async function onAdd() {
  console.log(this.language.data);
}

async function onUpdate() {
  console.log(this.language.data);
  const detail = this.language.data.map(x => ({
    languageCode: x.code,
    i18nCode: this.i18nCode,
    value: x.value,
  }));
  const result = await _updateI18NDetail(this.form.data.i18nCode, detail);
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
  name: 'I18NDetailEdit',
  props: {
    i18nCode: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getI18NDetail,
  },
  data() {
    return {
      head: {},
      form: {
        data: {
          i18nCode: this.i18nCode,
        },
      },
      language: {
        data: [],
      },
    };
  },
  async created() {
    const languageResult = await _queryLanguages({});
    this.language.data = languageResult.data.languages.filter(y => y.isActive !== 'NO')
      .map(x => ({
        ...x,
        value: '',
      }));
    this.getI18NDetail();
  },
};
</script>
