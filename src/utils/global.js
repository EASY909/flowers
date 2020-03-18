
export default {
    install(Vue, options) {
        Vue.prototype.alertInfos = function (params) {

            if (params.code != 1) {
                this.$message({
                    showClose: true,
                    message: params.msg,
                    type: "success"
                });
            } else {
                this.$message({
                    showClose: true,
                    message: params.msg,
                    type: "error"
                });
            }

            return new Promise((resolve, reject) => {
                resolve("成功！")
            })
        }
        Vue.prototype.confirm = function (params) {


            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                params.fun();

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });





        }

    }
}