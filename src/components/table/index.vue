<!--  -->
<template>
  <div id="table">
    <el-table size="mini" :data="data.tableData" border style="width: 100%">
      <template v-for="(items,index) in data.tableConfig.tHead">
        <el-table-column
          align="center"
          v-if="items.columnType==='slot'"
          :key="index"
          :prop="items.prop"
          :label="items.label"
        >
          <template slot-scope="scope">
            <slot :name="items.slotName" :rowData="scope.row"></slot>
          </template>
        </el-table-column>

        <el-table-column align="center" v-else :key="index" :prop="items.prop" :label="items.label"></el-table-column>
      </template>
    </el-table>

    <el-pagination
      v-if="data.tableConfig.pagination"
      class="martop30"
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

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "tablevue",
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      data: {
        tableConfig: {
          tHead: [],
          requestUrlData: {},
          pagination: true
        },
        tableData: []
      },
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
    initConfig() {
      if (this.$props.tableConfig) {
        for (const key in this.$props.tableConfig) {
         
          this.data.tableConfig[key] = this.$props.tableConfig[key];
        }
      }
    },
    loadTableData(val) {
     
      let data = this.data.tableConfig.requestUrlData;
      let resData = {
        method: data.method,
        url: data.url,
        data: data.data
      };
      resData.data.page=val
    
      this.loadData(resData).then(res => {
        
        this.data.tableData = res.data;
        this.total= res.count;
      });
    },
    handleCurrentChange(val) {
      // console.log(val)
      // this.
      this.loadTableData(val);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
   
    this.initConfig();
    this.loadTableData(1);
  },
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