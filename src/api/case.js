import service from "@/utils/request.js";

export function getCaseById(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function getCaseType(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function deleteCaseType(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function deleteCase(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
