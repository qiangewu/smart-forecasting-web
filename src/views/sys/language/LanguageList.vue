<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item>语言管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
      </div>
      <el-table
        :data="table.data"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="语言">
        </el-table-column>
        <el-table-column
          prop="code"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="isActive"
          label="是否有效">
          <template slot-scope="scope">
            <el-switch
              @change="editIsActive(scope.row.id,scope.row.isActive)"
              v-model="scope.row.isActive"
              active-value="YES"
              inactive-value="NO">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图标"
          width="180">
          <template v-slot="scope">
            <span :class="scope.row.icon"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  _queryLanguages,
  _updateLanguage,
} from '@/api/languageApi';

async function getLanguageList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryLanguages({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  this.table.data = result.data.languages;
}

function editIsActive(languageId, isActive) {
  const result = _updateLanguage(languageId, {
    isActive,
  });
  if (result.code === 1200) {
    this.$message({
      message: '更新成功',
      type: 'success',
    });
  }
}

export default {
  name: 'LanguageList',
  data() {
    return {
      form: {
        data: {
          id: null,
        },
        visible: false,
      },
      table: {
        data: [],
        query: {
          page: 1,
          size: 100,
          total: 0,
        },
        sort: {
          order: 'descending',
        },
      },
    };
  },
  methods: {
    getLanguageList,
    editIsActive,
  },
  created() {
    this.getLanguageList();
  },
};
</script>

<style scoped>
  .flag-icon {
    height: 20px;
    width: 27px;
  }
</style>
