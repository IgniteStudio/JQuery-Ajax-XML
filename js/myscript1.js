$(document).ready(function () {

    console.log("in doc ready");// for testing purposes
    // Any script not in a separate function, executes on startup 

    $.ajax({
        type: 'GET',
        url: 'a1.xml',
        dataType: 'xml',
        success: getPersonal,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);// tests for errors
            alert("Error: " + errorThrown);// tests for errors
        }

    });

});
// function to get student personal information
function getPersonal(xml) {
    const x = $(xml);
    const pic = $('#studentPic');
    const num = $('#studentNumber');
    const name = $('#studentName');
    const prog = $('#studentProg');
    const camp = $('#studentCampus');

    var tag = x.find('studentImage');
    var image = tag.find('image[href]').attr('href');
    
    

    pic.html("<img src=\"" + image + "\"/>");
    num.html(x.find("student").attr("studentNumber"));
    num.hide();
    name.html(x.find("studentName"));
    name.hide();
    prog.html(x.find("studentProg"));
    prog.hide();
    camp.html(x.find("studentCampus"));
    camp.hide();

    pic.click(function(){
        num.slideToggle(500);
        name.slideToggle(1000);
        prog.slideToggle(2500);
        camp.slideToggle(3000);
    });
}