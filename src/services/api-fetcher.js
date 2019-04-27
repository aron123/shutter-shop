const baseUrl = '';

const get = (endpoint) => {
    return fetch(`${baseUrl}${endpoint}`)
        .then(res => res.json())
        .catch(err => console.error(err));
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
        .catch(err => console.error(err));
}

module.exports = {
    get, post
}