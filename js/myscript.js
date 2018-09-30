$(document).ready(function () {
	console.log("in doc ready");// for testing purposes
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
		$('#background').fadeToggle(2000);
	});

}); // End of ready doc

// function to get animals 
function getAnimals(xml) {
	const x = $(xml);
	const m = $('#main');
	
	$('#background').hide();

	// looping through each <animal>
	m.html("");
	x.find("animal").each(function (n) {
		m.append(
			"<section class='list' id='p" + n + "'>" + "Common Name: " +
			$(this).attr("animalName") + "<br/><br/>" + "Scientific Name: " + 
			$(this).attr('scientificName') + "</section><br>"
		);

		m.append("<ul id='d" + n + "'></ul>");
		$("#d" + n).hide();

		checkDisplay(n, xml);

	});
}

// function to display animals
function checkDisplay(n, xml) {
	const x = $(xml);
	const d = $("#d" + n);
	const p = $("#p" + n);
	

	p.click(function () {
		p.css('opacity', '1');
		d.html("");
		x.find("animal:nth(" + n + ")").each(function () {
			var image = $(this).find("image[href]").attr("href");
			console.log(image);// for testing purposes
			d.append(
				"<p><strong>Picture: </strong>" +
				"<img src=\"" + image + "\"/>" + "</p>");

			d.append("Animal Facts: <br>");
			$(this).find("animalFact").each(function () {
				d.append("<li>" + $(this).text() + "</li>");
			});
		});

		$("ul:not([id $= '" + n + "'])").hide("slow");
		d.toggle("slow");
	});
}