function bindAddTakenForm() {
	if (getLocalStorage("taken.addiction_name") === "tobacco") {
		$(".add_taken_form .slider").slider({
		min: 0,
		max: 10,
		value: 0,
			slide: function (event, ui) {
				$(".add_taken_form #add_taken_price").val(ui.value);
				if (ui.value === 0) {
					$(".add_taken_form .price_content").text("Gratuit");
				} 
				else {
					$(".add_taken_form .price_content").text(ui.value + " €");
				}				
			}
		});
	}
	if (getLocalStorage("taken.addiction_name") === "alcohol") {
		$(".add_taken_form .slider").slider({
			min: 0,
			max: 50,
			value: 0,
				slide: function (event, ui) {
					$(".add_taken_form #add_taken_price").val(ui.value);
					if (ui.value === 0) {
						$(".add_taken_form .price_content").text("Gratuit");
					} 
					else {
					$(".add_taken_form .price_content").text(ui.value + " €");
					}				
				}
		});
	}	
	$(".add_taken_form button.btn").bind({
		"click" : function () {
			$.ajax({
				url : apiBaseUrl + "taken/create.php",
				method : "POST",
				contentType: "application/json",
				dataType: "json",
				data : JSON.stringify({
					"price" : $(".add_taken_form #add_taken_price").val(),
					"addiction" : getLocalStorage("taken.addiction_id"),
					"user" : getLocalStorage("user.id")
				}),
				complete : function (jqXHR) {
					if (jqXHR.status === 201) {
						var taken = jqXHR.responseJSON;
						localStorage.setItem(getLocalStorage("taken.addiction_id") + ":reset_date", taken.creation_date);
						$.ajax({
							url : apiBaseUrl + "user_success/disable_validity.php",
							method : "POST",
							contentType: "application/json",
							dataType: "json",
							data : JSON.stringify({
								"addiction" : getLocalStorage("taken.addiction_id"),
								"user" : getLocalStorage("user.id")
							}),
							complete: function (jqXHR) {
								if (jqXHR.status === 200) {
									var data = jqXHR.responseJSON;
									localStorage.setItem("user.score", data.score);
									displayInformationWindow("score_modification", function () {
										$(".window .btn").bind({
											"click" : function () {
												window.location.href="index.html";
											}
										});
									}, data);
								} else {
									displayInformationWindow("fail_message", function () {
										$(".window .btn").bind({
											"click" : function () {
												window.location.href="index.html";
											}
										});
									});
								}								
							}
						});						
					} else {
						displayInformationWindow("server_error", function () {
							$(".window .btn").bind({
								"click" : function () {
									window.location.href="index.html";
								}
							});
						});
					}
				}
			});
		}
	});
	$(".add_taken_form button.btn_cancel").bind({
		"click" : function () {
			window.location.href="index.html";						
		}
	});
}

$(document).ready(function () {
	$(".add_taken_view header").addClass(getLocalStorage("taken.addiction_name"));
	bindAddTakenForm();
});