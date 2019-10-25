
import FB from '@/config/fbConfig'
const fs = table => FB.firestore().collection(table);
export const AuthActions = {
    LOGIN_ADMIN({ commit }, payload) {
        commit("setLoading", true)
        FB.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
            FB.auth().onAuthStateChanged(ppl => {
                if (ppl) {
                    fs("admins").doc(ppl.uid).get().then(doc => {
                        if (!doc.exists) {
                            FB.auth().signOut()
                            commit("setError", "Email Anda Tidak Terdaftar Sebagai Admin")
                            commit("setLoading", false)
                            setTimeout(() => {
                                commit('clearError')
                            }, 3000)
                            return
                        }
                        const newAdmin = {
                            uid: ppl.uid,
                            nama: doc.data().nama,
                            email: doc.data().email,
                            pin: doc.data().pin
                        }
                        commit("setAdmin", newAdmin)
                        commit("setLoading", false)
                        commit('clearError')
                    })
                }
            })
        }).catch(err => {
            commit("setError", err.message)
            commit("setLoading", false)
            setTimeout(() => {
                commit('clearError')
            }, 3000)
        })
    },
    ADMIN_AUTO_LOGIN({ commit }) {
        commit("setLoading", true)
        FB.auth().onAuthStateChanged(admin => {
            if (admin) {
                fs("admins").doc(admin.uid).get().then(doc => {

                    if (!doc.exists) {
                        FB.auth().signOut()
                        return
                    }
                    const newAdmin = {
                        uid: admin.uid,
                        nama: doc.data().nama,
                        email: doc.data().email,
                        pin: doc.data().pin
                    }
                    commit('setAdmin', newAdmin)
                    commit("setLoading", false)

                })
            } else {
                commit("setLoading", false)
            }
        })

    },
    LOGOUT_ADMIN({ commit }) {
        commit("setLoading", true)
        FB.auth().signOut().then(() => {
            commit('setAdmin', null)
            commit("setLoading", false)
        }).catch(err => {
            commit("setLoading", false)
        })
    }
}
