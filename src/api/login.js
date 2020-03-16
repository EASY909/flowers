import service from "@/utils/request.js";
/**
 *登录
 */
export function login(data) {
   
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}