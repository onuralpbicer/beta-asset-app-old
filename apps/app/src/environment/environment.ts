import { isDevMode } from '@angular/core'

interface Environment {
    apiUrl: string
}

const prodEnv: Environment = {
    apiUrl: '', // todo
}

const devEnv: Environment = {
    apiUrl: 'http://localhost:3000',
}

const environment = isDevMode() ? devEnv : prodEnv

export default environment
