/*The heart of the operation*/

/* Data Pathing */
var data_path = "_data/";
var umbrella_file = "_data/umbrellas.json";


/* item Classes*/

var genreButton = '.subgenre_btn';

$(window).load(function(){
	buildPage();
	prepButtons();
	
});


function buildPage(){
	$.getJSON( umbrella_file, function( data ) {
		var backbone_files=[];
		$.each(data.category, function(key,umbrella_data){
			console.log(umbrella_data.umb_title);
			$('body').append('<div class="genre_container '+umbrella_data.umb_title+'"><h1 style="background-color:'+umbrella_data.bkg_color+'">'+umbrella_data.umb_title+'</h1><div class="strip"></div></div>\n');
			$.getJSON(data_path+umbrella_data.umb_title+'.json', function(newdata){
				var genre_years='';
			
				$.each(newdata.genre, function(keytwo,valuetwo){
					console.log('json year='+valuetwo.year + '\ngenre year:'+genre_years);
					if(valuetwo.year==genre_years){
						ourHTML=$('.'+umbrella_data.umb_title+' .strip .decade[rel='+genre_years+']').html()+'<div class="subgenre_btn" rel="'+keytwo+'">\n<div class="bulb"></div>'+valuetwo.sName+'</div>';			
						$('.'+umbrella_data.umb_title+' .strip .decade[rel='+genre_years+']').html(ourHTML);
					}
					else{
						genre_years=valuetwo.year;
						console.log('new year container!' + genre_years);
						$('.'+umbrella_data.umb_title+' .strip').append('<div class="decade" rel="'+genre_years+'">\n<label>'+genre_years+'</label>\n<div class="subgenre_btn" rel="'+keytwo+'">\n<div class="bulb"></div>'+valuetwo.sName+'</div>');
						var ourHTML='';
						}
					});//end sub.each
			});//end subfile json 

		});//end .each major genre
		
	});//end getJSON
}

function prepButtons(){
	$(document).on('click', genreButton, function(event){
		event.preventDefault();
		console.log('der');
		if(!$(this).hasClass('active')){
			$(genreButton).removeClass('active');
			$(this).toggleClass('active');
		}
	});

}