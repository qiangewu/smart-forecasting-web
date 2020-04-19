<template>
  <div>
    <div style="margin: 20px">
      <div class="tip-wrap">
        <i class="el-icon-s-opportunity" aria-hidden="true"></i>
        不同的业务需要不同的编号规则，发起申请后系统将根据设置好的规则自动生成编号，无需手动填写。
      </div>
      <div :key="row.id" v-for="row in table.data">
        <div class="detail-item-wrap" v-if="row.type==='TEXT'">
          <div class="detail-type">
            固定字符
            <div class="detail-operation">
              <i class="el-icon-top" @click="upSysCodingRuleDetail(row.id)"></i>
              <i class="el-icon-bottom" @click="downSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-pencil-square-o" aria-hidden="true"
                 @click="editSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-times" aria-hidden="true"
                 @click="deleteSysCodingRuleDetail(row.id)"
              ></i>
            </div>
          </div>
          <div>{{row.node}}</div>
        </div>
        <div class="detail-item-wrap" v-if="row.type==='DATETIME'">
          <div class="detail-type">
            提交日期
            <div class="detail-operation">
              <i class="el-icon-top" @click="upSysCodingRuleDetail(row.id)"></i>
              <i class="el-icon-bottom" @click="downSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-pencil-square-o" aria-hidden="true"
                 @click="editSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-times" aria-hidden="true"
                 @click="deleteSysCodingRuleDetail(row.id)"
              ></i>
            </div>
          </div>
          <div>日期格式：{{row.node}}</div>
        </div>
        <div class="detail-item-wrap" v-if="row.type==='AUTO'">
          <div class="detail-type">自动计数
            <div class="detail-operation">
              <i class="el-icon-top" @click="upSysCodingRuleDetail(row.id)"></i>
              <i class="el-icon-bottom" @click="downSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-pencil-square-o" aria-hidden="true"
                 @click="editSysCodingRuleDetail(row.id)"></i>
              <i class="fa fa-times" aria-hidden="true"
                 @click="deleteSysCodingRuleDetail(row.id)"
              ></i>
            </div>
          </div>
          <div>位数：{{row.length}}</div>
          <div>重复周期：{{row.cycle}}</div>
        </div>
      </div>
      <button
        class="dashed-button"
        style="height: 34px"
        @click="addSysCodingRuleDetail">添加格式
      </button>
    </div>
    <el-dialog
      append-to-body
      :visible.sync="form.visible">
      <sysCodingRuleDetail-edit
        v-if="form.visible"
        :coding-rule-id="codingRuleId"
        :sys-coding-rule-detail-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </sysCodingRuleDetail-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _querySysCodingRuleDetails,
  _deleteSysCodingRuleDetail,
  _upSysCodingRuleDetail,
  _downSysCodingRuleDetail,
} from '@/api/sysCodingRuleDetailApi';
import SysCodingRuleDetailEdit from './CodingRuleDetailEdit.vue';

async function getSysCodingRuleDetailList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _querySysCodingRuleDetails(this.codingRuleId, {
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
  });
  console.log(result.data.sysCodingRuleDetails);
  this.table.data = result.data.sysCodingRuleDetails;
}

function addSysCodingRuleDetail() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editSysCodingRuleDetail(sysCodingRuleDetailId) {
  this.form.data.id = sysCodingRuleDetailId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getSysCodingRuleDetailList();
}

async function deleteSysCodingRuleDetail(sysCodingRuleDetailId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteSysCodingRuleDetail(this.codingRuleId, sysCodingRuleDetailId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getSysCodingRuleDetailList();
    }
  });
}

async function upSysCodingRuleDetail(sysCodingRuleDetailId) {
  this.$confirm('是否上移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _upSysCodingRuleDetail(this.codingRuleId,sysCodingRuleDetailId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '上移成功!',
      });
      this.getSysCodingRuleDetailList();
    }
  });
}

async function downSysCodingRuleDetail(sysCodingRuleDetailId) {
  this.$confirm('是否下移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _downSysCodingRuleDetail(this.codingRuleId, sysCodingRuleDetailId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '下移成功!',
      });
      this.getSysCodingRuleDetailList();
    }
  });
}

export default {
  name: 'SysCodingRuleDetailList',
  props: {
    codingRuleId: String,
  },
  components: { SysCodingRuleDetailEdit },
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
          prop: 'sort',
          order: 'ascending',
        },
      },
    };
  },
  methods: {
    getSysCodingRuleDetailList,
    deleteSysCodingRuleDetail,
    editSysCodingRuleDetail,
    addSysCodingRuleDetail,
    closeForm,
    upSysCodingRuleDetail,
    downSysCodingRuleDetail,
  },
  created() {
    this.getSysCodingRuleDetailList();
  },
};
</script>

<style scoped>
  .detail-item-wrap {
    border: 1px solid #eeeeee;
    border-left: 3px solid #2f4669;
    padding: 10px;
    line-height: 20px;
    color: #909399;
    margin: 10px 0;
  }

  .detail-operation {
    display: none;
    float: right;
    padding-right: 5px;
  }

  .detail-item-wrap:hover .detail-operation {
    display: block;
  }

  .detail-operation i {
    cursor: pointer;
    padding: 0 5px;
    font-size: 14px;
    color: #2f4669;
  }

  .detail-type {
    border-bottom: 1px solid #eeeeee;
    color: #000000;
  }
</style>
