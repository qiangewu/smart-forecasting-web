<template>
  <div>
    <div class="page-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <div>
        </div>
        <el-button v-has="'ORGANIZATION_ADD'" type="primary" @click="addOrganization">
          添加
        </el-button>
      </div>
      <el-table
        style="width: 100%"
        default-expand-all
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :data="table.data">
        <el-table-column
          prop="name"
          label="组织名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateUser"
          label="更新人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="updateAt"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-has="'ORGANIZATION_EDIT'"
              @click="editOrganization(scope.row.id)">编辑
            </el-button>
            <el-button
              type="text"
              v-has="'ORGANIZATION_DELETE'"
              @click="deleteOrganization(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      @close="closeForm"
      :visible.sync="form.visible">
      <organization-edit
        v-if="form.visible"
        :organization-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </organization-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _deleteOrganization,
  _queryOrganizations,
} from '@/api/sysOrganizationApi';
import OrganizationEdit from './OrganizationEdit.vue';

function treeGenerator(x, data) {
  const children = data
    .filter(child => child.parentId === x.id)
    .map(child => treeGenerator(child, data));
  return {
    ...x,
    children,
  };
}

async function getOrganizationList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryOrganizations({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  const { organizations } = result.data;
  this.table.data = organizations
    .filter(x => !x.parentId)
    .map(x => treeGenerator(x, organizations));
}

function addOrganization() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editOrganization(organizationId) {
  this.form.data.id = organizationId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getOrganizationList();
}

async function deleteOrganization(organizationId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteOrganization(organizationId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getOrganizationList();
    }
  });
}

export default {
  name: 'OrganizationList',
  components: { OrganizationEdit },
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
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
          prop: 'name',
          order: 'ascending',
        },
      },
    };
  },
  methods: {
    getOrganizationList,
    deleteOrganization,
    editOrganization,
    addOrganization,
    closeForm,
  },
  created() {
    this.getOrganizationList();
  },
};
</script>

<style scoped>

</style>
