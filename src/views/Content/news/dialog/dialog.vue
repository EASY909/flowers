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
        <el-form-item label="新闻类别" prop="newstype_id" required>
          <el-select v-model="form.newstype_id" placeholder="请选择新闻类别">
            <el-option
              :label="items.newstype_name"
              :key="items.newstype_id"
              v-for="items in newsItems"
              :value="items.newstype_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键词" prop="keyword" required>
          <el-input v-model="form.keyword"></el-input>
        </el-form-item>

        <el-form-item label="新闻标题" prop="news_title" required>
          <el-input v-model="form.news_title"></el-input>
        </el-form-item>

        <el-form-item label="新闻内容" prop="news_content" required>
          <el-input type="textarea" v-model="form.news_content"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="news_time">
          <el-input v-model="form.news_time" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddNews('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getNewsType, addNews, getNewsById } from "@/api/news.js";
import axios from "axios";
export default {
  name: "newsDialog",
  //import引入的组件需要注入到对象中才能使用
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    news_id: {
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
        newstype_id: "",
        news_title: "",
        news_time: new Date().toLocaleDateString(),
        keyword: "",
        news_content: ""
      },
      newsItems: [],
      rules: {
        newstype_id: [
          { required: true, message: "请选择新闻类别", trigger: "change" }
        ],
        news_title: [
          { required: true, message: "请输入关键词", trigger: "blur" }
        ],
        keyword: [{ required: true, message: "请输入标题", trigger: "blur" }],
        news_content: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
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
    GetGoodsById(value) {
      let resData = {
        method: "getNewsById",
        news_id: value
      };
      getNewsById(resData).then(res => {
        this.form = res.data;
        this.news_time=this.form.news_time;
      });
    },
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
    },
    AddNews(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.DialogAddNews();
        }
      });
    },
    resetForm() {
      // this.goods_id = "";
      // this.$store.commit("goods/SETEditGoodsId", "");
      // document.getElementById("Uimg").setAttribute("src", "");
      this.$emit("update:news_id", "");
      this.$refs["form"].resetFields();
    },
    DialogAddNews() {
      if (this.news_id) {
        this.form.method = "modifyNews";
        this.form.news_id = this.news_id;
      } else {
        this.form.method = "addNews";
        delete this.form.news_id;
      }

      addNews(this.form).then(res => {
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });
          this.$emit("refreshTable");
          this.close();
        }
      });
    },

    GetNewsType() {
      let requestData = {
        method: "getNewsType",
        page: 0,
        limit: 0
      };
      getNewsType(requestData).then(res => {
        this.newsItems = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetNewsType();
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