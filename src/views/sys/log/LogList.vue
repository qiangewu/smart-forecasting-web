<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <el-form :inline="true" :model="searchForm.data" class="demo-form-inline">
          <el-form-item label="日志时间">
            <el-date-picker
              v-model="searchForm.data.timeScope"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="事件">
            <el-input v-model="searchForm.data.event" clearable/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain icon="el-icon-search"
                       @click="getLogList">查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="table.data"
        :default-sort="table.sort"
        height="500"
        style="width: 100%">
        <el-table-column
          prop="createUser.userName"
          label="人员"
          width="180">
        </el-table-column>
        <el-table-column
          prop="event"
          label="事件">
        </el-table-column>
        <el-table-column
          prop="url"
          sortable
          label="请求地址">
        </el-table-column>
        <el-table-column
          prop="description"
          label="数据">
          <template v-slot="scope">
            <span
              class="diff_object"
              :key="scope.row.id+node" v-for="(val,node) in scope.row.description">
              {{node}}:{{val.oldValue?`${val.oldValue} -> `:''}}{{val.currentValue}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createAt"
          sortable
          label="时间">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="this.table.query.page"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="this.table.query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.table.query.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {
  _queryLogs,
  _deleteLog,
} from '@/api/sysLogApi';

async function getLogList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const timeScope = this.searchForm.data.timeScope && this.searchForm.data.timeScope.length === 2
    ? this.searchForm.data.timeScope : [null, null];
  const result = await _queryLogs({
    page: this.table.query.page,
    startAt: timeScope[0] ? moment(timeScope[0]).format('YYYY-MM-DD HH:mm:ss') : null,
    endAt: timeScope[1] ? moment(timeScope[1]).format('YYYY-MM-DD HH:mm:ss') : null,
    event: this.searchForm.data.event,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  this.table.data = result.data.logs.map(x => ({
    id: x.id,
    createUser: x.createUser,
    event: x.event,
    url: x.url,
    description: JSON.parse(x.description),
    createAt: x.createAt,
  }));
  this.table.query.total = result.data.totalAmount;
}

function addLog() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editLog(logId) {
  this.form.data.id = logId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getLogList();
}

async function deleteLog(logId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteLog(logId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getLogList();
    }
  });
}

function handleSizeChange(val) {
  console.log(`每页 ${val} 条`);
  this.table.query.size = val;
  this.getLogList();
}

function handlePageChange(val) {
  this.table.query.page = val;
  this.getLogList();
}

export default {
  name: 'LogList',
  components: {},
  data() {
    return {
      form: {
        data: {
          id: null,
        },
        visible: false,
      },
      searchForm: {
        data: {
          timeScope: [],
          event: '',
        },
      },
      table: {
        start: '',
        end: '',
        data: [],
        query: {
          page: 1,
          size: 100,
          total: 0,
        },
        sort: {
          prop: 'createAt',
          order: 'descending',
        },
      },
    };
  },
  methods: {
    getLogList,
    deleteLog,
    editLog,
    addLog,
    closeForm,
    handlePageChange,
    handleSizeChange,
  },
  created() {
    this.getLogList();
  },
};
</script>

<style scoped>
  .diff_object {
    margin: 0 3px;
    padding: 0 3px;
    color: #171616;
    border-right: 1px solid #c5c5c5;
  }

  .diff_object:last-child {
    border-right: unset;
  }
</style>
