import * as types from "../constants";

export const update = (issues) => ({
    type: types.UPDATE_ISSUES,
    payload: {
        list: issues
    }
})