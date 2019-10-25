
import { AuthActions } from './AuthActions'
import { ChatActions } from './ChatActions';
import { NotifActions } from './NotifActions';
import { BookingAction } from './BookingAction';

export default {
    ...AuthActions,
    ...ChatActions,
    ...NotifActions,
    ...BookingAction

}
