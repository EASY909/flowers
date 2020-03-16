<!--  -->
<template>
  <div id="nav">
      
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="transparent"
          text-color="#fff"
          active-text-color="#fff"
          router
          :collapse="isCollapse"
        >
        <template v-for="(item,index) in routers" v-if="item.child">
           <el-submenu v-if="!item.hidden" :key="index" :index="index+''">
            <template slot="title">
              <i class="el-icon-location" ></i>
              <span>{{item.meta.name}}</span>
            </template>
              <el-menu-item
            v-for="(subItem,id) in item.children"
            :key="id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
          </el-submenu>
        </template>

        <template  v-else>

            <el-menu-item  v-if="!item.hidden" :index="item.path">
              <i class="el-icon-menu"></i>
             <span slot="title">{{item.meta.name}}</span>
             </el-menu-item>
        </template>
     



        </el-menu>

   
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
    return {
      routers:this.$router.options.routes
    };
  },
  //监听属性 类似于data概念
  computed: {
    isCollapse(){
      return this.$store.state.login.isCollapse; 
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
   console.log(this.$router.options.routes)
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
@import "../../../styles/config.scss";

#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all 0.3s ease 0s);
    }
  }
}
.open {
  #nav {
    width: $navMenu;
  }
}
.close {
  #nav {
    width: $navMenuMin;
    .logo img {
      width: 60%;
    }
  }
}
// .close {
//   #nav-wrap { width: $navMenuMin; }

// }
</style>