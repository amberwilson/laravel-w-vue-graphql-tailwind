export function graphQLErrors (error) {
    const hasInternal = errors => errors.some(e => e.isInternal)
    const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.isInternal).concat(err) : errors

    return replaceInternal((error.graphQLErrors || []).map(err => ({
        message: err.debugMessage || err.message,
        isInternal: !(err?.path?.length),
    })), { message: 'Oop... there was an error' })
}
