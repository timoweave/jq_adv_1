
var all_users = [
        // {first_name:"", last_name:"", email_address:"", phone_no:"", table_row:""}
];

$(document).ready(function(){

        function get_row(user) { // retrieve or create
                if (user === undefined) {
                        return undefined;
                }
                if (user.table_row) {
                        return user.table_row;
                }
                var first = $('<td>').html(user.first_name);
                var last = $('<td>').html(user.last_name);
                var email = $('<td>').html(user.email_address);
                var phone = $('<td>').html(user.phone_no);
                var row = $('<tr>').append(first, last, email, phone);
                user.table_row = row;
                return row;
        }

        function list_users(table, users) { // list of unlisted users to the table
                if ((table === undefined) || (users === undefined)) {
                        return;
                }
                var body =
                users.map(function(user) {
                        if (user.table_row === undefined) {
                                var row = get_row(user);
                                table.children('tbody').append(row);
                        }
                });
        }

        function is_uniq_user(new_user, exist_users) {
                exist_users.map(function(exist_user) {
                        var same_name = ((exist_user.first_name === new_user.first_name) &&
                                         (exist_user.last_name === new_user.last_name));
                        var same_email = (exist_user.email_address === new_user.email_address);
                        var same_phone = (exist_user.phone_no == new_user.phone_no);
                        var same = same_name && same_email && same_phone;
                        if (same) {
                                return false;
                        }
                        return true;
                });
                return true;
        }

        function is_valid_user(new_user, exist_users) {
                // TBD : email format <user>@<site>.<domain>
                // TBD : first name, last name, no numeral, punctuation, ...
                // TBD : phone number... format...localization....
                // TBD : required entry field filled ...
                if (!is_uniq_user(new_user, exist_users)) {
                        return false;
                }
                return true;
        }

        function new_user(form) {
                if (form === undefined) {
                        return undefined;
                }
                // console.log(form.serialize());
                var labels = form.children('label');
                // console.log(labels.serialize());
                var first = labels.children('input[name="first_name"]');
                var last = labels.children('input[name="last_name"]');
                var email = labels.children('input[name="email_address"]');
                var phone = labels.children('input[name="contact_no"]');
                var user = {
                                "first_name" : first.val(),
                                "last_name" : last.val(),
                                "email_address" : email.val(),
                                "phone_no" : phone.val()
                           };
                if (!is_valid_user(user, all_users)) {
                        return undefined;
                }
                first.val("");
                last.val("");
                email.val("");
                phone.val("");
                // console.log(JSON.stringify(user));
                return user;
        }

        $('#new-user-form input[type="submit"]').on('click', function() {
                var form = $(this).parent();
                var user = new_user(form);
                if (user) {
                        all_users.push(user);

                        var table = $("#list-user-table");
                        list_users(table, all_users);
                }
                return false; // no form action, stay with this page.
        });
});
