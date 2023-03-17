import { isDevMode } from '@angular/core'
import { delay } from 'rxjs'

export const devDelay = <T>() => delay<T>(isDevMode() ? 2000 : 0)
