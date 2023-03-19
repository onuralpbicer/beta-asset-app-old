export type PartialPick<T, U extends keyof T> = Partial<Pick<T, U>> & Omit<T, U>
export type PartialOmit<T, U extends keyof T> = Partial<Omit<T, U>> & Pick<T, U>

export type Loading<T extends object> = T & {
    loading: boolean
}
