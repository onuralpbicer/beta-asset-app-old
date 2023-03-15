import Router from 'koa-router'
import login from './login'

const router = new Router({
    prefix: '/auth',
})

router.post('/', login)

export default router
