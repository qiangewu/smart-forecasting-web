<template>
  <el-form ref="form" :model="form.data" :rules="form.rules">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="form.data.name"/>
    </el-form-item>
    <el-form-item label="编码" prop="code">
      <el-input
        v-model="form.data.code"/>
    </el-form-item>
    <el-form-item label="上层菜单" prop="parentId">
      <el-cascader
        :props="{ checkStrictly: true }"
        v-model="form.data.parentId"
        :options="menu.tree"/>
    </el-form-item>
    <el-form-item label="类别" prop="type">
      <el-radio v-model="form.data.type" label="MENU">菜单</el-radio>
      <el-radio v-model="form.data.type" label="BUTTON">按钮</el-radio>
    </el-form-item>
    <el-form-item label="菜单图标" prop="icon" v-if="form.data.type==='MENU'">
      <el-input v-model="form.data.icon"/>
    </el-form-item>
    <el-form-item label="前端路径" prop="path" v-if="form.data.type==='MENU'">
      <el-input
        v-model="form.data.path"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="!menuId" @click="onAdd">创建</el-button>
      <el-button type="primary" v-if="menuId" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _addMenu,
  _queryMenu,
  _queryMenus,
  _updateMenu,
} from '@/api/sysMenuApi';

function treeGenerator(x, data, ignoreId) {
  const children = data
    .filter(child => child.value !== ignoreId && child.parentId === x.value)
    .map(child => treeGenerator(child, data));
  return {
    ...x,
    children,
  };
}

function getTreeNodeParent(x, data) {
  if (!x) {
    return [];
  }
  const parent = data.filter(child => child.value === x);
  if (parent[0]) {
    return [...getTreeNodeParent(parent[0].parentId, data), x];
  }
  return [x];
}

async function getMenus() {
  const result = await _queryMenus({});
  if (result.code === 1200) {
    const menus = result.data.menus.filter(x => x.type === 'MENU').map(x => ({
      value: x.id,
      label: x.name,
      parentId: x.parentId,
    }));
    this.menu.data = menus;
    this.menu.tree = [
      {
        value: null,
        label: '根节点',
        children: menus
          .filter(x => !x.parentId && x.value !== this.menuId)
          .map(x => treeGenerator(x, menus, this.menuId)),
      },
    ];
  }
}

async function getMenu() {
  const result = await _queryMenu(this.menuId);
  if (result.code === 1200) {
    this.form.data.name = result.data.menu.name;
    this.form.data.icon = result.data.menu.icon;
    this.form.data.path = result.data.menu.path;
    this.form.data.type = result.data.menu.type;
    this.form.data.code = result.data.menu.code;
    this.form.data.parentId = [null, ...getTreeNodeParent(
      result.data.menu.parentId,
      this.menu.data,
    )];
  }
}

async function onAdd() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const result = await _addMenu({
        name: this.form.data.name,
        icon: this.form.data.icon,
        code: this.form.data.code,
        path: this.form.data.path,
        type: this.form.data.type,
        parentId: this.form.data.parentId.length > 0
          ? this.form.data.parentId[this.form.data.parentId.length - 1] : null,
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
      const result = await _updateMenu(this.menuId, {
        name: this.form.data.name,
        icon: this.form.data.icon,
        code: this.form.data.code,
        path: this.form.data.path,
        type: this.form.data.type,
        parentId: this.form.data.parentId.length > 0
          ? this.form.data.parentId[this.form.data.parentId.length - 1] : null,
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
  name: 'MenuEdit',
  props: {
    menuId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    menuId(val) {
      this.form.data = {
        name: '',
        parentId: [null],
        icon: '',
        path: '',
        type: 'MENU',
      };
      this.getMenus();
      if (val) {
        this.getMenu();
      }
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getMenu,
    getMenus,
  },
  data() {
    return {
      menu: {
        data: [],
        tree: [],
      },
      form: {
        data: {
          name: '',
          type: 'MENU',
          icon: '',
          code: '',
          path: '',
          parentId: [null],
        },
        rules: {
          name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
          parentId: [{ required: false, message: 'please choose parentId', trigger: 'blur' }],
        },
        disabled: false,
        title: '',
      },
    };
  },
  created() {
    this.getMenus();
    if (this.menuId) {
      this.getMenu();
    }
  },
};
</script>
