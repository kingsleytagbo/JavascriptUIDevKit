const UserPageModule = (function (LocalStorageModule, HttpModule, PageModule) {
    /* our module code goes here */
    const DATA_KEYID = 'users';
    const formName = 'userForm';
    const database = LocalStorageModule;
    const Page = PageModule;
    const Http = HttpModule;

    return {
        cancelForm: function (self) {
            $(self).closest('.card').find('.card-body').toggle();
            $(self).closest('.card').find('.card-footer').toggle();
            this.clearForm();
        },

        toggleForm: function (self) {
            $(self).closest('.card').find('.card-body').toggle();
            $(self).closest('.card').find('.card-footer').toggle();
        },

        clearForm: function () {
            $('#' + formName).find('input, select, textarea').each(function () {
                $(this).val('');
            });
        },

        /* Load Data function */
        loadData: function () {
            let result = {};
            let html = '';
            let count = 0;

            if (Page.useApi()) {
                const response = Http.getUsers();
                response
                    .then(response => response.json())
                    .then(function (users) {
                        console.log({ users: users });
                        database.save(DATA_KEYID, users);
                        result = users;
                        html = '';
                        count = result.length + 1;
        
                        $.each(result, function (key, item) {
                            count -= 1;
                            html += '<tr>';
                            html += '<td  colspan="4">' + '<span><strong>' + '' + '</strong></span>' + '<a class="btn btn-outline-dark btn-block btn-sm" href="#" onclick="return UserPageModule.getbyID(' + "'" + item.id + "'" + ')"><i class="fa fa-edit"></i>&nbsp;Edit</a> </td>';
                            html += '<td  colspan="3">' + '<p><span>' + (item.user_login ? item.user_login : '') + '</td>';
                            html += '<td  colspan="3">' + '<p><span>' + (item.user_login ? item.user_login : '') + '</td>';
                            html += '<td  colspan="2">' + '<p><span>' + (item.id ? item.id : '') + '</td>';
                            html += '</tr>';
                        });
        
                        $('.tbody').html(html);

                    }).catch(async function (error) {
                        console.log({ error: error });
                    });
            }
            else {
                result = database.fetch(DATA_KEYID);
                html = '';
                count = result.length + 1;

                $.each(result, function (key, item) {
                    count -= 1;
                    html += '<tr>';
                    html += '<td  colspan="4">' + '<span><strong>' + '' + '</strong></span>' + '<a class="btn btn-outline-dark btn-block btn-sm" href="#" onclick="return UserPageModule.getbyID(' + "'" + item.Id + "'" + ')"><i class="fa fa-edit"></i>&nbsp;Edit</a> </td>';
                    html += '<td  colspan="3">' + '<p><span>' + (item.firstName ? item.firstName : '') + '</td>';
                    html += '<td  colspan="3">' + '<p><span>' + (item.lastName ? item.lastName : '') + '</td>';
                    html += '<td  colspan="2">' + '<p><span>' + (item.id ? item.id : '') + '</td>';
                    html += '</tr>';
                });

                $('.tbody').html(html);
            }
        },

        /* Select one item using a unique key */
        getbyID: function (ID) {

            /* get one item from a collection based on the item's unique key */
            const result = database.selectOne(ID, DATA_KEYID);
            console.log({result: result, ID: ID, DATA_KEYID: DATA_KEYID})

            /* Put the value of each field back into the form */
            $('#' + formName).find('input, select, textarea').each(function () {
                let id = $(this).attr('id');
                let val = (result[id]) || '';
                $(this).val(val);
            });

            $('#' + formName).closest('.card').find('.card-body').show();
            $('#' + formName).closest('.card').find('.card-footer').show();

            return false;
        },

        /* Save Data Function */
        saveForm: function () {
            /* allow a save if all the needed fields are present on the form */
            let res = UserPageModule.validate();
            if (res == false) {
                return false;
            }

            /* get the value of all the fields on the form */
            const model = {};
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

        deleteForm: function () {
            const model = {};

            $('#' + formName).find('input, select, textarea').each(function () {
                let key = $(this).attr('id');
                let val = $("#" + key).val() || ' ';
                model[key] = val;
            });

            database.removeOne(DATA_KEYID, model);

            UserPageModule.clearForm();
            UserPageModule.toggleForm($('#userHeader'));
            UserPageModule.loadData();
        },

        /* Valdidation using jquery */
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
        }
    }

}(LocalStorageModule, HttpModule, PageModule));