function getUserSuccess() {
	var htmlSuccessValidItem = $("#valid_success").html();
	var htmlSuccessInvalidItem = $("#invalid_success").html();
	$.ajax({
		url : apiBaseUrl + "user_success/get_by_user.php?user="+getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			if (jqXHR.status === 200) {
				var user_success = jqXHR.responseJSON.user_success;
				var count = 0;
				user_success.forEach(function(user_s) {
					user_s.creation_date = displayCustomDate(user_s.creation_date);
					user_s.disability_date = displayCustomDate(user_s.disability_date);
					user_s.updated_date = displayCustomDate(user_s.updated_date);
					count++;
					var successItem;
					if (user_s.valid === "1") {						
						successItem = replaceContent(htmlSuccessValidItem, user_s);
					} else {
						successItem = replaceContent(htmlSuccessInvalidItem, user_s);
					}
					var jqSuccessItem = $(successItem);
					if (jqSuccessItem.hasClass("valid_success")) {
						jqSuccessItem.bind({
							"click" : function () {
								initSuccessView(user_s.success_name, user_s.addiction_name, user_s.success_description, user_s.success_point);
							}
						});
					}
					
					$(".success_list").append(jqSuccessItem);
				});
				if (count > 0) {
					$("p.no_success").fadeOut().remove();
				}
			}
			
		}
	})
}

$(document).ready(function () {
	initMenu();
	initHeader();
	getUserSuccess();
});