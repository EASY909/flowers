<!--  -->
<template>
  <div id="goodsItems">
    <el-button type="danger" class="addGoodsItems" icon="el-icon-circle-plus-outline">添加</el-button>
    <el-table size="mini" :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="items_id" label="产品类别号"></el-table-column>
      <el-table-column align="center" prop="items_name" label="产品类别名"></el-table-column>
      <el-table-column align="center" label="操作">
        <el-button type="success" size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:30px"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="current_page"
    ></el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getGoodsItems } from "@/api/goods";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      total: 0,
      pageSize: 5,
      current_page: 1
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCurrentChange(val) {
      this.loadGetGoodsItems(val, 5);
    },
    loadGetGoodsItems(page, limit) {
      let requestData = {
        method: "getGoodsItems",
        page: page,
        limit: limit
      };
      getGoodsItems(requestData)
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
    this.loadGetGoodsItems(this.current_page, 5);
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
.addGoodsItems {
  margin-bottom: 30px;
}
</style>