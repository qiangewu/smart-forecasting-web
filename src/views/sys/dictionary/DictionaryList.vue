<template>
  <div>
    <div class="page-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="operation-wrap" style="display: flex;flex-wrap: wrap">
        <div>
        </div>
        <el-button v-has="'DICTIONARY_EDIT'" type="primary" @click="addDictionary">
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
          label="字典名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="code"
          label="编码"
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
          prop="remark"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-has="'DICTIONARY_EDIT'"
              @click="editDictionary(scope.row.id)">编辑
            </el-button>
            <el-button
              type="text"
              v-has="'DICTIONARY_EDIT'"
              @click="editDictionaryData(scope.row.id)">数据
            </el-button>
            <el-button
              type="text"
              v-has="'DICTIONARY_DELETE'"
              @click="deleteDictionary(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="form.data.id?'字典编辑':'字典添加'"
      @close="closeForm"
      :visible.sync="form.visible">
      <dictionary-edit
        v-if="form.visible"
        :dictionary-id="form.data.id"
        :on-cancel-handler="closeForm"
        :on-submit-handler="closeForm">
      </dictionary-edit>
    </el-dialog>
    <el-drawer
      :visible.sync="dataForm.visible"
      @close="getDictionaryList"
      :with-header="false">
      <sys-dict-data-list
        v-if="dataForm.visible"
        :sys-dict-id="dataForm.data.id"/>
    </el-drawer>
  </div>
</template>

<script>
import {
  _deleteDictionary,
  _queryDictionaries,
} from '@/api/sysDictionaryApi';
import DictionaryEdit from './DictionaryEdit.vue';
import SysDictDataList from './SysDictDataList.vue';


async function getDictionaryList() {
  let direction = this.table.sort.order;
  if (direction) {
    direction = direction === 'ascending' ? 'ASC' : 'DESC';
  }
  const result = await _queryDictionaries({
    page: this.table.query.page,
    size: this.table.query.size,
    sort: this.table.sort.prop,
    direction,
  });
  this.table.data = result.data.sysDictionaries;
  this.table.query.total = result.data.totalAmount;
}

function addDictionary() {
  this.form.data.id = null;
  this.form.visible = true;
}

function editDictionary(dictionaryId) {
  this.form.data.id = dictionaryId;
  this.form.visible = true;
}

function editDictionaryData(dictionaryId) {
  this.dataForm.data.id = dictionaryId;
  this.dataForm.visible = true;
}

function closeForm() {
  this.form.data.id = null;
  this.form.visible = false;
  this.getDictionaryList();
}

async function deleteDictionary(dictionaryId) {
  this.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const result = await _deleteDictionary(dictionaryId);
      if (result.code === 1200) {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.getDictionaryList();
      }
    });
}

export default {
  name: 'DictionaryList',
  components: { SysDictDataList, DictionaryEdit },
  data() {
    return {
      form: {
        data: {
          id: null,
          name: '',
          code: '',
          isActive: 'YES',
          remark: '',
        },
        visible: false,
      },
      dataForm: {
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
    getDictionaryList,
    deleteDictionary,
    editDictionary,
    editDictionaryData,
    addDictionary,
    closeForm,
  },
  created() {
    this.getDictionaryList();
  },
};
</script>

<style scoped>

</style>
