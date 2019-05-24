function bindAddTakenForm() {
	$(".add_taken_form .slider").slider({
		min: 0,
		max: 50,
		value: 0,
		slide: function (event, ui) {
			$(".add_taken_form #add_taken_price").val(ui.value);
			$(".add_taken_form .price_content").text(ui.value + " €");
		}
	});
	$(".add_taken_form button.btn").bind({
		"click" : function () {
			$.ajax({
				url : apiBaseUrl + "taken/create.php",
				method : "POST",
				contentType: "application/json",
				dataType: "json",
				data : JSON.stringify({
					"price" : $(".add_taken_form #add_taken_price").val(),
					"addiction" : getLocalStorage("taken:addiction_id"),
					"user" : getLocalStorage("user.id")
				}),
				complete : function (jqXHR) {
					if (jqXHR.status === 201) {
						var taken = jqXHR.responseJSON;
						localStorage.setItem(getLocalStorage("taken:addiction_id") + ":reset_date", taken.creation_date);
						popin("C'est dommage, essayer de faire mieux.", function () {
							window.location.href="index.html";
						});
					} else {
						popin("Service indisponible", function () {
							window.location.href="index.html";
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
	$(".add_taken_view header").addClass(getLocalStorage("taken:addiction_name"));
	bindAddTakenForm();
});