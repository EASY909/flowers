<!--  -->
<template>
  <div id="login">
    <div class="loginWrap">
      <el-input v-model="user_name" placeholder="请输入账户"></el-input>

      <el-input type="password" v-model="pwd" placeholder="请输入密码"></el-input>

      <el-button type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { login } from "@/api/login";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      user_name: "",
      pwd: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      let reData = {
        method: "login",
        user_name: this.user_name,
        pwd: this.pwd
      };
      this.$store
        .dispatch("login/login", reData)
        .then(response => {
          if (response.code == 0) {
            this.$router.push({
              path: "/index"
            });
          } else {
            this.$message({
              message: response.msg,
              type: "error"
            });
          }
        })
        .catch(error => {});

      //   console.log(reData)
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
<style lang='scss'>
//@import url(); 引入公共css类
body {
  margin: 0px;
}
#login {
  height: 100vh;
  background-color: #344a5f;
  position: relative;
  .loginWrap {
    width: 350px;
    height: 350px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .el-input {
      margin-bottom: 30px;
    }
    .el-input:first-child {
      margin-top: 50px;
    }
    button {
      width: 100%;
    }
  }
}
</style>