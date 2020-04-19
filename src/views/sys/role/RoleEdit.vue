<template>
  <el-form ref="form" :model="form.data" :rules="form.rules">
    <el-tabs v-model="tab">
      <el-tab-pane label="角色信息" name="roleInfo">
        <el-form-item label="角色" prop="name">
          <el-input v-model="form.data.name"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.data.description"/>
        </el-form-item>
        <el-form-item label="是否有效" prop="isActive">
          <el-radio v-model="form.data.isActive" label="YES">有效</el-radio>
          <el-radio v-model="form.data.isActive" label="NO">无效</el-radio>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="角色菜单" name="roleMenu">
        <el-tree
          ref="menuTree"
          default-expand-all
          check-strictly
          :default-checked-keys="form.data.menuIds"
          :props="{children: 'children',label: 'name'}"
          :data="menu.data"
          show-checkbox
          node-key="id">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <i class="fa fa-list " v-if="data.type==='MENU'"/>
            <i class="fa fa-hand-pointer-o" v-if="data.type==='BUTTON'"/>
            {{ node.label }}
          </div>
        </el-tree>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
      <el-button type="primary" v-if="!roleId" @click="onAdd">创建</el-button>
      <el-button type="primary" v-if="roleId" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _queryRole,
  _addRole,
  _updateRole,
} from '@/api/sysRoleApi';
import {
  _treeGenerator,
  _queryMenus,
} from '@/api/sysMenuApi';


async function getRole() {
  const result = await _queryRole(this.roleId);
  if (result.code === 1200) {
    this.form.data.name = result.data.role.name;
    this.form.data.description = result.data.role.description;
    this.form.data.isActive = result.data.role.isActive;
    this.form.data.menuIds = result.data.menus.map(x => x.menuId);
  }
}

async function onAdd() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const nodes = this.$refs.menuTree.getCheckedNodes();
      const result = await _addRole({
        name: this.form.data.name,
        description: this.form.data.description,
        isActive: this.form.data.isActive,
        menuIds: nodes.map(x => x.id),
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
      const nodes = this.$refs.menuTree.getCheckedNodes();
      const result = await _updateRole(this.roleId, {
        name: this.form.data.name,
        description: this.form.data.description,
        isActive: this.form.data.isActive,
        menuIds: nodes.map(x => x.id),
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
  name: 'RoleEdit',
  props: {
    roleId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    roleId(val) {
      if (val) {
        this.getRole();
      }
      this.form.data = {
        name: '',
        description: '',
        isActive: 'YES',
        menuIds: [],
      };
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getRole,
  },
  data() {
    return {
      tab: 'roleInfo',
      menu: {
        data: [],
      },
      form: {
        data: {
          name: '',
          description: '',
          isActive: 'YES',
          menuIds: [],
        },
        rules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          }],
          description: [{
            required: false,
            message: 'please input description',
            trigger: 'blur',
          }],
          isActive: [{
            required: false,
            message: 'please choose isActive',
            trigger: 'blur',
          }],
        },
        disabled: false,
        title: '',
      },
    };
  },
  async created() {
    this.tab = 'roleInfo';
    const menuResult = await _queryMenus();
    this.menu.data = menuResult.data.menus
      .filter(x => !x.parentId)
      .map(x => _treeGenerator(x, menuResult.data.menus));
    if (this.roleId) {
      this.getRole();
    }
  },
};
</script>
