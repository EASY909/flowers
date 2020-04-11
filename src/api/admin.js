import service from "@/utils/request.js";
export function getAdmin(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
