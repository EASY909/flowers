<!--  -->
<template>
  <div class="admin">
    <el-button
      type="danger"
      @click="compDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>
    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.admin_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="Delete(rowData.rowData.admin_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>
    <Dialog
      @refreshTable="refreshTable"
      ref="dialog"
      :flag.sync="compDialog"
      :admin_id.sync="admin_id"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Table from "@c/table";
import Dialog from "./dialog/dialog";
import { getAdmin } from "@/api/admin.js";
import { RequestUrl } from "@/api/requestUrlData.js";
export default {
  name: "admin",
  //import引入的组件需要注入到对象中才能使用
  components: { Table, Dialog },
  data() {
    //这里存放数据
    return {
      admin_id: "",
      compDialog: false,
      tableConfig: {
        tHead: [
          {
            label: "管理员编号",
            prop: "admin_id"
          },
          {
            label: "管理员用户名",
            prop: "user_name"
          },
          {
            label: "管理员姓名",
            prop: "name"
          },
          {
            label: "管理员密码",
            prop: "pwd"
          },
          {
            label: "管理员手机号",
            prop: "mobile"
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
            method: RequestUrl.getAdmin,
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
    refreshTable() {
      this.$refs["table"].loadTableData(1);
    },
    handleEdit(val) {
      this.compDialog = true;
      this.admin_id = val;
      this.$refs["dialog"].GetAdminById(val);
    },
   
    Delete(val) {
      this.admin_id = val;
      this.confirm({
        fun: this.deleteAdmin
      });
    },
    deleteAdmin() {
      let requestData = {
        method: "deleteAdmin",
        admin_id: this.admin_id
      };
      getAdmin(requestData).then(res => {
        this.alertInfos(res);
        this.refreshTable();
      });
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
</style>