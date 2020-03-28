import service from "@/utils/request.js";
export function getGoodsItems(data) {

    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function addGoodsItems(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function modifyGoodsItems(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function getGoodsItemById(data) {
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function deleteGoodsItems(data){
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function getGoods(data){
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}

export function deleteGoods(data){
    return service.request({
        method: 'post',
        url: 'WebMainServlet',
        data
    })
}
export function addGoods(data){
    return service.request({
        method: 'post',
        url: 'WebUploadServlet',
        data
    })
}
