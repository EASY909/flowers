<!--  -->
<template>
  <div class="goodsInfo">
    <el-button
      type="danger"
      @click="compDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <Table ref="table" :tableConfig="tableConfig">
      <template v-slot:images="rowData">
        <img class="goods_url" :src="rowData.rowData.goods_url" />
      </template>
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.goods_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteGoods(rowData.rowData.goods_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>

    <!-- <easyDialog @loadTable="loadGetGoodsItems" :flag.sync="easyDialog" :data="dialogInfo" /> -->
    <!-- <easyDialog :flag="easyDialog" @close="close" /> -->

    <!-- <easyDialogEdit
      @loadTable="loadGetGoodsItems"
      :items_id="items_id"
      :flag.sync="easyDialogEdit"
      :data="dialogInfo"
    />-->
    <CompDialog
      @refreshTable="refreshTable"
      :goods_id="goods_id"
      ref="CompDialog"
      :flag.sync="compDialog"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Goods } from "@/api/goods";
import Table from "@c/table";
import CompDialog from "./dialog/dialog";
import { RequestUrl } from "@/api/requestUrlData.js";
export default {
  name: "goodsInfo",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Table,
    CompDialog
  },
  data() {
    //这里存放数据
    return {
      del_id: "",
      goods_id: "",
      compDialog: false,
      easyDialogEdit: false,
      tableConfig: {
        tHead: [
          {
            label: "产品编号",
            prop: "goods_id"
          },
          {
            label: "产品名",
            prop: "goods_name"
          },
          {
            label: "产品类别号",
            prop: "items_id"
          },
          {
            label: "价格",
            prop: "price"
          },
          {
            label: "数量",
            prop: "num"
          },
          {
            label: "图片",
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
            method: RequestUrl.getGoods,
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
    DeleteGoods(val) {
      this.del_id = val;
      this.confirm({
        fun: this.dodeleteGoods
      });
    },
    dodeleteGoods() {
      let requestData = {
        method: "deleteGoods",
        goods_id: this.del_id
      };
      Goods(requestData).then(res => {
        this.alertInfos(res);
        this.refreshTable();
      });
    },
    handleEdit(val) {
      this.compDialog = true;
      this.goods_id = val;
      this.$refs["CompDialog"].GetGoodsById(val);
      // this.$store.commit("goods/SETEditGoodsId", val);
    },

    refreshTable() {

      this.$refs["table"].loadTableData(1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.loadGetGoods(this.current_page, 5);
  },
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