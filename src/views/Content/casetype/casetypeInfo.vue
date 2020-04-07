<!--  -->
<template>
  <div class="casetypeInfo">
    <el-button
      type="danger"
      @click="compDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:images="rowData">
        <img class="goods_url" :src="rowData.rowData.case_url" />
      </template>
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.case_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteCase(rowData.rowData.case_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>

    <CompDialog
      @refreshTable="refreshTable"
      :case_id.sync="case_id"
      ref="CompDialog"
      :flag.sync="compDialog"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { deleteCase } from "@/api/case";
import Table from "@c/table";
import CompDialog from "./dialog/dialog";
import { RequestUrl } from "@/api/requestUrlData.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "casetypeInfo",
  components: {
    Table,
    CompDialog
  },
  data() {
    //这里存放数据
    return {
      case_id: "",
      compDialog: false,
      easyDialogEdit: false,
      tableConfig: {
        tHead: [
          {
            label: "案例编号",
            prop: "case_id"
          },
          {
            label: "案例类别号",
            prop: "casetype_id"
          },
          {
            label: "案例简介",
            prop: "case_introduction"
          },
          {
            label: "案例图片",
            columnType: "slot",
            prop: "images",
            slotName: "images"
          },
          {
            label: "操作",
            columnType: "slot",
            prop: "options",
            slotName: "options"
          }
        ],
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.getCases,
            page: 1,
            limit: 5
          }
        },
        pagination: true
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    DeleteCase(val) {
      this.case_id = val;
      this.confirm({
        fun: this.dodeleteCase
      });
    },
    dodeleteCase() {
      let requestData = {
        method: "deleteCase",
        case_id: this.case_id
      };
      deleteCase(requestData).then(res => {
        this.alertInfos(res);
        this.refreshTable();
      });
    },
    handleEdit(val) {
      this.compDialog = true;
      this.case_id = val;
      this.$refs["CompDialog"].GetCaseById(val);
      //   this.$refs["CompDialog"].GetGoodsById(val);
      //   this.$store.commit("goods/SETEditGoodsId", val);
    },

    refreshTable() {
      this.$refs["table"].loadTableData(1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.goods_url {
  width: 80px;
}
</style>