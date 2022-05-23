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

export class AuthenticationError extends Error {}

export const colorMap500 = {
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
}
