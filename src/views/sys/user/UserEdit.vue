<template>
  <el-form ref="form" :model="form.data" :rules="form.rules" label-width="80px">
    <el-tabs v-model="tab">
      <el-tab-pane label="用户信息" name="userInfo">
        <el-form-item label="账号" prop="loginName">
          <el-input v-model="form.data.loginName"/>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="form.data.userName"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <!--          <dict-select dict-code="SEX" v-model="form.data.sex"/>-->
          <dict-radio dict-code="SEX" v-model="form.data.sex"/>
        </el-form-item>
        <el-form-item label="是否有效" prop="isActive">
          <el-radio v-model="form.data.isActive" label="YES">有效</el-radio>
          <el-radio v-model="form.data.isActive" label="NO">无效</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.data.email"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="用户角色" name="roleInfo">
        <el-checkbox-group v-model="form.data.roleIds">
          <el-form-item :key="item.id" v-for="item in role.data">
            <el-checkbox :label="item.id">
              {{item.name}}
            </el-checkbox>
          </el-form-item>
        </el-checkbox-group>
      </el-tab-pane>
      <el-tab-pane label="用户组织" name="userOrganization">
        <el-tree
          ref="organizationTree"
          default-expand-all
          :default-checked-keys="form.data.organizationIds"
          :props="{children: 'children',label: 'name'}"
          :data="role.organization"
          show-checkbox
          node-key="id">
        </el-tree>
      </el-tab-pane>
    </el-tabs>
    <div style="text-align: right">
      <el-button
        type="primary"
        v-if="!userId" @click="onAdd" :disabled="form.disabled">
        创建
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button
        type="primary"
        v-if="userId" @click="onUpdate" :disabled="form.disabled">更新
        <i class="el-icon-loading el-icon--right" v-if="form.disabled"/>
      </el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {
  _queryUser,
  _addUser,
  _updateUser,
} from '@/api/sysUserApi';
import { _queryRoles } from '@/api/sysRoleApi';
import {
  _treeGenerator,
} from '@/api/sysMenuApi';
import {
  _queryOrganizations,
} from '@/api/sysOrganizationApi';
import DictRadio from '../../../components/DictRadio.vue';

async function getUser() {
  const result = await _queryUser(this.userId);
  if (result.code === 1200) {
    this.form.data.loginName = result.data.user.loginName;
    this.form.data.userName = result.data.user.userName;
    this.form.data.isActive = result.data.user.isActive;
    this.form.data.sex = result.data.user.sex;
    this.form.data.email = result.data.user.email;
    this.form.data.roleIds = result.data.roles.map(x => x.roleId);
    this.form.data.organizationIds = result.data.organizations.map(x => x.organizationId);
  }
}

async function onAdd() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const nodes = this.$refs.organizationTree.getCheckedNodes();
      const result = await _addUser({
        loginName: this.form.data.loginName,
        userName: this.form.data.userName,
        isActive: this.form.data.isActive,
        sex: this.form.data.sex,
        email: this.form.data.email,
        roleIds: this.form.data.roleIds,
        organizationIds: nodes.map(x => x.id),
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
      this.form.disabled = false;
    } else {
      this.form.disabled = false;
    }
  });
}

async function onUpdate() {
  this.form.disabled = true;
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      const nodes = this.$refs.organizationTree.getCheckedNodes();
      const result = await _updateUser(this.userId, this.organizationId, {
        loginName: this.form.data.loginName,
        userName: this.form.data.userName,
        isActive: this.form.data.isActive,
        sex: this.form.data.sex,
        email: this.form.data.email,
        roleIds: this.form.data.roleIds,
        organizationIds: nodes.map(x => x.id),
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
  name: 'UserEdit',
  components: {
    DictRadio,
  },
  props: {
    userId: String,
    onSubmitHandler: Function,
    onCancelHandler: Function,
  },
  watch: {
    userId(val) {
      if (val) {
        this.getUser();
      }
      this.form.data = {
        loginName: '',
        userName: '',
        sex: '',
        isActive: 'YES',
        email: '',
        roleIds: [],
        organizationIds: [],
      };
    },
  },
  methods: {
    onAdd,
    onUpdate,
    onCancel,
    getUser,
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if ((/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(value) === false) {
          callback(new Error('请输入正确的邮箱格式'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      tab: 'userInfo',
      role: {
        data: [],
      },
      form: {
        data: {
          loginName: '',
          userName: '',
          isActive: 'YES',
          email: '',
          sex: '',
          roleIds: [],
          organizationIds: [],
        },
        rules: {
          loginName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          }],
          userName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          }],
          isActive: [{
            required: false,
            message: 'please choose isActive',
            trigger: 'blur',
          }],
          email: [
            {
              required: false,
              message: 'please input email',
              trigger: 'blur',
            }, {
              validator: validateEmail,
              trigger: 'blur',
            }],
        },
        disabled: false,
        title: '',
      },
    };
  },
  async created() {
    this.tab = 'userInfo';
    const result = await _queryRoles({});
    this.role.data = result.data.roles;
    this.role.data = result.data.roles;
    const roleResult = await _queryOrganizations({});
    this.role.organization = roleResult.data.organizations
      .filter(x => !x.parentId)
      .map(x => _treeGenerator(x, roleResult.data.organizations));
    if (this.userId) {
      this.getUser();
    }
  },
};
</script>
