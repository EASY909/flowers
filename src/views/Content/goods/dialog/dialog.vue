<!--  -->
<template>
  <div class="compDialog">
    <el-dialog title="添加产品信息" width="40%" :visible.sync="dialogFormVisible" @close="close">
      <el-form
        label-width="100px"
        :model="form"
        enctype="multipart/form-data"
        name="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="产品名" prop="goods_name" required>
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>

        <el-form-item label="类别" prop="items_id" required>
          <el-select v-model="form.items_id" placeholder="请选择产品类别">
            <el-option label="区域一" value="10"></el-option>
            <el-option label="区域二" value="11"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格" prop="price" required>
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="num" required>
          <el-input v-model.number="form.num"></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="goods_img" class="imgfile">
          <input type="file" @change="getImgfile" id="imgfile" />
          <img id="Uimg" style="width: 100px;height: 100px;" />
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddGoods('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { addGoods } from "@/api/goods.js";
import axios from "axios";
export default {
  name: "compDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      imageUrl: "",
      form: {
        goods_name: "",
        items_id: "",
        price: "",
        num: ""
      },
      data: {},
      rules: {
        goods_name: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        items_id: [
          { required: true, message: "请选择产品类别", trigger: "change" }
        ],
        price: [{ required: true, message: "请选择价格", trigger: "blur" }],
        num: [{ required: true, message: "请选择数量", trigger: "blur" }]
      }
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
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
      document.getElementById("Uimg").removeAttribute("src");
      document.getElementById("imgfile").value = "";
    },
    AddGoods(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addGoods();
        } else {
          //   console.log("error submit!!");
          return;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    addGoods() {
      let goods_img = document.getElementById("imgfile").files[0];

      if (!goods_img) {
        this.$message({
          showClose: true,
          message: "请选择文件！",
          type: "error"
        });
        return;
      }
      let formData = new FormData();
      formData.append("method", "addGoods");
      formData.append("goods_name", this.form.goods_name);
      formData.append("items_id", this.form.items_id);
      formData.append("price", this.form.price);
      formData.append("num", this.form.num);

      formData.append("goods_img", goods_img);
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
          this.$emit("refreshTable");
          this.close();
        }
      });
    },
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
<style lang='scss' >
//@import url(); 引入公共css类
.el-form-item {
  margin-bottom: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.imgfile label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>