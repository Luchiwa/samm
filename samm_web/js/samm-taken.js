function getTakens(callback = null) {
	$.ajax({
		url : apiBaseUrl + "taken/get_by_user.php?user=" + getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			$(".taken_view .taken_list").empty();
			var takens = jqXHR.responseJSON;
			var htmlTakenItem = $("#taken_item").html();
			if (typeof takens.takens !== "undefined") {
				$(".taken_view .no_takens").remove();
				takens.takens.forEach(function (taken) {
					htmlTakenItem = replaceContent(htmlTakenItem, taken);
					$(".taken_list").append(htmlTakenItem);
					//createTakenItem(taken.id, taken.addiction_name, taken.price, taken.creation_date);
				});
			}
			if (callback !== null) {
				callback();
			}			
		}
	});	
}

$(document).ready(function () {
	initMenu()
	initHeader();
	getTakens();
});