import { types } from "mobx-state-tree";

export const IconModel = types.model({
    name: types.string,
    path: types.string
})