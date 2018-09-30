$(document).ready(function () {
	console.log("in doc ready");
	// Any script not in a separate function, executes on startup 

	$.ajax({
		type: 'GET',
		url: 'a1.xml',
		dataType: 'xml',
		success: getAnimals,
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        } 
	});

	$('#background').hide();

	$('#backHead').click(function () {
		$('#background').toggle();
	});

}); // End of ready doc

function getAnimals(xml) {
	console.log('FUCK!');
	console.log(xml);
	$('#student').html($(xml).find("student").attr("studentNumber").val());
	$('#studentName').html($(xml).find("studentName").text());
	$('#studentNumber').html($(xml).find("studentNumber").text());
	$('#studentProg').html($(xml).find("studentProg").text());
	$('#studentCampus').html($(xml).find("studentCampus").text());

	$('#background').hide();

	// looping through each <animal>
	$('#main').html("");
	$(xml).find("animal").each(function (n) {
		$('#main').append(
			"<section class='list' id='p" + n + "'>" +
			$(this).attr("animalName") +
			"</section><br>"
		);

		$('#main').append("<ul id='d" + n + "'></ul>");
		$("#d" + n).hide();

		checkDisplay(n, xml);

	});
}

function checkDisplay(n, xml) {
	$("#p" + n).click(function () {
		$("#d" + n).html("");
		$(xml).find("animal:nth(" + n + ")").each(function () {
			$("#d" + n).append(
				"<p><strong>Picture: </strong>" +
				$(this).find("animalPic").text() + "</p>");

			$("#d" + n).append("Major Cities: <br>");
			$(this).find("animalFact").each(function () {
				$("#d" + n).append("<li>" + $(this).text() + "</li>");
			});
		});

		$("ul:not([id $= '" + n + "'])").hide("slow");
		$("#d" + n).toggle("slow");
	});
}