import fb from "@/config/firebaseConfig";
const fs = table => fb.firestore().collection(table);
export const booking = {
    actions: {
        BOOKING({ commit }, payload) {
            commit("setLoading", true)
            fs("booking").add(payload).then(() => {
                commit("setLoading", false)
            }).catch(err => {
                commit("setError", err.message)
                commit("setLoading", false)
            })
        },
        BATALKAN_BOOKING({ commit }, BOOKING_ID) {
            fs("booking").doc(BOOKING_ID).delete().then(() => {
                console.log("booking dibatalkan")
            }).catch(err => {
                console.log("pembatalan booking erro")
            })
        }

    },


}