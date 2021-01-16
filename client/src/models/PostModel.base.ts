/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PostBase
 * auto generated base class for the model PostModel.
 */
export const PostModelBase = ModelBase
  .named('Post')
  .props({
    __typename: types.optional(types.literal("Post"), "Post"),
    id: types.union(types.undefined, types.integer),
    title: types.union(types.undefined, types.string),
    body: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))


