function searchIntern() {
    $.post('search_intern', getDetails(), function(data) {
        var status = JSON.parse(data);
        var tableData = ['<table><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date Of Birth</th><th>Intern Id</th>'];
        status.forEach(displayDetails(tableData));
        console.log("hello=====>", tableData.join('') + "</table>");
        $('.displayInternsDetails').html(tableData.join('') + "</table>")

    })
}

function displayDetails(tableData) {
    return function(intern) {
        tableData.push('<tr><td>' + intern.firstname + '</td><td>' + intern.middlename + '</td>' +
            '<td>' + intern.lastname + '</td><td>' + intern.dateofbirth.match(/\d+\-\d+\-\d+/g)[0] + '</td><td>' + intern.internid + '</td></tr>');
        return tableData;
    };
}


function getDetails() {
    var data = {};
    data.firstName = $('.mainContent form input[name="firstName"]').val();
    data.middleName = $('.mainContent form input[name="middleName"]').val();
    data.lastName = $('.mainContent form input[name="lastName"]').val();
    data.dateOfBirth = $('.mainContent form input[name="dateOfBirth"]').val();
    return data;
}
