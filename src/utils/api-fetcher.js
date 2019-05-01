const baseUrl = '';

const get = (endpoint) => {
    return fetch(`${baseUrl}${endpoint}`)
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw Error(res.message);
            }

            return res.data;
        });
};

const post = (endpoint, data) => {
    return fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw Error(res.message);
            }

            return res.data;
        });
};

module.exports = {
    get, post
}