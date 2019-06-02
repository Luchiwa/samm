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

function numberToString(number) {
	if (number <= 9) {
		return "0" + number;
	}
	return number;
}

function localStringDate(date) {
	date = new Date(toStandardFormat(date));
	return date.getFullYear()+"-"+numberToString(date.getMonth()+1)+"-"+numberToString(date.getDate())+" "+numberToString(date.getHours())+":"+numberToString(date.getMinutes())+":"+numberToString(date.getSeconds());
}

function displayCustomDate(date) {
	var frenchDay = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
	var frenchMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
	date = new Date(toStandardFormat(date));
	return frenchDay[date.getDay()]+" "+date.getDate()+" "+frenchMonth[date.getMonth()]+ " "+numberToString(date.getHours()) + ":"+numberToString(date.getMinutes());
}

function toStandardFormat(date) {
	var splitDate = date.split(" ");
	var splitYmdDate = splitDate[0].split("-");
	var splitHisDate = splitDate[1].split(":");
	return splitYmdDate[0]+"-"+splitYmdDate[1]+"-"+splitYmdDate[2]+"T"+splitDate[1]+"Z";
}

function replaceContent(contentString, data) {
	//format must be "{data[name]}"
 	for (var name in data) {
 		if (data.hasOwnProperty(name)) {
 			contentString = contentString.replace('{' + name + '}', data[name]);
        }
    }
    if (contentString.indexOf("{") !== -1) {
    	contentString = replaceContent(contentString, data);
    }
    return contentString;
}