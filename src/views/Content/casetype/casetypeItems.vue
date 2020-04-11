<!--  -->
<template>
  <div class="casetypeItems">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>
    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.casetype_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteItems(rowData.rowData.casetype_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>
    <easyDialog @refreshTable="refreshTable" :flag.sync="easyDialog" :dialogInfo="dialogInfo" />
    <easyDialogEdit
        ref="DialogEdit"
      @refreshTable="refreshTable"
      :id="casetype_id"
      :flag.sync="easyDialogEdit"
      :configdata="EditDialogInfo"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Table from "@c/table";
import easyDialog from "@c/easyDialog/easyDialog";
import easyDialogEdit from "@c/easyDialog/easyDialogEdit";
import { RequestUrl } from "@/api/requestUrlData.js";
import { Case } from "@/api/case";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "casetypeItems",
  components: { Table, easyDialog, easyDialogEdit },
  data() {
    //这里存放数据
    return {
      del_id:"",
      casetype_id: "",
      easyDialog: false,
      easyDialogEdit: false,
      EditDialogInfo: {
        title: "修改案例类别",
        label: "案例类别名",
        getInfo: "getCaseTypeById",
        id: "casetype_id",
        name: "casetype_name",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.modifyCaseType,
            name: "casetype_name",
            id: "casetype_id"
          }
        }
      },
      dialogInfo: {
        title: "添加案例类别",
        label: "案例类别名",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.addCaseType,
            name: "casetype_name"
          }
        }
      },
      tableConfig: {
        tHead: [
          {
            label: "案例类别号",
            prop: "casetype_id"
          },
          {
            label: "案例类别名",
            prop: "casetype_name"
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
            method: RequestUrl.getCaseType,
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

      this.$refs.table.loadTableData(1);
    },
    DeleteItems(val) {
      this.del_id = val;
      this.confirm({
        fun: this.dodeleteCaseTypeItems
      });
    },
    dodeleteCaseTypeItems() {
      let requestData = {
        method: "deleteCaseType",
        casetype_id: this.del_id
      };

      Case(requestData).then(res => {
        this.alertInfos(res);
        this.refreshTable();
      });
    },
    handleEdit(val) {
    
      this.easyDialogEdit = true;

      this.casetype_id = val;

      let params = {
        method: "modifyCaseType",
        casetype_id:val,
        name:"casetype_name"
      };
  
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