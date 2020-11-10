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

        getUsers: function () {
            const body = {};
            return this.post('/users/getUsers', body);
        },

        createUser: function (user) {
            console.log({ 'createUser': user });
            const body = {
                "user": {
                    user
                }
            };
            return this.post('/users/createUser', body);
        },

        updateUser: function (user) {
            console.log({ 'updateUser': user });
            const body = {
                "user": {
                    user
                }
            };
            return this.post('/users/updateUser', body);
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