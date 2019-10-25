export const dialog = {
    state: {
        dialog: {
            SIGNIN_DIALOG: false,
            SIGNUP_DIALOG: false,
            CHAT_DIALOG: false,
            START_DIALOG: false,
            END_DIALOG: false,
            NOTIF_DIALOG: false
        }
    },
    mutations: {
        setDialog(state, payload) {
            state.dialog[payload] = !state.dialog[payload]
        }
    },
    actions: {
        MANAGE_DIALOG({ commit }, payload) {
            commit("setDialog", payload)
        }
    },
    getters: {
        dialog(state) {
            return state.dialog
        }
    }
}