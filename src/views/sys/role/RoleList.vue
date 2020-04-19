<template>
  <div>
    <div class="page-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
<!--        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="operation-wrap">
        <div>
        </div>
        <el-button v-has="'ROLE_ADD'" type="primary" @click="addRole">
          添加
        </el-button>
      </div>
      <el-table
        :data="table.data"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="角色"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
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
            <el-button type="text" v-has="'ROLE_EDIT'" @click="editRole(scope.row.id)">编辑
            </el-button>
            <el-button type="text" v-has="'ROLE_DELETE'" @click="deleteRole(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      @close="closeForm"
      :visible.sync="form.visible">
      <role-edit
        v-if="form.visible"
        :role-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </role-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _queryRoles,
  _deleteRole,
} from '@/api/sysRoleApi';
import RoleEdit from './RoleEdit.vue';

async function getRoleList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryRoles({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  this.table.data = result.data.roles;
}

function addRole() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editRole(roleId) {
  this.form.data.id = roleId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getRoleList();
}

async function deleteRole(roleId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteRole(roleId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getRoleList();
    }
  });
}

export default {
  name: 'RoleList',
  components: { RoleEdit },
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
    getRoleList,
    deleteRole,
    editRole,
    addRole,
    closeForm,
  },
  created() {
    this.getRoleList();
  },
};
</script>

<style scoped>

</style>
