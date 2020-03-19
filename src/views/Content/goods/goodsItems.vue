<!--  -->
<template>
  <div id="goodsItems">
    <el-button
      type="danger"
      @click="easyDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>
    <el-table size="mini" :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="items_id" label="产品类别号"></el-table-column>
      <el-table-column align="center" prop="items_name" label="产品类别名"></el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row.items_id)"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="DeleteGoodsItems(scope.row.items_id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
        <!-- <el-button @click="easyDialogEdit=true" type="success" size="mini" icon="el-icon-edit"></el-button>
        <el-button @click="DeleteGoodsItems" type="danger" size="mini" icon="el-icon-delete"></el-button>-->
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
    <easyDialog @loadTable="loadGetGoodsItems" :flag.sync="easyDialog" :data="dialogInfo" />
    <!-- <easyDialog :flag="easyDialog" @close="close" /> -->

    <easyDialogEdit
      @loadTable="loadGetGoodsItems"
      :items_id="items_id"
      :flag.sync="easyDialogEdit"
      :data="dialogInfo"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getGoodsItems, deleteGoodsItems } from "@/api/goods";
import easyDialog from "@c/easyDialog/easyDialog";
import easyDialogEdit from "@c/easyDialog/easyDialogEdit";
export default {
  name:"goodsItems",
  //import引入的组件需要注入到对象中才能使用
  components: { easyDialog, easyDialogEdit },
  data() {
    //这里存放数据
    return {
      tableData: [],
      items_id: "",
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
    },
    handleEdit(items_id) {
      this.easyDialogEdit = true;
      // console.log(items_id);
      this.items_id = items_id;
    },
    DeleteGoodsItems(items_id) {
      this.items_id=items_id;
      this.confirm({
        fun: this.dodeleteGoodsItems
      });
      // deleteGoodsItems(requestData).then(res=>{

      // });
    },
    dodeleteGoodsItems() {
      let requestData = {
        method: "deleteGoodsItems",
        items_id: this.items_id
      };
      deleteGoodsItems(requestData).then(res => {
        this.alertInfos(res);
        this.loadGetGoodsItems(1, 5)
      });
    }
    // close(val){
    //     this.easyDialog=val;
    // }
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

</style>