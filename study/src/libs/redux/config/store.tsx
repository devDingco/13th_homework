import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "@/libs/redux/modules/slices/counter";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "@/services/pokemon";

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
