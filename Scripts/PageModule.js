const PageModule = (function (database) {
    /* Page Module used by every Page needs jQuery */

    return {

        clearForm: function (form) {
            $(form).find('input, select, textarea').each(function () {
                $(this).val('');
            });
        },

        toggleForm: function (form) {
            $(form).closest('.card').find('.card-header').toggle();
            $(form).closest('.card').find('.card-body').toggle();
            $(form).closest('.card').find('.card-footer').toggle();
        },

        validate: function (elements) {
            let isValid = true;

            if (elements != null && elements.length > 0) {
                for (let e = 0; e < elements.length; e++) {
                    const id = elements[e];
                    const $element = $('#' + id);
                    if ((!$element.val()) || ($element.val() === '')) {
                        $element.css('border-color', 'red');
                        isValid = false;
                    }
                    else {
                        $element.css('border-color', 'green');
                    }
                }
            }

            return isValid;
        }
    }

}(database));