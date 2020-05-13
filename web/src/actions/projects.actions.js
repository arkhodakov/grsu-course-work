import * as types from "../constants";

export const update = (projects) => ({
    type: types.UPDATE_PROJECTS,
    payload: {
        list: projects
    }
})