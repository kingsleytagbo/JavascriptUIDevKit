const LoginPageModule = (function (database) {
    /* our module code goes here */
    const DATA_KEYID = 'LoginForm';
    const formName = 'loginForm';

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

        /* Save Data on a Form */
        saveForm: function () {
            /* allow a save if all the needed fields are present on the form */
            let res = UserPageModule.validate();
            if (res == false) {
                return false;
            }

            /* get the value of all the fields on the form */
            let model = {};
            $('#' + formName).find('input, select, textarea').each(function () {
                let key = $(this).attr('id');
                let val = $("#" + key).val() || ' ';
                model[key] = val;
            });

            /* save the values on the form to a data store */
            database.save(DATA_KEYID, model);
            UserPageModule.clearForm();

            UserPageModule.toggleForm($('#userHeader'));

            /* refresh the data on the page after saving it */
            UserPageModule.loadData();
        },

        /* Delete Data on a Form */
        deleteForm: function () {
            return false;
        },

        /* Validate data using jquery */
        validate: function () {
            let isValid = true;
            if ($('#firstName').val().trim() == "") {
                $('#firstName').css('border-color', 'red');
                isValid = false;
            }
            else {
                $('#firstName').css('border-color', 'green');
            }

            if ($('#lastName').val().trim() == "") {
                $('#lastName').css('border-color', 'red');
                isValid = false;
            }
            else {
                $('#lastName').css('border-color', 'green');
            }

            if ($('#sort').val().trim() == "") {
                $('#sort').css('border-color', 'red');
                isValid = false;
            }
            else {
                $('#sort').css('border-color', 'green');
            }

            return isValid;
        },

        getAuthenticationKey: function () {
            return 'JavascriptUIDevKit';
        },

        /* logout this user by removing authentication */
        logout: function () {
            database.logout(this.getAuthenticationKey());
        },
        
        /* checks if a valid authentication credential is present */
        isLoggedIn: function () {
            const data = database.getLogin(this.getAuthenticationKey());
            return data;
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
            console.log({isLoggedIn: isLoggedIn});
        }
    }

}(database));