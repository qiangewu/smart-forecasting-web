<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <div>
        </div>
        <el-button v-has="'MENU_ADD'" type="primary" @click="addMenu">
          添加
        </el-button>
      </div>
      <el-table
        style="width: 100%"
        :default-expand-all="false"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :data="table.data">
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="分类"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type==='BUTTON'" type="success">按钮</el-tag>
            <el-tag v-if="scope.row.type==='MENU'" type="info">菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="图标"
          width="100">
          <template v-slot="scope">
            <i :class="scope.row.icon"/>
          </template>
        </el-table-column>
        <el-table-column
          label="编码"
          prop="code"
          width="100">
        </el-table-column>
        <el-table-column
          prop="path"
          label="前端路径">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <div class="table-operation-wrap">
              <el-button v-has="'MENU_EDIT'" type="text" @click="editMenu(scope.row.id)">编辑
              </el-button>
              <el-button v-has="'MENU_DELETE'" type="text" @click="deleteMenu(scope.row.id)">删除
              </el-button>
              <el-button v-has="'MENU_UP'" type="text" @click="upMenu(scope.row.id)">上移
              </el-button>
              <el-button v-has="'MENU_DOWN'" type="text" @click="downMenu(scope.row.id)">下移
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      @close="closeForm"
      :visible.sync="form.visible">
      <menu-edit
        v-if="form.visible"
        :menu-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </menu-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _deleteMenu,
  _downMenu,
  _queryMenus,
  _upMenu,
} from '@/api/sysMenuApi';
import MenuEdit from './MenuEdit.vue';

function treeGenerator(x, data) {
  const children = data
    .filter(child => child.parentId === x.id)
    .map(child => treeGenerator(child, data));
  return {
    ...x,
    children,
  };
}

async function getMenuList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryMenus({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
    date: this.table.query.date,
  });
  const { menus } = result.data;
  this.table.data = menus
    .filter(x => !x.parentId)
    .map(x => treeGenerator(x, menus));
}

function addMenu() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editMenu(menuId) {
  this.form.data.id = menuId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getMenuList();
}

async function deleteMenu(menuId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteMenu(menuId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getMenuList();
    }
  });
}

async function upMenu(menuId) {
  this.$confirm('是否上移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _upMenu(menuId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '上移成功!',
      });
      this.getMenuList();
    }
  });
}

async function downMenu(menuId) {
  this.$confirm('是否下移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _downMenu(menuId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '下移成功!',
      });
      this.getMenuList();
    }
  });
}

export default {
  name: 'MenuList',
  components: { MenuEdit },
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
          prop: 'sort',
          order: 'ascending',
        },
      },
    };
  },
  methods: {
    getMenuList,
    deleteMenu,
    editMenu,
    addMenu,
    closeForm,
    upMenu,
    downMenu,
  },
  created() {
    this.getMenuList();
  },
};
</script>

<style scoped>

</style>
