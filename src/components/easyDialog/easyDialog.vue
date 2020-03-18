<!--  -->
<template>
  <div id="easyDialog">
    <el-dialog :title="dialogData.title" :visible.sync="dialogFormVisible" @close="close">
      <el-form :model="form">
        <el-form-item :label="dialogData.label" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddGoodsItems">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addGoodsItems } from "@/api/goods";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "easyDialog",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      dialogData: {
        title: "",
        label: ""
      },
      form: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    flag(nv, ov) {
      this.dialogFormVisible = nv;
    }
  },
  //方法集合
  methods: {
    close() {
      this.$emit("update:flag", false);
      //   this.$emit("close",false)
      this.dialogFormVisible = false;
    },
    AddGoodsItems() {
      if (this.form.name.trim() == "") {
        this.$message({
          showClose: true,
          message: "产品类别名不能为空！",
          type: "error"
        });
        return;
      }
      let resData = {
        method: "addGoodsItems",
        items_name: this.form.name
      };

      addGoodsItems(resData)
        .then(res => {
          if (res.code != 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(error => {});

      this.dialogFormVisible = false;
      this.$emit("loadTable", 1, 5);
      this.form.name = "";
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.dialogData = this.data;
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