<!--  -->
<template>
  <div class="about">
    <el-form label-width="100px" :model="form" enctype="multipart/form-data" name="form" ref="form">
      <el-form-item label="公司主图" prop="company_img" class="imgfile">
        <input type="file" @change="getImgfile" id="imgfile" />
        <img id="Uimg" :src="form.company_img" style="width: 300px;height:100%" />
      </el-form-item>

      <el-form-item label="公司详情" prop="detail">
        <el-input type="textarea" v-model="form.detail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="martop30" type="primary" @click="modifyIntro">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { contact } from "@/api/contact";
import axios from "axios";
export default {
  name: "about",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      form: {
        company_img: "",
        detail: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getImgfile() {
      let file = document.getElementById("imgfile").files[0];

      var reader = new FileReader();
      //使用该对象读取file文件
      reader.readAsDataURL(file);
      //读取文件成功后执行的方法函数
      reader.onload = function(e) {
        //读取成功后返回的一个参数e，整个的一个进度事件
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
        //的base64编码格式的地址
        document.getElementById("Uimg").setAttribute("src", e.target.result);
      };
    },
    modifyIntro() {
      let company_img = document.getElementById("imgfile").files[0];
      //  let new_img = company_img ? company_img : this.form.company_img;
      let formData = new FormData();
      formData.append("method", "modifyIntro");
      formData.append("detail", this.form.detail);
      formData.append("company_img", company_img || this.form.company_img);

      axios({
        url: "http://localhost:8888/flowers/WebUploadServlet",
        method: "post",
        data: formData,
        processData: false, // 告诉axios不要去处理发送的数据(重要参数)
        contentType: false // 告诉axios不要去设置Content-Type请求头
      }).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          // this.$emit("refreshTable");
          // this.close();
        }
      });
    },
    getIntroduction() {
      let reqData = {
        method: "getIntroduction"
      };
      contact(reqData).then(res => {
        this.form = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getIntroduction();
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