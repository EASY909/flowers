<!--  -->
<template>
  <div class="contact">
    <el-form ref="contact" label-width="100px" class="demo-ruleForm">
      <el-form-item label="联系方式">
        <el-input type="age" v-model="form.contact" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="martop30" type="primary" @click="modifyContact()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { contact } from "@/api/contact";
export default {
  name: "contact",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      form: {
        contact: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    GetContact() {
      let reqData = {
        method: "getContact"
      };
      contact(reqData).then(res => {
        this.form.contact = res.data;
      });
    },
    modifyContact() {
      if (this.form.contact.trim() === "") {
        this.$message({
          showClose: true,
          message: "联系方式不能为空！",
          type: "error"
        });
        return;
      }
      let reqData = {
        method: "modifyContact",
        contact: this.form.contact
      };
      contact(reqData).then(res => {
        if (res.code === 0) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });

          this.GetContact();
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetContact();
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