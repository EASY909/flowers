<!--  -->
<template>
  <div class="caseDialog">
    <el-dialog title="产品信息" width="40%" :visible.sync="dialogFormVisible" @close="close">
      <el-form
        label-width="100px"
        :model="form"
        enctype="multipart/form-data"
        name="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="类别" prop="casetype_id" required>
          <el-select v-model="form.casetype_id" placeholder="请选择产品类别">
            <el-option
              :label="items.casetype_name"
              :key="items.casetype_id"
              v-for="items in caseItems"
              :value="items.casetype_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="案例简介" prop="case_introduction" required>
          <el-input v-model.number="form.case_introduction"></el-input>
        </el-form-item>

        <el-form-item label="案例图片" prop="images" class="imgfile">
          <input type="file" @change="getImgfile" id="imgfile" />
          <img id="Uimg" :src="form.case_url" style="width: 100px;height: 100px;" />
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddCase('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Case } from "@/api/case.js";
import axios from "axios";
export default {
  name: "caseDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    case_id: {
      type: String,
      default: ""
    }
  },
  data() {
    //这里存放数据
    return {
      dialogFormVisible: false,
      form: {
        casetype_id: "",
        case_introduction: "",
        case_url: ""
      },
      caseItems: [],
      rules: {
        case_introduction: [
          { required: true, message: "请输入案例简介", trigger: "blur" }
        ],
        casetype_id: [
          { required: true, message: "请选择案例类别", trigger: "change" }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    // goods_id() {
    //   return this.$store.state.goods.editGoods_id;
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
    GetCaseById(value) {
      let resData = {
        method: "getCaseById",
        case_id: value
      };
      Case(resData).then(res => {
        this.form = res.data;
      });
    },
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
    },
    AddCase(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addCase();
        }
      });
    },
    resetForm() {
      document.getElementById("imgfile").value = "";

      this.form.case_url = "";
      document.getElementById("Uimg").setAttribute("src","");
  
      this.$emit("update:case_id", "");
      this.$refs["form"].resetFields();
    },
    addCase() {
      let method;

      let case_img = document.getElementById("imgfile").files[0];

      if (!case_img && !this.case_id) {
        this.$message({
          showClose: true,
          message: "请选择文件！",
          type: "error"
        });
        return;
      }

      let formData = new FormData();

      formData.append("case_introduction", this.form.case_introduction);
      formData.append("casetype_id", this.form.casetype_id);

      if (this.case_id) {
        method = "modifyCase";
        let newgoods_img = case_img ? case_img : this.form.case_url;
        formData.append("case_id", this.case_id);
        formData.append("case_img", newgoods_img);
      } else {
        method = "addCase";
        formData.append("case_img", case_img);
      }
      formData.append("method", method);

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

          this.close();
          this.$emit("refreshTable");
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
    GetCaseType() {
      let requestData = {
        method: "getCaseType",
        page: 0,
        limit: 0
      };
      Case(requestData).then(res => {
        this.caseItems = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetCaseType();
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