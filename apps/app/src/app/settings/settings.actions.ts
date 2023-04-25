import { createAction, props } from '@ngrx/store'
import { ISettingsState } from './settings.reducer'

export const changeLanguage = createAction(
    '[Settings] Change language',
    props<{ language: ISettingsState['language'] }>(),
)
