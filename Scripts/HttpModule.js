const HttpModule = (function () {
    /* Http Module used for making Http api calls */
    const API_URL = 'https://nodejsappapi.herokuapp.com';

    return {

        login: function (username, password) {
            const body = {
                "login": {
                    "username": username,
                    "password": password
                }
            };
            return this.post('/login', body);
        },

        post: function (destination, body) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
            const result = fetch(`${API_URL}${destination}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(body),
            });
            const response = result;
            return response;
        }

    }

}());