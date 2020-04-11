import service from "@/utils/request.js";
export function Goods(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
