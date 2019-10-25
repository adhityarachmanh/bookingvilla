import FB from '@/config/fbConfig'
const fs = table => FB.firestore().collection(table);
export const BookingAction = {
    TERIMA_BOOKING({ commit }, BOOKING_ID) {
        fs("booking").doc(BOOKING_ID).update({
            status: Boolean(true)
        })
    }
}