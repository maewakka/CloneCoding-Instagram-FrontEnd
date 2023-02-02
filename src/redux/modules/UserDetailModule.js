import {createAction, handleActions} from "redux-actions";
import produce from "immer";

export const userDetailItem = {
    email: '',
    profileUrl: '',
    nickname: '',
    gender: '',
    introduce: '',
    phone: ''
}

const INIT = 'userDetail/INIT';
const REMOVE = 'userDetail/DELETE';

export const init = createAction(INIT)
export const remove = createAction(REMOVE);

const userDetail = handleActions(
    {
        [INIT]: (state, action) => {
            const data = action.payload;
            return produce(state, draft => {
                draft.email = data.email;
                draft.nickname = data.nickname;
                draft.phone = data.phone;
                draft.profileUrl = data.profileUrl;
                draft.introduce = data.introduce;
                draft.gender = data.gender;
            })
        },
        [REMOVE]: (state, action) => {

        },
    },
    userDetailItem
)

export default userDetail;