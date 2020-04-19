<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap">
        <div>
        </div>
        <div>
          <el-button v-has="'USER_ADD'" type="primary" @click="addUser">
            {{$t('ADD')||'添加'}}
          </el-button>
        </div>
      </div>
      <el-table
        :data="table.data"
        style="width: 100%">
        <el-table-column
          prop="userNo"
          label="用户编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="账号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
          <template v-slot="scope">
            {{ $dict('SEX',scope.row.sex)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isActive"
          label="是否有效"
          width="180">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.isActive==='YES'">是</el-tag>
            <el-tag type="danger" v-if="scope.row.isActive==='NO'">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-has="'USER_EDIT'" @click="editUser(scope.row.id)">编辑
            </el-button>
            <el-button type="text" v-has="'USER_DELETE'" @click="deleteUser(scope.row.id)">删除
            </el-button>
          </template>
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
    <el-dialog
      @close="closeForm"
      :title="form.data.id?'用户编辑':'用户添加'"
      :visible.sync="form.visible">
      <user-edit
        v-if="form.visible"
        :user-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </user-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _queryUsers,
  _deleteUser,
  _asyncUsers,
} from '@/api/sysUserApi';
import UserEdit from './UserEdit.vue';

async function getUserList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryUsers({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  this.table.data = result.data.users;
  this.table.query.total = result.data.totalAmount;
}

function addUser() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editUser(userId) {
  this.form.data.id = userId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getUserList();
}

async function asyncUsers() {
  await _asyncUsers();
}

async function deleteUser(userId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const result = await _deleteUser(userId);
      if (result.code === 1200) {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.getUserList();
      }
    });
}


function handleSizeChange(val) {
  this.table.query.size = val;
  this.getUserList();
}

function handlePageChange(val) {
  this.table.query.page = val;
  this.getUserList();
}

export default {
  name: 'UserList',
  components: { UserEdit },
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
          prop: 'createAt',
          order: 'descending',
        },
      },
    };
  },
  methods: {
    getUserList,
    deleteUser,
    editUser,
    addUser,
    closeForm,
    handlePageChange,
    handleSizeChange,
    asyncUsers,
  },
  created() {
    this.getUserList();
  },
};
</script>

<style scoped>

</style>
