import service from "@/utils/request.js";
export function getGoodsItems(data){
    
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}