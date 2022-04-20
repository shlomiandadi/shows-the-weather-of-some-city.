import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'


export interface FavoritesRow {
    id: string,
    name: string
}

// Define a type for the slice state
interface FavoritesState {
    data: FavoritesRow[]
}


// Define the initial state using that type
const initialState: FavoritesState = {
    data: localStorage.getItem("favs_location") ? JSON.parse(String(localStorage.getItem("favs_location"))) : []
}

export const FavoritesSlice = createSlice({
    name: 'Favorites',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        addFavorites: (state, action: PayloadAction<FavoritesRow>) => {
            state.data.push(action.payload)
            localStorage.setItem("favs_location", String(JSON.stringify(state.data)));
            alert(`Added ${action.payload.name} to favorites`)
        },

        removeFavorites: (state, action: PayloadAction<string>) => {
            const indexOfExisting = state.data.findIndex((Favorites) => {
                if (Favorites.id === action.payload) {
                    return true;
                }
            })
            if (indexOfExisting >= 0) {
                state.data.splice(indexOfExisting, 1);
                localStorage.setItem("favs_location", String(JSON.stringify(state.data)));
            }
        },

        resetFavorites: (state) => {
            state.data = [];
            localStorage.setItem("favs_location", String(JSON.stringify(state.data)));
        },
    },
})
// Other code such as selectors can use the imported `RootState` type
export const selectFavorites = (state: RootState) => state.Favorites
export default FavoritesSlice.reducer