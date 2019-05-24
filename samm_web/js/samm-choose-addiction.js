function validateChooseAddictionForm() {
	if ($(".choose_addiction_form .addiction_btn").length !== $(".choose_addiction_form .addiction_btn.disabled").length) {
		$(".choose_addiction_form button.btn").removeClass("disabled");
	} else {
		$(".choose_addiction_form button.btn").addClass("disabled");
	}
}

function bindChooseAddictionForm() {
	$(".choose_addiction_form .addiction_btn").bind({
		"click" : function () {
				if ($(this).hasClass("disabled")) {
					$(this).removeClass("disabled");
				}
				else {
					$(this).addClass("disabled");
				}
				validateChooseAddictionForm();
		}
	});
	$(".choose_addiction_form button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				var userId = getLocalStorage("user.id");
				var countAddiction = $(".choose_addiction_form button.addiction_btn:not(.disabled)").length;
				var doneRequest = 0;
				$(".choose_addiction_form button.addiction_btn:not(.disabled)").each(function () {
					if (!$(this).hasClass("disabled")) {
						var addictionId = $(this).attr("data-id");
						$.ajax({
							url : apiBaseUrl + "user_addiction/create.php",
							method : "POST",
							contentType: "application/json",
							dataType: "json",
							data : JSON.stringify({
								"user" : userId,
								"addiction" : addictionId
							}),
							complete : function (jqXHR) {
								if (jqXHR.status === 201) {
									doneRequest++;
									if (doneRequest === countAddiction) {
										window.location.href="index.html";						
									}
								} else {
									$(".choose_addiction_form p.server_error").text(jqXHR.responseJSON.message).fadeIn();
								}								
							}
						});
					}
				});
			}
		}
	});
}

$(document).ready(function () {
	bindChooseAddictionForm();
});