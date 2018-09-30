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
	console.log(xml);
	$('#student').html($(xml).find("student").attr("studentNumber"));
	$('#studentName').html($(xml).find("studentName"));
	$('#studentNumber').html($(xml).find("studentNumber"));
	$('#studentProg').html($(xml).find("studentProg"));
	$('#studentCampus').html($(xml).find("studentCampus"));

	$('#background').hide();

	// looping through each <animal>
	$('#main').html("");
	$(xml).find("animal").each(function (n) {
		$('#main').append(
			"<section class='list' id='p" + n + "'>" +
			$(this).attr("animalName") + "\t\t" + 
			$(this).attr('scientificName') + "</section><br>"
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
				$(this).find('animalPic') + "</p>");

			$("#d" + n).append("Animal Facts: <br>");
			$(this).find("animalFact").each(function () {
				$("#d" + n).append("<li>" + $(this).text() + "</li>");
			});
		});

		$("ul:not([id $= '" + n + "'])").hide("slow");
		$("#d" + n).toggle("slow");
	});
}