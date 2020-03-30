import service from "@/utils/request.js";

export function getNewsType(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function deleteNewsType(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
