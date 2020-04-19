<template>
  <div>
    <div>
      <div class="page-title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>编码规则</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <div></div>
        <el-button type="primary" @click="addSysCodingRule">
          添加
        </el-button>
      </div>
      <el-table
        :data="table.data"
        style="width: 100%">
        <el-table-column
          prop="code"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="review"
          label="预览">
          <template slot-scope="scope">
            <el-tag
              :key="detail.id"
              :class="detail.type"
              v-for="detail in scope.row.details">
              {{detail.review}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editSysCodingRule(scope.row.id)">编辑
            </el-button>
            <el-button type="text" @click="editSysCodingRuleDetail(scope.row.id)">规则
            </el-button>
            <el-button type="text" @click="deleteSysCodingRule(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="form.visible">
      <sysCodingRule-edit
        v-if="form.visible"
        :sys-coding-rule-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </sysCodingRule-edit>
    </el-dialog>
    <el-drawer
      :visible.sync="detailForm.visible"
      @close="getSysCodingRuleList"
      :with-header="false">
      <sys-coding-rule-detail-list
        v-if="detailForm.visible"
        :coding-rule-id="detailForm.data.id">
      </sys-coding-rule-detail-list>
    </el-drawer>
  </div>
</template>

<script>
import {
  _querySysCodingRules,
  _deleteSysCodingRule,
} from '@/api/sysCodingRuleApi';
import SysCodingRuleEdit from './CodingRuleEdit.vue';
import SysCodingRuleDetailList from './CodingRuleDetailList.vue';

async function getSysCodingRuleList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _querySysCodingRules({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
  });
  this.table.data = result.data.sysCodingRules
    .map(
      x => (
        {
          ...x,
          details: x.details.sort((a, b) => a.sort - b.sort),
        }
      ),
    );
}

function addSysCodingRule() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editSysCodingRule(sysCodingRuleId) {
  this.form.data.id = sysCodingRuleId;
  this.form.visible = true;
}

function editSysCodingRuleDetail(sysCodingRuleId) {
  this.detailForm.data.id = sysCodingRuleId;
  this.detailForm.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getSysCodingRuleList();
}

function closeDetailForm() {
  this.detailForm.data.id = null;
  this.detailForm.visible = false;
  this.getSysCodingRuleList();
}


async function deleteSysCodingRule(sysCodingRuleId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteSysCodingRule(sysCodingRuleId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getSysCodingRuleList();
    }
  });
}

export default {
  name: 'SysCodingRuleList',
  components: { SysCodingRuleDetailList, SysCodingRuleEdit },
  data() {
    return {
      form: {
        data: {
          id: null,
        },
        visible: false,
      },
      detailForm: {
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
          prop: 'updateAt',
          order: 'descending',
        },
      },
    };
  },
  methods: {
    getSysCodingRuleList,
    deleteSysCodingRule,
    editSysCodingRule,
    addSysCodingRule,
    editSysCodingRuleDetail,
    closeForm,
    closeDetailForm,
  },
  created() {
    this.getSysCodingRuleList();
  },
};
</script>

<style scoped>
  .el-tag.TEXT {
    background-color: #ecf5ff;
    border-color: #d9ecff;
    color: #409eff;
  }

  .el-tag.DATETIME {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }

  .el-tag.AUTO {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
  }
</style>
