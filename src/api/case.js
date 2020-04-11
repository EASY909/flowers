import service from "@/utils/request.js";
export function Case(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
