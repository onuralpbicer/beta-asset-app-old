import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectUserID } from './login.reducer'
import { map } from 'rxjs'

export const authGuard: CanActivateFn = () => {
    const user_id$ = inject(Store).select(selectUserID)
    const router = inject(Router)

    return user_id$.pipe(
        map((user_id) => (user_id ? true : router.parseUrl('/login'))),
    )
}
