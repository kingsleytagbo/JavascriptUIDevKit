const LoginPageModule = (function (LocalStorageModule, HttpModule, PageModule) {
    /* our module code goes here */
    const database = LocalStorageModule;
    const Page = PageModule;
    const Http = HttpModule;
    const self = this;

    return {

        /* Cancel data on a Form */
        cancelForm: function (self) {
            $(self).closest('.card').find('.card-body').toggle();
            $(self).closest('.card').find('.card-footer').toggle();
            this.clearForm();
        },

        /* Toggle data on a Form */
        toggleForm: function (self) {
            $(self).closest('.card').find('.card-body').toggle();
            $(self).closest('.card').find('.card-footer').toggle();
        },

        /* Clear data on a Form */
        clearForm: function () {
            $('#' + formName).find('input, select, textarea').each(function () {
                $(this).val('');
            });
        },

        /* Load Data to a Page */
        loadData: function () {
            return false;
        },

        /* Get one item from a collection based on the item's unique key */
        getbyID: function (ID) {
            return false;
        },

        saveToken: async function(token){
           database.saveLogin(this.getAuthenticationKey(), token);
        },

        /* Save Data on a Form */
        saveForm: function (form) {
            const self = this;
            /* allow a save if all the needed fields are present on the form */
            let res = this.validate();
            if (res == false) {
                return false;
            }

            /* get the value of all the fields on the form */
            const model = {};
            $(form).find('input, select, textarea').each(function () {
                let key = $(this).attr('id');
                let val = $("#" + key).val() || ' ';
                model[key] = val;
            });

            /* save the values on the form to a data store */
            //database.save(DATA_KEYID, model);
            // console.log({model: model, http: Http});
            if (model.username && model.password) {
                const response = Http.login(model.username, model.password);
                response
                .then(response => response.json())
                .then(function (result) {
                    /**
                     * On Success of Login authentication, save the authentication / login token
                     */
                    if (result.authenticated === true) {
                        self.saveToken(result.auth_token);
                        Page.gotoPage('/');
                        //onSuccess();
                    }
                    else {
                        /**
                         * On Failure of Login authentication, clear the authentication token 
                         */
                        self.saveToken(null);
                        Page.gotoPage('/login.html');
                        //await setToken(null);
                        ///onFailure();
                    }
                })
                .catch(async function (error) {
                        self.saveToken(null);
                        console.log({ error: error });
                    });
            }

            // Clear form only if Login is successful
            //Page.clearForm($(form));

            // Toggle only if Login is successful
            //Page.toggleForm($(form));

            /* refresh the data on the page after saving it */
            // Page.loadData();
        },

        /* Delete Data on a Form */
        deleteForm: function () {
            return false;
        },

        /* Validate data using jquery */
        validate: function () {
            let isValid = Page.validate(['username', 'password']);
            return isValid;
        },

        getAuthenticationKey: function () {
            return 'JavascriptUIDevKit';
        },

        /* logout this user by removing authentication */
        logout: function () {
            database.logout(this.getAuthenticationKey());
            Page.gotoPage('/login.html');
        },
        
        /* checks if a valid authentication credential is present */
        isLoggedIn: function () {
            const data = database.getLogin(this.getAuthenticationKey());
            const result = (data && new Date(data)) ? true: false;
            return result;
        },

        init: function(){
            const isLoggedIn = this.isLoggedIn();
            if(isLoggedIn === true){
                $('#navItemLogin').hide();
                $('#navItemLogout').show();
            }
            else{
                $('#navItemLogin').show();
                $('#navItemLogout').hide();
            }
        }
    }

}(LocalStorageModule, HttpModule, PageModule));