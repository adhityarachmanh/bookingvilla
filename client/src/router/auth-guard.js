import store from "../store";

export const authGuard = (to, from, next) => {
    if (store.getters.user) {
        next()
    }else{
        next
    }
}