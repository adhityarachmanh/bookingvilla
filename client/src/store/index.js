import Vue from 'vue'
import Vuex from 'vuex'
import { User } from './User';
import { shared } from './shared';
import { chat } from './chat';
import { dialog } from './dialog';
import { booking } from './booking';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        User: User,
        shared: shared,
        chat: chat,
        dialog: dialog,
        booking: booking

    }
})
