export function graphQlErrors (error) {
    const hasInternal = errors => errors.some(e => e.isInternal)
    const replaceInternal = (errors, err) => hasInternal(errors) ? errors.filter(e => !e.isInternal).concat(err) : errors

    if (error?.networkError && error.networkError.statusCode === 419) {
        throw new AuthenticationError('Unauthenticated')
    }

    return replaceInternal((error.graphQLErrors || []).map(err => {
        if ('validation' === err.extensions?.category) {
            return Object.keys(err.extensions.validation)
                .map((key) => err.extensions.validation[key])
                .flat()
                .map((error) => ({ message: error }))
        }

        return {
            message: err.debugMessage || err.message,
            isInternal: !(err?.path?.length),
        }
    }), { message: 'Oop... there was an error' }).flat()
}
