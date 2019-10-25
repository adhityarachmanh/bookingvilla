import FB from '@/config/fbConfig'
const fs = table => FB.firestore().collection(table);
export const NotifActions = {
    READ_NOTIF({ commit }, notifikasi) {
        fs("notifikasi").where("status", "==", 'unread').get().then(qs => {
            qs.docs.forEach(d => {
                fs("notifikasi").doc(d.id).update({
                    status: 'read'
                })
            })
        })
    }
}