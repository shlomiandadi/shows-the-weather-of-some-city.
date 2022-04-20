import { configureStore } from '@reduxjs/toolkit'
import { FavoritesSlice } from './slice'
// ...
export const doApiGlobalAsync = async (url: string, method: string, body: any) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const store = configureStore({
  reducer: {
    Favorites: FavoritesSlice.reducer,
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch