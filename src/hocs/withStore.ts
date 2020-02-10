import { observer, inject } from 'mobx-react'

export function withStore(Component, store = 'store') {
    return inject(store)(observer(Component))
}
