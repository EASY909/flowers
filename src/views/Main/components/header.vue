<!--  -->
<template>
  <div id="header">
    <div class="pull-left header-icon" @click="navCollapse">
      <svg-icon iconClass="menu" class="menus"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt />
        {{username}}
      </div>
      <div @click="out" class="header-icon pull-left">
        <svg-icon  iconClass="exit" class="exit" ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    username() {
      return this.$store.state.login.username;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    navCollapse() {

      this.$store.commit("login/setCollapse");
    },
    out() {

      this.$store.dispatch("login/out").then(() => {
        this.$router.push("/login");
      });
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
<style lang='scss' scoped>
//@import url(); 引入公共css类
@import "../../../styles/config.scss";
#header {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}

.open {
  #header {
    left: $navMenu;
  }
}
.close {
  #header {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  + .header-icon {
    padding: 0 32px;
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    line-height: 18px;
    vertical-align: middle;
    margin-right: 10px;
  }
  border: 1px solid #ededed;
}
</style>