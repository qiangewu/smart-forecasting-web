<template>
  <div>
    <div>
      <div style="margin: 20px">
        <div class="tip-wrap">
          <i class="el-icon-s-opportunity" aria-hidden="true"></i>
          不同的业务需要不同的编号规则，发起申请后系统将根据设置好的规则自动生成编号，无需手动填写。
        </div>
        <div :key="row.id" v-for="row in table.data">
          <div class="detail-item-wrap">
            <div class="detail-type">
              {{row.code}}
              <div class="detail-operation">
                <i class="el-icon-top" @click="upSysDictData(row.id)"></i>
                <i class="el-icon-bottom" @click="downSysDictData(row.id)"></i>
                <i class="fa fa-pencil-square-o" aria-hidden="true"
                   @click="editSysDictData(row.id)"></i>
                <i class="fa fa-times" aria-hidden="true"
                   @click="deleteSysDictData(row.id)"
                ></i>
              </div>
            </div>
            <div>{{row.name}}</div>
          </div>
        </div>
        <button
          class="dashed-button"
          style="height: 34px"
          @click="addSysDictData">添加格式
        </button>
      </div>
    </div>
    <el-dialog
      title="提示"
      append-to-body
      :visible.sync="form.visible">
      <sysDictData-edit
        v-if="form.visible"
        :sys-dict-id="sysDictId"
        :sys-dict-data-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </sysDictData-edit>
    </el-dialog>
  </div>
</template>

<script>
import {
  _querySysDictData,
  _findAllSysDictData,
  _deleteSysDictData,
  _upSysDictData,
  _downSysDictData,
} from '@/api/sysDictDataApi';
import SysDictDataEdit from './SysDictDataEdit.vue';

async function getSysDictDataList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _findAllSysDictData(
    this.sysDictId,
    // {
    //   page: this.table.query.page,
    //   size: this.table.query.size,
    //   sort: this.table.sort.prop,
    //   direction,
    // },
  );
  this.table.data = result.data.sysDictData;
}

function addSysDictData() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editSysDictData(sysDictDataId) {
  this.form.data.id = sysDictDataId;
  this.form.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getSysDictDataList();
}

async function deleteSysDictData(sysDictDataId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _deleteSysDictData(this.sysDictId, sysDictDataId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '删除成功!',
      });
      this.getSysDictDataList();
    }
  });
}

async function upSysDictData(sysDictDataId) {
  this.$confirm('是否上移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _upSysDictData(this.sysDictId,sysDictDataId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '上移成功!',
      });
      this.getSysDictDataList();
    }
  });
}

async function downSysDictData(sysDictDataId) {
  this.$confirm('是否下移菜单?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const result = await _downSysDictData(this.sysDictId, sysDictDataId);
    if (result.code === 1200) {
      this.$message({
        type: 'success',
        message: '下移成功!',
      });
      this.getSysDictDataList();
    }
  });
}

export default {
  name: 'SysDictDataList',
  components: { SysDictDataEdit },
  props: {
    sysDictId: String,
  },
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
    getSysDictDataList,
    deleteSysDictData,
    editSysDictData,
    addSysDictData,
    closeForm,
    upSysDictData,
    downSysDictData,
  },
  created() {
    this.getSysDictDataList();
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
