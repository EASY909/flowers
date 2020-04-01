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
export function addNews(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function getNewsById(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function deleteNews(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
