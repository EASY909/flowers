<!--  -->
<template>
  <div id="goodsItems">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <!-- <easyDialog :flag="easyDialog" @close="close" /> -->
    <easyDialog @refreshTable="refreshTable" :flag.sync="easyDialog" :dialogInfo="dialogInfo" />
    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.items_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteItems(rowData.rowData.items_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>
    <easyDialogEdit
      @refreshTable="refreshTable"
      :id="items_id"
      :flag.sync="easyDialogEdit"
      :configdata="EditDialogInfo"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { RequestUrl } from "@/api/requestUrlData.js";
import Table from "@c/table";
import { deleteGoodsItems } from "@/api/goods";
import easyDialog from "@c/easyDialog/easyDialog";
import easyDialogEdit from "@c/easyDialog/easyDialogEdit";
export default {
  name: "goodsItems",
  //import引入的组件需要注入到对象中才能使用
  components: { easyDialog, easyDialogEdit, Table },
  data() {
    //这里存放数据
    return {
      tableData: [],
      items_id: "",
      easyDialog: false,
      easyDialogEdit: false,
      EditDialogInfo: {
        title: "添加产品类别",
        label: "产品类别名",
        getInfo: "getGoodsItemById",
        name: "items_name",
        id: "items_id",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.modifyGoodsItems,
            name: "items_name",
            id: "items_id"
          }
        }
      },
      tableConfig: {
        tHead: [
          {
            label: "产品类别号",
            prop: "items_id"
          },
          {
            label: "产品类别名",
            prop: "items_name"
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
            method: RequestUrl.getGoodsItems,
            page: 1,
            limit: 5
          }
        },
        pagination: true
      },
      dialogInfo: {
        title: "添加产品类别",
        label: "产品类别名",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.addGoodsItems,
            name: "items_name"
          }
        }
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleEdit(items_id) {
      this.easyDialogEdit = true;

      this.items_id = items_id;
    },
    DeleteItems(items_id) {
      this.items_id = items_id;
      this.confirm({
        fun: this.dodeleteGoodsItems
      });
    },
    dodeleteGoodsItems() {
      let requestData = {
        method: "deleteGoodsItems",
        items_id: this.items_id
      };
      deleteGoodsItems(requestData).then(res => {
        this.alertInfos(res);
        this.refreshTable();
      });
    },
    refreshTable() {
      this.$refs.table.loadTableData(1);
    }
    // close(val){
    //     this.easyDialog=val;
    // }
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