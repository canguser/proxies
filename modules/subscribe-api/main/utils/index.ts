export function isBasicDataType(data): boolean {
    return typeof data !== 'object' || data === null
}
