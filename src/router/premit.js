import router from "./index";
import { getUserName, removeUserName } from "@/utils/login";
import store from "@/store/index"

const white = ['/login']
router.beforeEach((to, from, next) => {

 
    // console.log(from)
    // console.log(next)

    if (getUserName()) {
        if (to.path === "/login") {
            removeUserName();
            store.commit('login/remove_username');
            next();
        }else{
            next(); 
        }
    } else {
        // next("/login")
        if (white.indexOf(to.path) !== -1) {
            console.log(1)
            next();
        } else {
            console.log(2)
            next("/login");
        }
    }


})