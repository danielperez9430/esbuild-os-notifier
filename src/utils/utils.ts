export const omit = (obj: Object, keys: Array<string>): Object =>
    Object.fromEntries(
        Object.entries(obj)
            .filter(([k]) => !keys.includes(k))
    )

export const get = (value: any, path: string, defaultValue: any) => {
    return String(path).split('.').reduce((acc, v) => {
        try {
            acc = acc[v] || defaultValue
        } catch (e) {
            return defaultValue
        }
        return acc
    }, value)
} 