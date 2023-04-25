import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store'
import { changeLanguage } from './settings.actions'

export const SETTINGS_FEATURE_KEY = 'settings'

export interface ISettingsState {
    language: 'tr' | 'en'
}

const initialState: ISettingsState = {
    language: 'tr',
}

export const reducer = createReducer(
    initialState,
    on(changeLanguage, (state, action) => ({
        ...state,
        language: action.language,
    })),
)

const selector = createFeatureSelector<ISettingsState>(SETTINGS_FEATURE_KEY)

export const selectLanguage = createSelector(
    selector,
    (state) => state.language,
)
