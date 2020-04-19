<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>语言管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <div></div>
        <el-button type="primary" @click="addI18NDetail">
          添加
        </el-button>
      </div>
      <el-table
        :data="table.data"
        v-loading="table.loading"
        style="width: 100%">
        <el-table-column
          prop="i18nCode"
          label="字符编码">
        </el-table-column>
        <el-table-column
          :key="item.id"
          v-for="(item) in language.data"
          :label="item.name">
          <template slot="header">
            <span :class="item.icon"></span> {{item.name}}
          </template>
          <template v-slot="scope">
            {{scope.row[item.code]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editI18NDetail(scope.row.i18nCode)">编辑
            </el-button>
            <el-button type="text" @click="deleteI18NDetail(scope.row.i18nCode)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="form.visible">
      <i18NDetail-edit
        v-if="form.visible"
        :i18n-code="form.data.i18nCode"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </i18NDetail-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _queryI18NDetails,
  _deleteI18NDetail,
} from '@/api/i18NDetailApi';
import {
  _queryLanguages,
} from '@/api/languageApi';
import I18NDetailEdit from './I18NDetailEdit.vue';

async function getLanguages() {
  this.table.loading = true;
  const languageResult = await _queryLanguages({});
  this.language.data = languageResult.data.languages.filter(x => x.isActive === 'YES');
  this.table.loading = false;
}

async function getI18NDetailList() {
  this.table.loading = true;
  const result = await _queryI18NDetails({});
  const resultData = result.data.i18NDetails;
  const i18nMap = new Map();
  resultData.forEach((x) => {
    if (!i18nMap.has(x.i18nCode)) {
      i18nMap.set(x.i18nCode, { i18nCode: x.i18nCode });
    }
    i18nMap.get(x.i18nCode)[x.languageCode] = x.value;
  });
  this.table.data = [...i18nMap.values()];
  this.table.loading = false;
}

function addI18NDetail() {
  this.form.data.i18nCode = null;
  this.form.visible = true;
}

function editI18NDetail(code) {
  this.form.data.i18nCode = code;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.i18nCode = null;
  this.form.visible = false;
  this.getI18NDetailList();
}

async function deleteI18NDetail(i18nCode) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const result = await _deleteI18NDetail(i18nCode);
      if (result.code === 1200) {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.getI18NDetailList();
      }
    });
}

export default {
  name: 'I18NDetailList',
  components: { I18NDetailEdit },
  data() {
    return {
      form: {
        data: {
          id: null,
          i18nCode: null,
        },
        visible: false,
      },
      language: {
        data: [],
      },
      table: {
        loading: false,
        head: {},
        data: [],
        query: {
          page: 1,
          size: 100,
          total: 0,
        },
        sort: {
          prop: 'updateAt',
          order: 'descending',
        },
      },
    };
  },
  methods: {
    getI18NDetailList,
    deleteI18NDetail,
    editI18NDetail,
    addI18NDetail,
    closeForm,
    getLanguages,
  },
  created() {
    this.getLanguages();
    this.getI18NDetailList();
  },
};
</script>

<style scoped>

</style>
