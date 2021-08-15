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

var resultimages = [
	"img/kycklingbacon.png",
	"img/cake.jpg",
	"img/cake.jpg",
	"img/cake.jpg",
	"img/cake.jpg",
	"img/cake.jpg"
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
		["NEJ", 0, 0, 2, 0, 0, 0], 
		["JA", 0, 0, -2, 0, 0, 0], 
		["IBLAND", 0, 1, 0, 0, 0, 0]),

	new Question("Hur bäst är du?", 
		["Lagom", 0, 0, 0, 1, 1, 0], 
		["Bra", 0.5, 0, 0, 0, 0, 0],
		["Bäst", 1, 0, 0, 0, 0, 0],
		["Bästigast", 1.5, 0, 0, 0, 0, 0]),

	new Question("när jag var 15 åkte jag...", 
		["Moped", 0, 0, 0, 1, 0, 0], 
		["Epa", 1, 0, 0, 0, 0, 0],
		["Mopedbil", 1, 0, 0, 0, 0, 0],
		["Häst", 0, 0, 1, 0, 0, 0],
		["Mamma skutsa", 0, 0, 0, 1, 1, 0]),

	new Question("Vad är bäst?", 
		["GANT", 1, 0, 0, 0, 0, 0], 
		["GUCCI", 1, 0, 0, 0, 0, 0],
		["Ralph Lauren", 1, 0, 0, 0, 0, 0],
		["Usch", 0, 0, 0, 0, 0, 0]),

	new Question("Skaldjur äts bäst", 
		["på sture plan", 2, 0, 0, 0, 0, 0], 
		["(räkor) äts på smörgåstårta, självklart", 0, 3, 0, 0, 0, 0], 
		["äts ej! skaldjursallergiker!!!", 0, -3, 0, 0, 0, 0],
		["äts ej", 1, 0, 2, 1, 1, 1]),

	new Question("Är du förknippad med Danmark?", 
		["Ja", 0, 1, 0, 0, 0, 0], 
		["Nej", 0, -1, 0, 0, 0, 0],
		["Ibland", 0, 0, 0, 0, 0, 0],
		["Absolut inte", 0, -2, 0, 0, 0, 0]),

	new Question("politik är", 
		["något för nördar", 1, 0, 0, 0, 0, 0], 
		["tråkigt", 0, 0, 0, 0, 0, 0],
		["Jag vill bli Steffe 2.0", 0, 0, 1, 1, 1, 0]),

	new Question("Vilket citat är bäst?", 
		["Life is like a box of chocolates. You never know what you're gonna get.", 0, 2, 0, 0, 2, 0], 
		["May the Force be with you", 0, 0, 0, 0, 2, 0],
		["Life is soup. I am fork", -1, -1, 0, 0, 0, 0],
		["Live Love Life", 0, -1, 1, 0, 0, 0]),

	new Question("Måndag lunch, du har glömt matlådan", 
		["Jag glömmer ej matlåda", 0, 2, 1, 0, 0, 0], 
		["Kyckling och bacon", 2, 0, 0, 0, 0, 0],
		["Smörgåstårta", 0, 0, 0, 0, 0, 0]),

	new Question("Hur ofta hävfer du?", 
		["Aldrig hänt", 0, 0, 0, 1, 2, 0], 
		["Varje helg", 1, 0, 0, 0, 0, 0],
		["Vadå häfva?", 0, 0, 0, 1, 2, 0]),

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

	// determine which cake won
	for(var i=0;i<points.length;i++){
		var pts = points[i];
		if(bestMatch == -1 || pts >= points[bestMatch]){
			bestMatch = i;
		}
	}
	// bestMatch = the winning cake

	// pick a beautiful random name
	var randomName = names[Math.floor(Math.random() * names.length)];

	$("#result_matched").html(attributes[bestMatch] + "' " + randomName);
	$("#result_attributes").html(cakes[bestMatch]);

	$("#result_image").attr("src", resultimages[bestMatch]);
}

$(document).ready(function(){
	
	$("#start_btn").click(function(){
		$("#question_box").show();
		$("#intro_box").hide();

		showQ();
	})
});

// check questions

var total_points_p = [0, 0, 0, 0, 0, 0];
var total_points_n = [0, 0, 0, 0, 0, 0];
for(var i=0;i<questions.length;i++){
	var q = questions[i];

	

	for(var ans=0;ans<q.matrix.length;ans++){
		console.log(q.matrix[ans].length);
		
		total_points_p = total_points_p.map(function(p, index){
			var v = q.matrix[ans][index+1];
			return p + (v > 0 ? v : 0)
		});
		total_points_n = total_points_n.map(function(p, index){
			var v = q.matrix[ans][index+1];
			return p + (v < 0 ? v : 0)
		});

	}
	
}
console.log(total_points_p, total_points_n);