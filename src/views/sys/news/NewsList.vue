<template>
  <div>
    <div class="keyTitle">
      <el-input
        v-model="searchForm.keywords"
        clearable
        placeholder="keywords"
        style="width: 217px;margin-left: 10px"
      ></el-input>
      <el-button
        style="background-color: #005691;color: white;margin-left: 10px;height: 30px;line-height: 0px;width: 70px;padding: 0px;"
        @click="newsDocumentList"
        >Search</el-button
      >
    </div>
    <div class="keyHeader">
      <div
        style="width: 50%; display: flex;justify-content: flex-start;align-items: Center;"
      >
        <span style="margin-left: 10px;font-weight: bold">Home Management</span>
      </div>
      <div
        style="width: 50%; display: flex;justify-content: flex-end;align-items: Center;"
      >
        <el-button
          :disabled="
            !checkPrivilegeButton($t('button.Delete')) ||
              multipleSelection.length === 0
          "
          type="text"
          style="background-color: #005691;color: white;height: 30px;line-height: 30px;width: 70px;padding: 0px;"
          @click="handleDelete()"
          >Delete</el-button
        >
        <el-button
          :disabled="!checkPrivilegeButton($t('button.Add'))"
          style="background-color: #005691;color: white;margin-right: 10px;height: 30px;line-height: 0px;width: 70px;padding: 0px;"
          @click="addContent"
          ><i class="el-icon-plus avatar-uploader-icon"></i> Add</el-button
        >
      </div>
    </div>
    <div>
      <el-table :header-cell-style="{color:'#606266'}" v-loading="newsDocument.loading"
        :data="newsDocument.data"
        border
        size="mini"
        :row-style="rowClass"
        :cell-style="cellClass"
        @selection-change="handleSelectionChange"
        style="width: 100%;"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column label="Title" prop="title"> </el-table-column>
        <el-table-column label="Content" prop="content"> </el-table-column>
        <el-table-column label="Link" prop="link">
          <!--<template slot-scope="scope">-->
          <!--<a href="scope.row.link">Link</a>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="Type" prop="sysDictDTO.dictName">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              :disabled="!checkPrivilegeButton($t('button.Edit'))"
              type="text"
              icon="el-icon-edit"
              style="height: 20px;padding: 0px;"
              @click="handleEdit(scope.row)"
              >Edit</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="bosch-pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="searchForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listQueryTotalAmount"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.visible"
      style="padding: 0px;border-radius: 10px;"
      @close="onDialogClose"
    >
      <span
        style="display: block;
                         background-color: #D7D7D7;
                         height: 1px;
                         width: 100%;
                         margin-top: -30px;
                         margin-bottom: 20px;"
      ></span>
      <el-form
        ref="newsDocumentForm"
        :rules="formRules"
        :model="form.data"
        :label-width="formLabelWidth"
        label-position="left"
      >
        <el-form-item label="Title" prop="title" placeholder="title">
          <el-input v-model="form.data.title"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="content" placeholder="content">
          <el-input v-model="form.data.content"></el-input>
        </el-form-item>
        <el-form-item label="Link" prop="link" placeholder="link">
          <el-input v-model="form.data.link"></el-input>
        </el-form-item>
        <el-form-item label="Type" prop="categoryArray" placeholder="type">
          <el-cascader
            v-model="form.data.categoryArray"
            :options="newsDocumentTypeList"
            :props="optionProps"
            @change="selectPropsNewsType"
            :show-all-levels="false"
            filterable
            expand-trigger="hover"
            style="width: 100%;"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span
        style="display: block;
                         background-color: #D7D7D7;
                         height: 1px;
                         width: 100%;"
      ></span>
      <div
        slot="footer"
        class="dialog-footer"
        style="display: flex;justify-content:center;"
      >
        <el-button
          @click="form.visible = false"
          style="height: 30px;line-height: 0px;width: 70px;padding: 0px;"
          >{{ $t("button.Cancel") }}</el-button
        >
        <el-button
          type="primary"
          :disabled="isDisable"
          @click="saveContent(form.data)"
          :loading="form.loading"
          style="background-color: #005691;border-color: #005691;height: 30px;line-height: 0px;width: 70px;padding: 0px;"
          >Save</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  searchNewsDocument,
  addNewsDocument,
  updateNewsDocument,
  batchDelete
} from "../../../api/newsDocument";
// import { findByDictTypeForCascader } from "../../../api/dict";
// import dictUtils from "../../../utils/dictUtils.js";
// import StyleUntils from "../../../utils/style.js";
import { isButonPrivilege } from "../../../utils/privilegeButton.js";

function onDialogClose() {
  this.$refs.newsDocumentForm.resetFields();
}

function addContent() {
  this.showImage = false;
  this.form.visible = true;
  this.form.loading = false;
  this.form.id = "";
  this.form.data = {
    title: "",
    content: "",
    link: "",
    image: "",
    newsDocumentType: "",
    categoryArray: []
  };
}

async function handleEdit(obj) {
  this.form.visible = true;
  this.form.loading = false;
  this.form.id = obj.id;
  if (obj.sysDictDTO !== null && obj.sysDictDTO.dictName === "ScrollView") {
    this.showImage = true;
  } else {
    this.showImage = false;
  }
  this.form.data = {
    title: obj.title,
    content: obj.content,
    link: obj.link,
    image: obj.image,
    newsDocumentType: obj.newsDocumentType,
    categoryArray: this.findElement(obj.sysDictDTO)
  };
}

async function saveContent(obj) {
  this.$refs.newsDocumentForm.validate(async valid => {
    if (valid) {
      this.form.loading = true;
      this.token = localStorage.getItem("token");
      if (this.form.data.categoryArray.length > 0) {
        var index = this.form.data.categoryArray.length - 1;
        this.form.data.newsDocumentType = this.form.data.categoryArray[index];
      }
      const result =
        this.form.id === ""
          ? await addNewsDocument(this.token, obj)
          : await updateNewsDocument(this.form.id, obj);
      if (result.code === 1200) {
        this.newsDocumentList();
        this.form.visible = false;
        this.form.loading = false;
        this.form.id = "";
        this.form.data = {
          title: "",
          content: "",
          link: "",
          image: "",
          newsDocumentType: "",
        };
      } else {
        this.form.loading = false;
      }
      return true;
    } else {
      this.form.loading = false;
      this.$message({
        type: "error",
        message: "Please enter the correct value!"
      });
      return false;
    }
  });
}

function handleDelete() {
  if (this.multipleSelection.length > 0) {
    const selectIds = [];
    this.multipleSelection.forEach(org => {
      selectIds.push(org.id);
    });
    this.$confirm("Are you sure to delete ?")
      .then(async () => {
        const result = await batchDelete(selectIds.join(","));
        if (result.code === 1200) {
          this.$message({
            message: "Delete Success",
            type: "success"
          });
          this.newsDocumentList();
        }
      })
      .catch(() => {});
  }
}

async function newsDocumentList() {
  this.newsDocument.loading = true;
  this.token = localStorage.getItem("token");
  if (this.token !== null) {
    const result = await searchNewsDocument(this.token, this.searchForm);
    if (result.code === 1200) {
      this.newsDocument.loading = false;
      this.newsDocument.data = result.data.newsDocument;
      this.listQueryTotalAmount = result.data.totalAmount;
    }
  } else {
    this.newsDocument.loading = false;
  }
}

function handleSizeChange(val) {
  this.searchForm.size = val;
  this.newsDocumentList();
}

function handleCurrentChange(val) {
  this.searchForm.page = val;
  this.newsDocumentList();
}

async function getSysDictType() {
  const result = await findByDictTypeForCascader(dictUtils.newsDocumentType);
  if (result.code === 1200) {
    this.newsDocumentTypeList = result.data.sysDict;
  }
}

function findElement(val) {
  if (val != null && val != "") {
    var cascadeArr = [];
    if (val.parentDictId !== null && val.parentDictId !== "") {
      cascadeArr.push(val.parentDictId);
      cascadeArr.push(val.id);
    } else {
      cascadeArr.push(val.id);
    }
    return cascadeArr;
  }
  return [];
}

function selectPropsNewsType(obj) {
  if (obj !== undefined && obj !== null && obj.length > 0) {
    const filter = this.newsDocumentTypeList.filter(org => org.id === obj[0]);
    if (filter !== undefined && filter !== null && filter.length > 0) {
      const val = filter[0].subChildren.filter(
        org => org.id === obj[obj.length - 1]
      );
      if (val !== undefined && val !== null && val.length > 0) {
        const res = val[0];
        if (res.dictName === "ScrollView") {
          this.showImage = true;
        } else {
          this.showImage = false;
        }
      }
    }
  } else {
    this.showImage = false;
  }
}
export default {
  data() {
    return {
      showImage: false,
      optionProps: {
        value: "id",
        label: "dictValue",
        children: "subChildren"
      },
      token: "",
      newsDocumentTypeList: [],
      formLabelWidth: "180px",
      searchForm: {
        page: 1,
        size: 20,
        keywords: ""
      },
      newsDocument: {
        loading: false,
        data: []
      },
      listQueryTotalAmount: 0,
      privileges: [],
      form: {
        title: "News Document",
        visible: false,
        loading: false,
        id: "",
        data: {
          title: "",
          content: "",
          link: "",
          image: "",
          newsDocumentType: "",
          categoryArray: []
        }
      },
      formRules: {
        title: [
          {
            required: true,
            message: "Please enter title.",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "Please enter content.",
            trigger: "blur"
          }
        ],
        link: [
          {
            required: true,
            message: "Please enter link.",
            trigger: "blur"
          }
        ],
        image: [
          {
            required: true,
            message: "Please enter image.",
            trigger: "blur"
          }
        ],
        categoryArray: [
          {
            required: true,
            message: "Please select newsDocumentType.",
            trigger: "blur"
          }
        ]
      },
      multipleSelection: []
    };
  },
  methods: {
    onDialogClose,
    addContent,
    handleEdit,
    handleDelete,
    saveContent,
    newsDocumentList,
    handleCurrentChange,
    handleSizeChange,
    getSysDictType,
    selectPropsNewsType,
    findElement,
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAvatarSuccess(res) {
      if (res.code === 1200) {
        this.form.data.image = res.data.image;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("upload avatar just JPG !!!");
      }
      if (!isLt2M) {
        this.$message.error("avatar size cannot more than 2MB!");
      }
      return isJPG && isLt2M;
    },
    checkPrivilegeButton(obj) {
      return isButonPrivilege(this.$route.path, obj);
    }
  },
  created() {
    this.newsDocumentList();
    this.getSysDictType();
  },
  computed: {
    isDisable() {
      let d = this.form.data;
      if (this.showImage) {
        if (
          d.title !== null &&
          d.title !== "" &&
          d.content !== null &&
          d.content !== "" &&
          d.image !== null &&
          d.image !== "" &&
          d.link !== null &&
          d.link !== "" &&
          d.categoryArray !== null &&
          d.categoryArray !== "" &&
          d.categoryArray.length > 0 
        ) {
          return false;
        }
        return true;
      } else {
        if (
          d.title !== null &&
          d.title !== "" &&
          d.content !== null &&
          d.content !== "" &&
          d.link !== null &&
          d.link !== "" &&
          d.categoryArray !== null &&
          d.categoryArray !== "" &&
          d.categoryArray.length > 0 
        ) {
          return false;
        }
        return true;
      }
    },
    rowClass() {
      return function() {
        return "height:0px";
      };
    },
    cellClass() {
      return function() {
        return StyleUntils.tableCellStyle;
      };
    }
  }
};
</script>