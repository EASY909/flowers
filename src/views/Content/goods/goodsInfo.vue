<!--  -->
<template>
  <div id="goodsInfo">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>
    <el-table size="mini" :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="goods_id" label="产品编号"></el-table-column>
      <el-table-column align="center" prop="goods_name" label="产品名"></el-table-column>
      <el-table-column align="center" prop="items_id" label="产品类别号"></el-table-column>
      <el-table-column align="center" prop="price" label="价格"></el-table-column>
      <el-table-column align="center" prop="num" label="数量"></el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.goods_url" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row.goods_id)"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="DeleteGoods(scope.row.goods_id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="martop30"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="current_page"
    ></el-pagination>
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
export default {
  name: "goodsInfo",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      goods_id: "",
      total: 0,
      pageSize: 5,
      current_page: 1,
      easyDialog: false,
      easyDialogEdit: false,
      dialogInfo: {
        title: "添加产品类别",
        label: "产品类别名"
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCurrentChange(val) {
      this.loadGetGoods(val, 5);
    },
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
</style>