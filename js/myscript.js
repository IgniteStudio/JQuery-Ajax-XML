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
			$(this).attr("animalName") + "<br/>" + "Scientific Name: " + 
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
	const ul = $("#d" + n);
	const sec = $("#p" + n);
	var image, t;
	

	sec.click(function () {

		sec.css('opacity', '1');
		ul.html("");

		x.find("animal:nth(" + n + ")").each(function () {
			
			t = $(this);	
			ul.append(
				"<p><strong>Picture: </strong>" +
				"<img class='pic' src=\"" + $(this).find("image[href]").attr("href") + 
				"\"/></p>"
			);
			t.find("animalFact").each(function () {
				ul.append("<li class='fact'>" + $(this).text() + "</li><br />");
				$('.fact').hide();
		
			
			});

			
		});
		
		$("ul:not([id $= '" + n + "'])").hide("slow");
		ul.toggle("slow");
		$('.pic').click(function() {
			$('.fact').toggle('slow');
		});
	});
}