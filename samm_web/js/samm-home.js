var htmlHomeView = '<section class="home_view view"><p>Glisser-déposer en cas de rechute</p><div class="taken_addiction_container"></div><div class="droppable_container"></div></section>';
/*
<section class="home_view">
	<p>Glisser-déposer en cas de rechute</p>
	<div class="taken_addiction_container"></div>
	<div class="droppable_container"></div>
</section>
*/

function setTimer(date) {
	var nbSecondNow = parseInt(new Date().getTime() / 1000);
	var nbSecondReset = parseInt(new Date(date + " UTC").getTime() / 1000);
	var allSecondSinceReset = nbSecondNow - nbSecondReset;
	var hourSinceReset = Math.floor(allSecondSinceReset / 3600);
	var minuteSinceReset = Math.floor((allSecondSinceReset % 3600)/60);
	var secondSinceReset = (allSecondSinceReset % 3600) % 60;
	var stringHour = hourSinceReset;
	var stringMinute = minuteSinceReset;
	var stringSecond = secondSinceReset;
	if (hourSinceReset <= 9) {
		stringHour = "0" + hourSinceReset;
	}
	if (minuteSinceReset <= 9) {
		stringMinute = "0" + minuteSinceReset;
	}
	if (secondSinceReset <= 9) {
		stringSecond = "0" + secondSinceReset;
	}
	return stringHour+":"+stringMinute+":"+stringSecond;
}

function setDataHome() {
	var user_addictions = JSON.parse(getLocalStorage("user_addiction")).user_addictions;
	if (user_addictions.length < 2) {
		$(".home_view .taken_addiction_container").addClass("one");
	} else {
		$(".home_view .taken_addiction_container").addClass("two");
	}
	user_addictions.forEach(function(user_addiction) {
		var draggableAddiction = $("<div>", {
			"class" : "taken_btn "+user_addiction.addiction_name,
			"data-id" : user_addiction.addiction,
			"data-name" : user_addiction.addiction_name
		});
		var resetTimeAddiction = $("<div>", {
			"class" : "timer_addiction"
		});
		draggableAddiction.append(resetTimeAddiction.text(setTimer(getLocalStorage(user_addiction.addiction+":reset_date"))));
		setInterval(function () {
			resetTimeAddiction.text(setTimer(getLocalStorage(user_addiction.addiction+":reset_date")));
		}, 1000);
		$(".home_view .taken_addiction_container").append(draggableAddiction);
	});	
}

function clearDataHome() {
	$(".home_view .taken_addiction_container").removeClass("one two").empty();
}

function bindHomeView() {	
	$(".home_view .taken_btn").draggable({
		"containment" : ".home_view",
		"revert" : true,
		"start" : function () {
			$(".home_view .droppable_container").addClass("ondrag");
		},
		"stop" : function () {
			$(".home_view .droppable_container").removeClass("ondrag");
		}
	});
	$(".home_view .droppable_container").droppable({
		accept : ".taken_btn",
		"drop" : function (event, ui) {
			localStorage.setItem("taken:addiction_name",ui.draggable.attr("data-name"));
			localStorage.setItem("taken:addiction_id", ui.draggable.attr("data-id"));
			window.location.href="add_taken.html";			
		}
	});	
}

function initHomeView(callback) {
	if ($("body .home_view").length === 0) {
		$("body").append(htmlHomeView);
	}
	if (!getLocalStorage("user_addiction")) {
		getUserAddiction(function () {
			setDataHome();
			bindHomeView();
		});
	} else {
		setDataHome();
		bindHomeView();
	}
}