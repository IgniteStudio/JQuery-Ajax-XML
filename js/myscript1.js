$(document).ready(function () {

    console.log("in doc ready");
    // Any script not in a separate function, executes on startup 

    $.ajax({
        type: 'GET',
        url: 'a1.xml',
        dataType: 'xml',
        success: getPersonal,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }

    });

});

function getPersonal(xml) {
    console.log(xml);

}