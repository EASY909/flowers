<!--  -->
<template>
  <div id="goodsInfo">
    <el-button
      type="danger"
      @click="compDialog=true"
      class="marbom30"
      icon="el-icon-circle-plus-outline"
    >添加</el-button>

    <Table :tableConfig="tableConfig">
      <template v-slot:images="rowData">
        <img class="goods_url" :src="rowData.rowData.goods_url" />
      </template>
      <template v-slot:options="rowData">
        <el-button
          @click="handleEdit(rowData.rowData.goods_id)"
          type="success"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          @click="DeleteGoods(rowData.rowData.goods_id)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        ></el-button>
      </template>
    </Table>

    <!-- <easyDialog @loadTable="loadGetGoodsItems" :flag.sync="easyDialog" :data="dialogInfo" /> -->
    <!-- <easyDialog :flag="easyDialog" @close="close" /> -->

    <!-- <easyDialogEdit
      @loadTable="loadGetGoodsItems"
      :items_id="items_id"
      :flag.sync="easyDialogEdit"
      :data="dialogInfo"
    />-->
    <CompDialog ref="CompDialog" :dialogConfig.sync="dialogConfig" @getDoods="getDoods" :flag.sync="compDialog">
      <template v-slot:uploadImg="dialogData">
      
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          {{dialogData.data}}
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </template>

      <template v-slot:select="dialogData">

        <el-select v-model="value" placeholder="请选择">
           {{dialogData.data}}
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </CompDialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getGoods, deleteGoods } from "@/api/goods";
import Table from "@c/table";
import CompDialog from "@c/compDialog/compDialog";
import { RequestUrl } from "@/api/requestUrlData.js";
export default {
  name: "goodsInfo",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Table,
    CompDialog
  },
  data() {
    //这里存放数据
    return {
      tableData: [],
      imageUrl: "",
      goods_id: "",
      compDialog: false,
      easyDialogEdit: false,
      dialogConfig: {
        title: "添加产品信息",
        dinput: [
          {
            label: "产品类别名",

            name: "goods_name"
          },
          {
            label: "类别",

            columnType: "slot",
            slotName: "select",
            name: "items_id"
          },
          {
            label: "价格",

            name: "price"
          },
          {
            label: "数量",

            name: "num"
          },
          {
            label: "图片",

            columnType: "slot",
            slotName: "uploadImg",
            name: "goods_img"
          }
        ]
      },
      tableConfig: {
        tHead: [
          {
            label: "产品编号",
            prop: "goods_id"
          },
          {
            label: "产品名",
            prop: "goods_name"
          },
          {
            label: "产品类别号",
            prop: "items_id"
          },
          {
            label: "价格",
            prop: "price"
          },
          {
            label: "数量",
            prop: "num"
          },
          {
            label: "图片",
            columnType: "slot",
            prop: "images",
            slotName: "images"
          },
          {
            label: "操作",
            columnType: "slot",
            prop: "options",
            slotName: "options"
          }
        ],
        requestUrlData: {
          method: "post",
          url: "WebMainServlet",
          data: {
            method: RequestUrl.getGoods,
            page: 1,
            limit: 5
          }
        },
        pagination: true,
     
      },
         options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {

  },
  //方法集合
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    DeleteGoods(val) {
      this.goods_id = val;
      this.confirm({
        fun: this.dodeleteGoods
      });
    },
    dodeleteGoods() {
      let requestData = {
        method: "deleteGoods",
        goods_id: this.goods_id
      };
      deleteGoods(requestData).then(res => {
        this.alertInfos(res);
        this.loadGetGoods(1, 5);
      });
    },
    loadGetGoods(page, limit) {
      let requestData = {
        method: "getGoods",
        page: page,
        limit: limit
      };
      getGoods(requestData)
        .then(response => {
          if (response.code == 0) {
            this.total = response.count;
            this.tableData = response.data;
          }
        })
        .catch(error => {});
    },
    getDoods(){
      // console.log(111)
      console.log(this.$refs.CompDialog)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadGetGoods(this.current_page, 5);
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
.goods_url {
  width: 80px;
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
</style>