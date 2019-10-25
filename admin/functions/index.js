const functions = require('firebase-functions');
const admin = require("firebase-admin")
admin.initializeApp(functions.config().firebase)

const buatNotifikasi = (notifikasi) => {
    return admin.firestore().collection('notifikasi').add(notifikasi).then(doc => {
        console.log("Notifikasi Di Tambahkan", doc)
    })
}

exports.bookingCreated = functions.firestore
    .document('booking/{bookingId}')
    .onCreate(doc => {
        const booking = doc.data()
        let BOOKING_ID = doc.id
        const notifikasi = {
            booking_id: BOOKING_ID,
            text: 'Booking ' + booking.villa,
            user: `${booking.name}`,
            created_at: admin.firestore.FieldValue.serverTimestamp(),
            status: 'unread'
        }
        return buatNotifikasi(notifikasi)
    })