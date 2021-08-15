//
// NAMEN vad gor du har och snoookar ;)) 
// made by Vega & Marroozhi :)
//

var names = [
	"bob", "lasse", "anka", "juan", "axel", "albin", "johannes", "kim", "rutger", "sture",
	"bettan", "denise", "brittgun", "lillemor", "ellen", "hanna", "amanda", "xantippa",
	"alberte", "margerete", "yvonne"
];

var points = [0, 0, 0, 0, 0, 0];

var cakes = [
	"Kyckling och bacon", // 0
	"Havets frukter", // 1
	"Vegetarisk", // 2
	"Ost och skinka glutenfri", // 3
	"Ost och skinka + leverpastej", // 4
	"Regalskeppet"
];

var attributes = [
	"pesto",
	"självständig",
	"bra matlådor",
	"(s)kinking",
	"strumpor och sandalorer",
	"regal?"
];

function Question(title){
	this.title = title;
	var args = [].slice.call(arguments);
	args.shift();
	this.matrix = args;
}

// question point matrix
var questions = [
	new Question("Är du en köttätare", 
		["NEJ", 0, 0, 1, 0, 0, 0], 
		["JA", 0, 0, -1, 0, 0, 0], 
		["IBLAND", 0, 1, 0, 0, 0, 0]),

	new Question("Hur bäst är du?", 
		["Lagom", 0, 0, 0, 1, 0, 0], 
		["Bra", 0.5, 0, 0, 0, 0, 0],
		["Bäst", 1, 0, 0, 0, 0, 0],
		["Bästigast", 1.5, 0, 0, 0, 0, 0]),

	new Question("Vad är bäst?", 
		["GANT", 1, 0, 0, 0, 0, 0], 
		["GUCCI", 1, 0, 0, 0, 0, 0],
		["Ralph Lauren", 1, 0, 0, 0, 0, 0],
		["Usch", 0, 0, 0, 0, 0, 0]),

	new Question("Måndag lunch, du har glömt matlådan", 
		["Jag glömmer ej matlåda", 0, 1, 1, 0, 0, 0], 
		["Kyckling och bacon", 1, 0, 0, 0, 0, 0],
		["Smörgåstårta", 0, 0, 0, 0, 0, 0]),
];

var current_question = 0;

// show question based on "current_question"
function showQ(){
	$("#q_progress").html("FRÅGA " + (current_question+1) + " / " + questions.length);

	var question = questions[current_question];
	$("#q_title").html(question.title);

	
	var matrix = question.matrix;
	$("#boxes").empty();
	for(var i=0;i<matrix.length;i++){
		$("#boxes").append('<div class="box">' + matrix[i][0] + '</div>');
	}

	$(".box").click(function(){
		var index = $(this).index();

		var question_points_matrix = questions[current_question].matrix[index];

		points = points.map((p, index) => p + question_points_matrix[index+1]);
		console.log(points);

		current_question++;

		$(".box").not($(this)).animate({opacity: 0}, function(){

			nextQ();

			$(this).delay(400).animate({opacity: 1});
		});
	})
}

// next question
function nextQ(){

	if(current_question == questions.length){
		showResult();
	}else{
		showQ();
	}
}


// show final result
function showResult(){
	$("#question_box").hide();
	$("#result_box").show();

	var bestMatch = -1;

	for(var i=0;i<points.length;i++){
		var pts = points[i];
		if(bestMatch == -1 || pts >= points[bestMatch]){
			bestMatch = i;
		}
	}

	var randomName = names[Math.floor(Math.random() * names.length)];

	$("#result_matched").html(attributes[bestMatch] + "' " + randomName);
	$("#result_attributes").html(cakes[bestMatch]);
}

$(document).ready(function(){
	showQ();
});