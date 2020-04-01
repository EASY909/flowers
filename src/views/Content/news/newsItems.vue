<!--  -->
<template>
  <div id="newsItems">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <easyDialog @refreshTable="refreshTable" :flag.sync="easyDialog" :dialogInfo="dialogInfo" />
    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.newstype_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteItems(rowData.rowData.newstype_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>
    <easyDialogEdit
      @refreshTable="refreshTable"
      :id="newstype_id"
      :flag.sync="easyDialogEdit"
      :configdata="EditDialogInfo"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getNewsType, deleteNewsType } from "@/api/news";
import easyDialog from "@c/easyDialog/easyDialog";
import Table from "@c/table";
import { RequestUrl } from "@/api/requestUrlData.js";
import easyDialogEdit from "@c/easyDialog/easyDialogEdit";
export default {
  name: "newsItems",
  //import引入的组件需要注入到对象中才能使用
  components: { easyDialog, easyDialogEdit, Table },
  data() {
    //这里存放数据
    return {
      tableData: [],
      newstype_id: "",
      total: 0,
      pageSize: 5,
      current_page: 1,
      easyDialog: false,
      easyDialogEdit: false,
      tableConfig: {
        tHead: [
          {
            label: "新闻类别号",
            prop: "newstype_id"
          },
          {
            label: "新闻类别名",
            prop: "newstype_name"
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
            method: RequestUrl.getNewsType,
            page: 1,
            limit: 5
          }
        },
        pagination: true
      },
      EditDialogInfo: {
        title: "修改新闻类别",
        label: "新闻类别名",
        getInfo: "getNewsTypeById",
        id: "newstype_id",
        name: "newstype_name",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.modifyNewsType,
            name: "newstype_name",
            id: "newstype_id"
          }
        }
      },
      dialogInfo: {
        title: "添加新闻类别",
        label: "新闻类别名",
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.addNewsType,
            name: "newstype_name"
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
    refreshTable() {
      this.$refs.table.loadTableData(1);
    },
    handleEdit(val) {

      this.easyDialogEdit = true;

      this.newstype_id = val;
    },
    DeleteItems(newstype_id) {
      this.newstype_id = newstype_id;
      this.confirm({
        fun: this.dodeleteGoodsItems
      });
    },
    dodeleteGoodsItems() {
      let requestData = {
        method: "deleteNewsType",
        newstype_id: this.newstype_id
      };

      deleteNewsType(requestData).then(res => {
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