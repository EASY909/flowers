import service from "@/utils/request.js";

export function News(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

