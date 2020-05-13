import * as types from "../constants";

export const update = (users) => ({
    type: types.UPDATE_USERS,
    payload: {
        list: users
    }
})