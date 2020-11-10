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
            const email = user.user_login;
            const password = user.user_pass;
            const newUser = {
                user_login:email, user_pass:password, user_nicename:password,user_email:email,display_name:email,
                  user_status:1,user_registered:1,user_url:'',user_activation_key:'',spam:0,
                  deleted:0,site_id:1
              };
            const body = {
                "user": newUser
            };
            console.log({ 'createUser': user, newUser: newUser});
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