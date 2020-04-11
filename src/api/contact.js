import service from "@/utils/request.js";

export function contact(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}