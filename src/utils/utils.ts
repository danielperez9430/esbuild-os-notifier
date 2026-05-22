export const omit = (obj: object, keys: string[]): Record<string, unknown> =>
    Object.fromEntries(
        Object.entries(obj)
            .filter(([k]) => !keys.includes(k))
    )

export const get = (value: unknown, path: string, defaultValue?: unknown): unknown =>
    path.split('.').reduce((acc: unknown, v: string) => {
        if (acc && typeof acc === 'object' && v in acc) {
            return (acc as Record<string, unknown>)[v]
        }
        return defaultValue
    }, value)