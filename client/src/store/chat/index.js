import fb from "@/config/firebaseConfig";
const fs = table => fb.firestore().collection(table)
export const chat = {

    actions: {
        KIRIM_CHAT({ commit }, payload) {
            commit("setLoading", true)
            fs("chat").add(payload).then(() => {
                fs("users").doc(payload.uid).update({
                    chat_updated: new Date()
                })
            })
        },
        READ_CHAT({ commit }, UID) {
            commit("setLoading", false)
            fs("chat").where("uid", "==", UID).where("from", "==", "admin").where("status", "==", "unread").get().then((qs) => {
                qs.forEach(data => {
                    fs("chat").doc(data.id).update({
                        status: "read"
                    }).then(() => {
                        commit("setLoading", false)
                    })
                })
            }).catch(() => {
                commit("setLoading", false)
            })
        }
    }

}