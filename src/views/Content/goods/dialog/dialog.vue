<!--  -->
<template>
  <div class="goodsDialog">
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
            <el-option
              :label="items.items_name"
              :key="items.items_id"
              v-for="items in goodsItems"
              :value="items.items_id"
            ></el-option>
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
          <img id="Uimg" :src="form.goods_url" style="width: 100px;height: 100px;" />
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
import { Goods } from "@/api/goods.js";
import axios from "axios";
export default {
  name: "goodsDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    goods_id: {
      type: String,
      default: ""
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
        num: "",
        goods_url: ""
      },
      goodsItems: [],
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
  computed: {
    // goods_id() {
    //   return this.$store.state.goods.goods_id;
    // }
  },
  //监控data中的数据变化
  watch: {
    flag(nv, ov) {
      this.dialogFormVisible = nv;
    }

    // dialogConfig
  },
  //方法集合
  methods: {
    GetGoodsById(value) {
      let resData = {
        method: "getGoodsById",
        goods_id: value
      };
      Goods(resData).then(res => {
        this.form = res.data;
      });
    },
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
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

      this.form.goods_url = "";
      document.getElementById("Uimg").setAttribute("src", "");
      // document.getElementById("Uimg").setAttribute("src", "");
      document.getElementById("imgfile").value = "";
      this.$refs["form"].resetFields();
    },
    addGoods() {
      let method = this.goods_id ? "modifyGoods" : "addGoods";

      let goods_img = document.getElementById("imgfile").files[0];

      if (!goods_img && !this.goods_id) {
        this.$message({
          showClose: true,
          message: "请选择文件！",
          type: "error"
        });
        return;
      }

      let formData = new FormData();
      formData.append("method", method);
      formData.append("goods_name", this.form.goods_name);
      formData.append("items_id", this.form.items_id);
      formData.append("price", this.form.price);
      formData.append("num", this.form.num);

      if (this.goods_id) {
        let newgoods_img = goods_img ? goods_img : this.form.goods_url;
        formData.append("goods_id", this.goods_id);
        formData.append("goods_img", newgoods_img);
      } else {
        formData.append("goods_img", goods_img);
      }
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
    },
    GetGoodsItems() {
      let requestData = {
        method: "getGoodsItems",
        page: 0,
        limit: 0
      };
      Goods(requestData).then(res => {
        this.goodsItems = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetGoodsItems();
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