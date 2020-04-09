<!--  -->
<template>
  <div class="newsDialog">
    <el-dialog title="添加产品信息" width="40%" :visible.sync="dialogFormVisible" @close="close">
      <el-form
        label-width="100px"
        :model="form"
        enctype="multipart/form-data"
        name="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="登录名" prop="user_name" required>
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile" required>
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd" required>
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="Admin('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAdmin } from "@/api/admin.js";
import axios from "axios";
export default {
  name: "newsDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    admin_id: {
      type: String,
      default: ""
    }
  },
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      form: {
        method: "",
        admin_id:"",
        user_name: "",
        name: "",
        mobile: "",
        pwd: ""
      },
      newsItems: [],
      rules: {
        user_name: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
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
    GetAdminById(value) {
      let resData = {
        method: "getAdminById",
        admin_id: value
      };
      getAdmin(resData).then(res => {
        this.form = res.data;
        
      });
    },
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
    },
    Admin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.DialogAdmin();
        }
      });
    },
    resetForm() {
      // this.goods_id = "";
      // this.$store.commit("goods/SETEditGoodsId", "");
      // document.getElementById("Uimg").setAttribute("src", "");
      this.$emit("update:admin_id", "");
      this.$refs["form"].resetFields();
    },
    DialogAdmin() {
      if (this.admin_id) {
        this.form.method = "modifyAdmin";
        this.form.admin_id = this.admin_id;
      } else {
        this.form.method = "addAdmin";
        delete this.form.admin_id;
      }
      
      getAdmin(this.form).then(res => {
       
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });
          this.$emit("refreshTable");
          this.close();
        
      });
    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.GetNewsType();
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