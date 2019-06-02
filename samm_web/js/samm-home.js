var timerInterval;
var scoreInterval;

function setAddictionTimer(date) {
	var nbSecondNow = parseInt(new Date().getTime() / 1000);
	var nbSecondReset = parseInt(new Date(toStandardFormat(date)).getTime() / 1000);
	var allSecondSinceReset = nbSecondNow - nbSecondReset;
	var hourSinceReset = Math.floor(allSecondSinceReset / 3600);
	var minuteSinceReset = Math.floor((allSecondSinceReset % 3600)/60);
	var secondSinceReset = (allSecondSinceReset % 3600) % 60;
	return numberToString(hourSinceReset) + ":" + numberToString(minuteSinceReset) + ":" + numberToString(secondSinceReset);
}

function setScoredTimer() {
	scoreInterval = setInterval(function () {
		$(".home_view .droppable_container").addClass("scored");
	}, 25000);
}

function setAddictionHome() {
	var user_addictions = JSON.parse(getLocalStorage("user_addiction")).user_addictions;
	if (user_addictions.length < 2) {
		$(".home_view .taken_addiction_container").addClass("one");
	} else {
		$(".home_view .taken_addiction_container").addClass("two");
	}
	var tmplDraggableUserAddiction = $("#draggable_user_addiction").html();
	user_addictions.forEach(function(user_addiction) {
		var draggableAddiction = $(replaceContent(tmplDraggableUserAddiction, user_addiction));
		draggableAddiction.find(".timer_addiction").text(setAddictionTimer(getLocalStorage(user_addiction.addiction+":reset_date")));
		timerInterval = setInterval(function () {
			draggableAddiction.find(".timer_addiction").text(setAddictionTimer(getLocalStorage(user_addiction.addiction+":reset_date")));
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
			$(this).addClass("ondrag");
		},
		"stop" : function () {
			$(".home_view .droppable_container").removeClass("ondrag");
			$(this).removeClass("ondrag");
		}
	});
	$(".home_view .droppable_container").droppable({
		accept : ".taken_btn",
		"drop" : function (event, ui) {
			localStorage.setItem("taken.addiction_name",ui.draggable.attr("data-name"));
			localStorage.setItem("taken.addiction_id", ui.draggable.attr("data-id"));
			window.location.href="add_taken.html";			
		}
	});
	$(".home_view .droppable_container").bind({
		"click" : function () {
			if ($(this).hasClass("scored")) {
				$.ajax({
					url : apiBaseUrl + "user/update_score.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data : JSON.stringify({
						"id" : getLocalStorage("user.id"),
						"score" : parseInt(getLocalStorage("user.score")) + 1
					}),
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							localStorage.setItem("user.score", jqXHR.responseJSON.score);
							$("body header .data_userscore").text(getLocalStorage("user.score"));											
							$(".home_view .droppable_container").removeClass("scored");
							clearInterval(scoreInterval);
							setScoredTimer();
						}
					}
				});
			}
		}
	});
}

function synchronizeSuccess() {
	if (localStorage.getItem("user_success.synchronization_date") ) {
		var timeNowSecond = new Date().getTime() / 1000;
		var timeSyncSecond = new Date(toStandardFormat(localStorage.getItem("user_success.synchronization_date"))).getTime() / 1000;
		if (timeNowSecond < timeSyncSecond + 1200) {
			return false;
		}
	}
	$.ajax({
		url : apiBaseUrl + "user_success/synchronization.php?user="+getLocalStorage("user.id"),
		method : "GET",
		contentType: "application/json",
		dataType: "json",
		complete : function (jqXHR) {
			if (jqXHR.status === 200) {
				var data = jqXHR.responseJSON;
				data.user_success.forEach(function (success) {
					initSuccessView(success.success_name, success.addiction_name, success.success_description, success.success_point);
				});
				localStorage.setItem("user_success.synchronization_date", jqXHR.responseJSON.synchronization_date);
				localStorage.setItem("user.score", jqXHR.responseJSON.score);
				$("body header .data_userscore").text(getLocalStorage("user.score"));
			}
		}
	});	
}

function initHomeView(callback) {
	if ($("body .home_view").length === 0) {
		$("body").append($("#home_view").html());
	}
	if (!getLocalStorage("user_addiction")) {
		getUserAddiction(function () {
			setAddictionHome();
			bindHomeView();
		});
	} else {
		setAddictionHome();
		bindHomeView();
	}
	setScoredTimer();
	synchronizeSuccess();
}