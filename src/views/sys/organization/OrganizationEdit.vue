<template>
  <el-form ref="form" :model="form.data" :rules="form.rules">
    <el-form-item label="组织名称" prop="name">
      <el-input v-model="form.data.name"/>
    </el-form-item>
    <el-form-item label="上层组织" prop="parentId">
      <el-cascader
        :props="{ checkStrictly: true }"
        v-model="form.data.parentId"
        :options="organization.tree"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-if="!organizationId" @click="onAdd">创建</el-button>
      <el-button type="primary" v-if="organizationId" @click="onUpdate">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  _addOrganization,
  _queryOrganization,
  _queryOrganizations,
  _updateOrganization,
} from '@/api/sysOrganizationApi';

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


async function getOrganizations() {
  const result = await _queryOrganizations({});
  if (result.code === 1200) {
    const organizations = result.data.organizations.map(x => ({
      value: x.id,
      label: x.name,
      parentId: x.parentId,
    }));
    this.organization.data = organizations;
    this.organization.tree = [
      {
        value: null,
        label: '根节点',
        children: organizations
          .filter(x => !x.parentId && x.value !== this.organizationId)
          .map(x => treeGenerator(x, organizations, this.organizationId)),
      },
    ];
  }
}

async function getOrganization() {
  this.getOrganizations();
  const result = await _queryOrganization(this.organizationId);
  if (result.code === 1200) {
    this.form.data.name = result.data.organization.name;
    this.form.data.parentId = [null, ...getTreeNodeParent(
      result.data.organization.parentId,
      this.organization.data,
    )];
  }
}

async function onAdd() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const result = await _addOrganization({
        name: this.form.data.name,
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
      const result = await _updateOrganization(this.organizationId, {
        name: this.form.data.name,
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
  name: 'OrganizationEdit',
  props: {
    organizationId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    organizationId(val) {
      this.getOrganizations();
      this.form.data = {
        name: '',
        parentId: [null],
      };
      if (val) {
        this.getOrganization();
      }
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getOrganization,
    getOrganizations,
  },
  data() {
    return {
      organization: {
        data: [],
        tree: [],
      },
      form: {
        data: {
          name: '',
          parentId: [null],
        },
        rules: {
          name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
          parentId: [{ required: false, message: 'please choose parentId', trigger: 'blur' }],
        },
        disabled: false,
        title: '',
      },
    };
  },
  created() {
    this.getOrganizations();
    if (this.organizationId) {
      this.getOrganization();
    }
  },
};
</script>
