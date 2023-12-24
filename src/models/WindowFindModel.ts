export interface WindowFind {
    active?: boolean
    className?: string
    title?: {
        value: string
        match: 'exact' | 'startsWith' | 'endsWith' | 'contains'
    }
    process?: number | string
}