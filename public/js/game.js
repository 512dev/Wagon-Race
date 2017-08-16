
 
 $(document).ready(function() {
 	var sessionID = "";
 	var gameID = "";
 	var startTime = "";
 	var player1ID = "";
 	var player2ID = "";

	$.ajax({
		  type: "POST",
		  url: "/sessions",
		  success: function(data) {
		    console.log(data);
		    sessionID = data.id;
		  },
		  error: function(jqXHR) {
		    console.error(jqXHR.responseText);
		  }
		});
	$("button").on('click', function(e) {
		e.preventDefault();
		player1 = $("#player1name").val();
		player2 = $("#player2name").val();
		console.log(typeof(player1));
		console.log(player2);
		var players = {
			player1: player1,
			player2: player2
			};
		// var players = JSON.stringify({});
		console.log(typeof(players));
		$.ajax({
		  type: "POST",
		  url: "/sessions/"+sessionID+"/games",
		  data: players,
		  success: function(data) {
		    console.log(data);
		    $(".racer_table").removeClass('hidden');
		    console.log(data);
		    gameID = data.game.id
		    startTime = Date.now();
		    player1ID = data.game.players[0].id;
		    player2ID = data.game.players[1].id;
		  },
		  error: function(jqXHR) {
		    console.error(jqXHR.responseText);
		  }
		});
	});
 
  $(document).on('keyup', function(e) {
  	/* Act on the event */
  	if (e.which == 38) {
	  	$('#player1_race > .active').closest('td').next().addClass('active');
	  	$('#player1_race > .active').prev('td').removeClass('active');
	  	// var index = $("#player1_race").index('.active');
	  	var listItem = document.getElementById( ".active" )
	  	var index = $("#player1_race > .active").index(listItem)
	  	console.log(index);
	  	if (index == 16) {
	  		window.alert("Player 1 Wins!");
	  		var time = Math.floor((Date.now() - Date.parse(startTime))/60000)
	  		var winner = { "winner": player1ID, "elapsed_time": time }
	  		$.ajax({
			  type: "PATCH",
			  url: "/games/"+gameID+"/finish",
			  data: winner,
			  success: function(data) {
			    console.log(data);
			  },
			  error: function(jqXHR) {
			    console.error(jqXHR.responseText);
			  }
			});
	  	location.reload();
	  	};
  	};
  });
  $(document).on('keyup', function(e) {
  	/* Act on the event */
  	if (e.which == 40) {
	  	$('#player2_race > .active').closest('td').next().addClass('active');
	  	$('#player2_race > .active').prev('td').removeClass('active');
	  	var listItem = document.getElementById( ".active" )
	  	var index = $("#player2_race > .active").index(listItem)
	  	console.log(index);
	  	if (index == 16) {
	  		window.alert("Player 2 Wins!");
	  		var time = Math.floor((Date.now() - Date.parse(startTime))/60000)
	  		var winner = { "winner": player2ID, "elapsed_time": time }
	  		$.ajax({
			  type: "PATCH",
			  url: "/games/"+gameID+"/finish",
			  data: winner,
			  success: function(data) {
			    console.log(data);
			  },
			  error: function(jqXHR) {
			    console.error(jqXHR.responseText);
			  }
			});
	  		location.reload();
	  	};
  	};
  });
});

