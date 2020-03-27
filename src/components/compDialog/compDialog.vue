<!--  -->
<template>
  <div class="compDialog">
    <el-dialog :title="data.dialogConfig.title"   width="40%" :visible.sync="dialogFormVisible" @close="close">
      <el-form label-width="100px" hide-required-asterisk>
        <template v-for="(item,index) in data.dialogConfig.dinput">
          <el-form-item v-if="item.columnType==='slot'" :label="item.label" :key="index">

            <el-input v-model="item.name" autocomplete="off"></el-input>

            <template slot-scope="scope">
              <slot :name="item.slotName" :data="scope.row"></slot>
            </template>
          </el-form-item>
          <el-form-item v-else :key="index" :label="item.label">
            <el-input v-model="item.name" autocomplete="off"></el-input>
            <!-- el-input v-model有时无法实时更新，需要原生 -->
            <!-- <el-input :value="form[item.name]" autocomplete="off"></el-input> -->
          </el-form-item>
        </template>
        
        <el-form-item>
          
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddGoods">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "compDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    dialogConfig: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      form: {},
      data: {
        dialogConfig: {
          title: "",
          dinput: []
        }
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    flag(nv, ov) {
      this.dialogFormVisible = nv;
    }
    // dialogConfig
  },
  //方法集合
  methods: {
    initConfig() {
      if (this.$props.dialogConfig) {
        for (const key in this.$props.dialogConfig) {
          this.data.dialogConfig[key] = this.$props.dialogConfig[key];
        }
        // let form = this.$props.dialogConfig.dinput;
        // for (let i = 0; i < form.length; i++) {
        //    this.$set(this.form, form[i].name, "")

        // }
      }
    },
    close() {
      this.$emit("update:flag", false);
    },
    AddGoods() {
       this.$emit("getDoods");
        this.$emit("update:dialogConfig");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initConfig();
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
.el-form-item{
  margin-bottom: 20px;
}
</style>