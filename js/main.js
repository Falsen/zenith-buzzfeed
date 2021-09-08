//
// NAMEN vad gor du har och snoookar ;)) 
// made by Vega & Marroozhi :)
//

var debug = true;

var names = [
	"bob", "lasse", "anka", "juan", "axel", "albin", "johannes", "kim", "rutger", "sture",
	"bettan", "denise", "brittgun", "lillemor", "ellen", "hanna", "amanda", "xantippa",
	"alberte", "margerete", "yvonne"
];

var points = [0, 0, 0, 0, 0];

var short_cakes = [ "K&B", "HF", "V", "OS+GF", "OS+LP"];

// name of all different cakes (indexed)
var cakes = [
	"Kyckling och bacon", // 0
	"Havets frukter", // 1
	"Vegetarisk", // 2
	"Ost och skinka glutenfri", // 3
	"Ost och skinka + leverpastej", // 4
];

// indexed attributes
var attributes = [
	"testo",
	"självständiga",
	"bra-matlåds",
	"(s)kinkinga",
	"strumpor-och-sandaler"
];

//result images
var resultimages = [
	"img/kycklingbacon.png",
	"img/havetsfrukter.png",
	"img/vego.png",
	"img/glutenklubben.png",
	"img/leverpastej.png"
];

// object for holding questions
function Question(title){
	this.title = title;
	var args = [].slice.call(arguments);
	args.shift();
	this.matrix = args;
}

// question point matrix
var questions = [
	new Question("Är du en köttätare", 
		["NEJ", -2, -1, 3, -2, -2], 
		["JA", 0, 0, -2, 0, 0], 
		["IBLAND", 0, 1, 0, 0, 0]),

	new Question("Hur bäst är du?", 
		["Lagom", 0, 0, 0, 2, 2], 
		["Bra", 0.5, 0, 0, 1, 1],
		["Bäst", 1, 0, 0, 0, 0],
		["Bästigast", 1.5, 0, 0, 0, 0]),

	new Question("när jag var 15 åkte jag...", 
		["Moped", 0, 0, 0, 1, 0], 
		["Epa", 1, 0, -1, 0, 0],
		["Mopedbil", 1, 1, 0, 0, 0],
		["Häst", 0, 0, 1, 0, 0],
		["Mamma skutsa", 0, 0, 0, 1, 1]),

	new Question("Vad är bäst?", 
		["GANT", 1, 0, 0, 0, 0], 
		["GUCCI", 1, 0, 0, 0, 0],
		["Ralph Lauren", 1, 0, 0, 0, 0],
		["Usch", 0, 0, 0.5, 0.5, 0.5]),

	new Question("Är du glutenintolerant?", 
		["JA", 0, 0, 0, 8, 0],
		["NAJ", 0, 0, 0, 0, 0]),

	new Question("Skaldjur äts bäst", 
		["på sture plan", 2, 0, 0, 0, 0], 
		["som räkmacka!", 0, 3, 0, 0, 0], 
		["äts ej! skaldjursallergiker!!!", 0, -5, 0, 0, 0],
		["äts ej", 1, 0, 2, 1, 1]),

	new Question("Är du förknippad med Danmark?", 
		["Ja", 0, 1.5, 0, 0, 0], 
		["Nej", 0, -1, 0, 0, 0],
		["Ibland", 0, 0.5, 0, 0, 0],
		["Absolut inte", 0, -2, 0, 0, 0]),

	new Question("politik är", 
		["något för nördar", 1, 0, 0, 0, 0], 
		["tråkigt", 0, 0, 0, 0, 0],
		["Jag vill bli Steffe 2.0", 0, 0, 1, 1, 1]),

	new Question("Vilket citat är bäst?", 
		["Life is like a box of chocolates. You never know what you're gonna get.", 0, 2, 0, 0, 2], 
		["May the Force be with you", 0, 0, 0, 0, 2],
		["Life is soup. I am fork", -1, -1, 0, 0, 0],
		["Live Love Life", 0, -1, 1, 0, 0]),

	new Question("Måndag lunch, du har glömt matlådan", 
		["Jag glömmer ej matlåda", 0, 2, 1, 0, 0], 
		["Baguette med kycklingröra", 2, 0, 0, 0, 0],
		["Smörgåstårta", 0, 0, 0, 0, 0]),

	new Question("Hur ofta hävfer du?", 
		["Aldrig hänt", 0, 0, 0, 1, 2], 
		["Det händer", 0, 0, 0, 0, 0],
		["Varje helg", 1.5, 0, 0, 0, 0],
		["Vadå häfva?", 0, 0, 0, 1, 2]),
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
		var text = matrix[i][0];
		if(debug && false){
			text += "<br>" + matrix[i]
				.splice(1)
				.map((x, index) => "<span style='color:black;'>"+short_cakes[index] + "</span>: " + x)
				.filter(function(x, index){
					console.log(x,index)
					return true;
				})
				.join(" ");
		}
		$("#boxes").append('<div class="box d-flex align-items-center"><div class="container">' + text + '</div></div>');
	}

	// time when question was shown
	var time = new Date().getTime();

	// selects alternative
	$(".box").click(function(){
		var index = $(this).index();

		var question_points_matrix = questions[current_question].matrix[index];

		points = points.map((p, index) => p + question_points_matrix[index+1]);
		console.log(points);

		current_question++;

		$(".box").not($(this)).animate({opacity: 0}, function(){

			$(this).delay(900, function(){
				nextQ();
			})
		});

		var took = (new Date().getTime() - time)/1000;

		// anonymous stats
		gtag("event", "submit_question", {
			question_id: current_question-1,
			question: question,
			answer: $(this).html(),
			time: took
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

	document.body.style.overflow = '';

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

	$("#result_matched").html(attributes[bestMatch] + " " + randomName);
	$("#result_attributes").html(cakes[bestMatch]);

	$("#result_image").attr("src", resultimages[bestMatch]);

	gtag("event", "finish_quiz", {
		attribute: attributes[bestMatch],
		name: randomName,
		cake: cakes[bestMatch]
	});
}

$(document).ready(function(){
	
	$("#start_btn").click(function(){
		$("#question_box").show();
		$("#intro_box").hide();

		showQ();
		document.body.style.overflow = 'hidden';
		gtag("event", "start_quiz");
	})
});

// check questions

if(debug){

	var total_points_p = [0, 0, 0, 0, 0];
	var total_points_n = [0, 0, 0, 0, 0];
	for(var i=0;i<questions.length;i++){
		var q = questions[i];
	
		
	
		for(var ans=0;ans<q.matrix.length;ans++){
			console.log(q.matrix[ans].length);
			
			total_points_p = total_points_p.map(function(p, index){
				var v = q.matrix[ans][index+1]/(q.matrix.length);
				return p + (v > 0 ? v : 0)
			});
			total_points_n = total_points_n.map(function(p, index){
				var v = q.matrix[ans][index+1]/(q.matrix.length);
				return p + (v < 0 ? v : 0)
			});
	
		}
		
	}
	console.log(
		total_points_p.map(x => Math.round(x*10)/10), 
		total_points_n.map(x => Math.round(x*10)/10)
	);
}
