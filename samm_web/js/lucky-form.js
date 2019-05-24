function bindMaterialInput() {
	$(".form_field input").bind({
		"blur" : function () {
			if ($(this).val() !== "") {
				$(this).prev().addClass("active");
			} else {
				$(this).prev().removeClass("active");
			}
		}
	});
}

function validateForm(form) {
	if (form.find($("input")).length === form.find($("input.valid")).length) {
		form.find("button").removeClass("disabled");
	} else {
		form.find("button").addClass("disabled");
	}
}

function validEmailAddress(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	return regex.test(email);
}

function isTooShortString(string, length) {
	if (string.length < length) {
		return true;
	} 
	return false;
}

function showInputError(input, message) {
	input.next().text(message).fadeIn();
	input.removeClass("valid")	
}

function validInput(input) {
	input.next().fadeOut();
	input.addClass("valid");
}