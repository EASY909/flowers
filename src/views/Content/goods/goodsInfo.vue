<!--  -->
<template>
  <div id="goodsInfo">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <Table :tableConfig="tableConfig">
      <template v-slot:images="rowData" >
      
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getGoods, deleteGoods } from "@/api/goods";
import Table from "@c/table";
import {RequestUrl} from "@/api/requestUrlData.js";
export default {
  name: "goodsInfo",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Table
  },
  data() {
    //这里存放数据
    return {
      tableData: [],
      goods_id: "",

      easyDialog: false,
      easyDialogEdit: false,
      dialogInfo: {
        title: "添加产品类别",
        label: "产品类别名"
      },
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
        requestUrlData:{
          method: 'post',
          url:"WebMainServlet",
          data:{
              method: RequestUrl.getGoods,
              page: 1,
              limit: 5
          }
        },
        pagination:true
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
      this.goods_id = val;
      this.confirm({
        fun: this.dodeleteGoods
      });
    },
    dodeleteGoods() {
      let requestData = {
        method: "deleteGoods",
        goods_id: this.goods_id
      };
      deleteGoods(requestData).then(res => {
        this.alertInfos(res);
        this.loadGetGoods(1, 5);
      });
    },
    loadGetGoods(page, limit) {
      let requestData = {
        method: "getGoods",
        page: page,
        limit: limit
      };
      getGoods(requestData)
        .then(response => {
          if (response.code == 0) {
            this.total = response.count;
            this.tableData = response.data;
          }
        })
        .catch(error => {});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadGetGoods(this.current_page, 5);
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