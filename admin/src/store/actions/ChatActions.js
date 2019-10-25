import FB from '@/config/fbConfig'
const fs = table => FB.firestore().collection(table);
export const ChatActions = {
    READ_CHAT({ commit }, UID) {
        fs("chat").where("status", "==", "unread").where("from", "==", UID).where("uid", "==", UID).get().then(qs => {
            if (!qs.empty) {
               
                qs.docs.forEach(data => {
                    fs("chat").doc(data.id).update({
                        status: "read"
                    })
                })
            }
        })
    },
    KIRIM_CHAT({commit},payload){
        fs("chat").add(payload).then(()=>{
            
        })
    }
}