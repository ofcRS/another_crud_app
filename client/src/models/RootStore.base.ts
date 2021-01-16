/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { PostModel, PostModelType } from "./PostModel"
import { UserModel, UserModelType } from "./UserModel"
import { LoginResponseModel, LoginResponseModelType } from "./LoginResponseModel"



/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryPosts="queryPosts",
queryHello="queryHello",
queryUsers="queryUsers",
queryMe="queryMe"
}
export enum RootStoreBaseMutations {
mutateRevokeRefreshTokens="mutateRevokeRefreshTokens",
mutateLogin="mutateLogin",
mutateRegister="mutateRegister"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(types.model()
  .named("RootStore")
  .extend(configureStoreMixin([['Post', () => PostModel], ['User', () => UserModel], ['LoginResponse', () => LoginResponseModel]], [], "js"))
  .props({

  })
  .actions(self => ({
  })))
