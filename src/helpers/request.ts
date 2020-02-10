const timeoutableFetch = (url, options = {}) => {
    let { timeout = 10000, ...rest } = options
    if (rest.signal) {
        throw new Error('Signal not supported')
    }
    const controller = new AbortController()
    const { signal } = controller
    
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(window.location.reload())
            controller.abort()
        }, timeout)
        fetch(url, { signal, ...rest })
            .then((response) => {
                if (response.status !== 200) {
                    return response.text().then((text) => {
                        reject()
                    })
                }
                return response.json()
            })
            .catch(() => window.location.reload())
            .finally(() => clearTimeout(timer))
    })
}

export default timeoutableFetch
