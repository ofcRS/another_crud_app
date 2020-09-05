// import { types, flow } from 'mobx-state-tree';
//
// import { createStore } from './createStore';
// import { inMemoryToken, refreshToken } from 'utils/auth';
// import { LoginResponseModelType, UserModel } from 'models';
//
// export const StoreModel = types
//     .model({
//         user: types.maybeNull(UserModel),
//         initializationInProgress: types.boolean,
//     })
//     .actions(self => ({
//         initApp: flow(function*() {
//             try {
//                 yield refreshToken();
//             } catch (error) {
//             } finally {
//                 self.initializationInProgress = false;
//             }
//         }),
//         login(response: LoginResponseModelType) {
//             if (response) {
//                 const { user, accessToken } = response;
//                 self.user = UserModel.create(user);
//                 inMemoryToken.accessToken = accessToken;
//             }
//         },
//     }));
//
// export const [StoreProvider, useStore] = createStore<typeof StoreModel>(
//     StoreModel.create({
//         initializationInProgress: false,
//         user: null,
//     })
// );
