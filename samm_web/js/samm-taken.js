function getTakens(callback = null) {
	$.ajax({
		url : apiBaseUrl + "taken/get_by_user.php?user=" + getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			$(".taken_view .taken_list").empty();
			var takens = jqXHR.responseJSON;
			if (typeof takens.takens !== "undefined") {
				$(".taken_view .no_takens").remove();
				takens.takens.forEach(function (taken) {
					createTakenItem(taken.id, taken.addiction_name, taken.price, taken.creation_date);
				});
			}
			if (callback !== null) {
				callback();
			}			
		}
	});	
}

function createTakenItem(taken_id, taken_addiction_name, taken_price, taken_creation_date) {
	var taken_item = $("<div>", {
		"class" : "taken_item",
		"data-id" : taken_id
	});
	var taken_icon = $("<div>", {
		"class" : "taken_icon "+taken_addiction_name
	});
	taken_item.append(taken_icon);
	var takenitem_price = $("<div>", {
		"class" : "taken_price"
	});
	takenitem_price.text(taken_price + " €");
	taken_item.append(takenitem_price);
	var taken_title = $("<div>", {
		"class" : "taken_title"
	});
	if (taken_addiction_name === "tobacco") {
		taken_title.text("Tabac");
	} 
	if (taken_addiction_name === "alcohol") {
		taken_title.text("Alcool");
	}
	taken_item.append(taken_title);
	var taken_date = $("<div>", {
		"class" : "taken_date"
	});
	taken_date.text(taken_creation_date)
	taken_item.append(taken_date);
	$(".taken_view .taken_list").prepend(taken_item);
}

$(document).ready(function () {
	initMenu()
	initHeader();
	getTakens();
});