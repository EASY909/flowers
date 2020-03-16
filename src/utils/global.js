
export default {
    install(Vue, options) {
        Vue.prototype.goComAndInfos = function (params) {
            this.$router.push({

                path: `/index/goodsinfo/${params.goodsId}/${params.title}`
                // name: "goodsinfo",
                // query: {
                //     goodsid: params, 
                // }
            });


        }
    }
}