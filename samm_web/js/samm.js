var apiBaseUrl = "https://luc.catzguy.com/api/";
//var apiBaseUrl = "http://localhost/samm/samm_api/";

function getUserAddictions(callback) {
	$.ajax({
		url : apiBaseUrl + "user_addiction/get_by_user.php?user=" + getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			setLocalStorageUserAddictions(jqXHR.responseJSON);
			callback();
		}
	});	
}

function setCookie(cookieName, cookieValue) {
	var today = new Date();
	var expire = new Date();
	//cookie expire in 7 days
	expire.setTime(today.getTime() + 86400000 * 7);
	document.cookie = cookieName + "=" + encodeURI(cookieValue) + ";expires=" + expire.toUTCString();
}

function getCookie(cookieName) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + cookieName + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function clearCookie(cookieName) {
	document.cookie = cookieName+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function setLocalStorageUser(user) {
	localStorage.setItem("user.id", user.id);
	localStorage.setItem("user.email", user.email);
	localStorage.setItem("user.username", user.username);
	localStorage.setItem("user.score", user.score);
	localStorage.setItem("user.creation_date", user.creation_date);
}

function setLocalStorageUserAddictions(user_addictions) {
	localStorage.setItem("user_addiction", JSON.stringify(user_addictions));
	user_addictions.user_addictions.forEach(function(user_addiction) {
		localStorage.setItem(user_addiction.addiction+":reset_date", user_addiction.reset_date);
	});
}

function getLocalStorage(key) {
	return localStorage.getItem(key);
}

function clearLocalStorage() {
	localStorage.clear();
}

function logOut() {
	clearLocalStorage();
	clearCookie("samm_session");
	clearDataHeader();
	clearDataHome();
	$(".taken_view .taken_list").empty();
	goToView($(".login_view"));
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
	input.removeClass("")	
}

function validInput(input) {
	input.next().fadeOut();
	input.addClass("valid");
}

function goToView(view) {
	$(".view").hide();
	view.fadeIn();
}

function goToInappView(inapp_view) {
	$(".inapp_view").hide();
	inapp_view.fadeIn();
}

function bindLinkButton() {
	$("button.a_btn").bind({
		"click" : function () {
			var view = $(this).attr("view-data");
			goToView($("."+view));
		}
	});
}

function setTimer(date) {
	var nbSecondNow = parseInt(new Date().getTime() / 1000);
	var nbSecondReset = parseInt(new Date(date).getTime() / 1000);
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

function validateForm(form) {
	if (form.find($("input")).length === form.find($("input.valid")).length) {
		form.find("button").removeClass("disabled");
	} else {
		form.find("button").addClass("disabled");
	}
}

function popin(message, callback) {
	$(".overlay .popin button.btn_popin").unbind("click");
	$(".overlay .popin .message_popin").text(message);
	$(".overlay .popin button.btn_popin").bind({
		"click" : function () {
			callback();
			$(".overlay .popin").hide();
			$(".overlay").fadeOut();	
		}
	});
	$(".overlay").fadeIn();
	$(".overlay .popin").fadeIn();
}

function setDataHeader() {
	var user_addictions = JSON.parse(getLocalStorage("user_addiction")).user_addictions;
	user_addictions.forEach(function(user_addiction) {
		var spanAddiction = $("<span>", {
			"class" : "addiction_icon "+user_addiction.addiction_name
		});
		$(".main_view header .list_user_addiction").append(spanAddiction);
	});
	$(".main_view header .data_username").text(getLocalStorage("user.username"));
	$(".main_view header .data_userscore").text(getLocalStorage("user.score"));
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

function clearDataHeader() {
	$(".main_view header .list_user_addiction").empty();
}

function clearDataHome() {
	$(".home_view .taken_addiction_container").removeClass("one two").empty();
}

function bindLoginForm() {
	$(".login_form #login_email").bind({
		"blur" : function () {
			if (!validEmailAddress($(this).val())) {
				showInputError($(this), "Adresse email invalide");
			} else {
				validInput($(this));
				validateForm($(".login_form"));
			}
		}
	});
	$(".login_form #login_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".login_form"));
			}
		}
	});
	$(".login_form button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/login.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data : JSON.stringify({
						"email" : $(".login_form #login_email").val(),
						"password" : $(".login_form #login_password").val()
					}),
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							setCookie("samm_session", jqXHR.responseJSON.id);
							setLocalStorageUser(jqXHR.responseJSON);
							getUserAddictions(function () {
								setDataHeader();
								goToView($(".main_view"));
								setDataHome();
								bindHomeView();
								goToInappView($(".home_view"));
							});							
						} else {
							$(".login_form p.server_error").text("Identifiants invalides").fadeIn();
						}
					}
				});
			}
		}
	})
}

function bindUpdatePasswordForm() {
	$(".update_password_form #update_password_oldpassword").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form #update_password_password").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form #update_password_confirm_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8) || ($(this).val() !== $(".update_password_form #update_password_password").val())) {
				showInputError($(this), "Les mots de passe ne correspondent pas");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form .btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/update_password.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data : JSON.stringify({
						"id" : getLocalStorage("user.id"),
						"password" : $("#update_password_password").val(),
						"oldPassword" : $("#update_password_oldpassword").val()
					}),
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							popin("Le mot de passe a été mis à jour.", function () {
								$(".update_password_form input").val("");
								goToInappView($(".home_view"));
							});											
						} else {
							$(".login_form p.server_error").text("Identifiants invalides").fadeIn();
						}
					}
				})
			}
		}
	});
}

function bindSignUpForm() {
	$(".sign_up_form #sign_up_email").bind({
		"blur" : function () {
			if (!validEmailAddress($(this).val())) {
				showInputError($(this), "Adresse email invalide");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_username").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 6)) {
				showInputError($(this), "Le nom d'utilisateur doit contenir au moins 6 caractères");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_password").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_confirm_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8) || ($(this).val() !== $(".sign_up_form #sign_up_password").val())) {
				showInputError($(this), "Les mots de passe ne correspondent pas");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/email_exist.php?email=" + encodeURIComponent($(".sign_up_form #sign_up_email").val()),
					method : "GET",
					complete : function (jqXHR) {
						console.log(jqXHR);
						if (jqXHR.status === 200) {
							if (jqXHR.responseJSON.email_exist === true) {
								showInputError($(".sign_up_form #sign_up_email"), "L'adresse email existe déjà");
								validateForm($(".sign_up_form"));
							} else {
								$.ajax({
									url : apiBaseUrl + "user/create.php",
									method : "POST",
									contentType: "application/json",
									dataType: "json",
									data : JSON.stringify({
										"email" : $(".sign_up_form #sign_up_email").val(),
										"username" : $(".sign_up_form #sign_up_username").val(),
										"password" : $(".sign_up_form #sign_up_password").val()
									}),
									complete : function (jqXHR) {
										if (jqXHR.status === 201) {
											setCookie("samm_session", jqXHR.responseJSON.id);
											setLocalStorageUser(jqXHR.responseJSON);
											goToView($(".choose_addiction_view"));
										} else {
											$(".sign_up_form p.server_error").text(jqXHR.responseJSON.message).fadeIn();
										}
									}
								});
							}
						} else {
							$(".sign_up_form p.server_error").text("Serveur indisponible").fadeIn();
						}
					}
				});				
			}
		}
	});
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
										getUserAddictions(function () {
											setDataHeader();
											goToView($(".main_view"));
											setDataHome();
											bindHomeView();
											goToInappView($(".home_view"));
										});										
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

function bindMainViewHeader() {
	$(".main_view header button.menu_btn").bind({
		"click" : function () {
			if (!$(".main_view .main_menu").hasClass("active")) {
				$(".main_view .main_menu").addClass("active");
			} else {
				$(".main_view .main_menu").removeClass("active");
			}
		}
	});
}

function bindMainViewMenu() {
	$(".main_view .main_menu .menu_item").bind({
		"click" : function () {
			//logout
			if ($(this).hasClass("logout")) {
				logOut();
			}
			else {
				if ($(this).attr("data-view") === "taken_view") {
					if ($(".taken_view .taken_list").has(".taken_item").length === 0) {
						getTakens(function () {
							goToInappView($(".taken_view"));
						});
					}
					goToInappView($(".taken_view"));
				} else {
					goToInappView($("."+$(this).attr("data-view")));
				}				
			}
			$(this).parent().removeClass("active");
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

function getTakens(callback) {
	$.ajax({
		url : apiBaseUrl + "taken/get_by_user.php?user=" + getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			$(".taken_view .taken_list").empty();
			var takens = jqXHR.responseJSON;
			if (typeof takens.takens !== "undefined") {
				takens.takens.forEach(function (taken) {
					createTakenItem(taken.id, taken.addiction_name, taken.price, taken.creation_date);
				});
			}			
			callback();
		}
	});	
}

function validateChooseAddictionForm() {
	if ($(".choose_addiction_form .addiction_btn").length !== $(".choose_addiction_form .addiction_btn.disabled").length) {
		$(".choose_addiction_form button.btn").removeClass("disabled");
	} else {
		$(".choose_addiction_form button.btn").addClass("disabled");
	}
}

function setDataAddTakenView(addiction_name, addiction_id) {
	$(".add_taken_view header").removeClass("tobacco alcohol");
	$(".add_taken_view header").addClass(addiction_name);
	$(".add_taken_form #add_taken_addiction").val(addiction_id);
	$(".add_taken_form #add_taken_addiction_name").val(addiction_name);
}

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
					"addiction" : $(".add_taken_form #add_taken_addiction").val(),
					"user" : getLocalStorage("user.id")
				}),
				complete : function (jqXHR) {
					if (jqXHR.status === 201) {
						var taken = jqXHR.responseJSON;
						createTakenItem(taken.id, $(".add_taken_form #add_taken_addiction_name").val(), $(".add_taken_form #add_taken_price").val(), taken.creation_date);
						localStorage.setItem($(".add_taken_form #add_taken_addiction").val()+":reset_date", new Date());
						popin("C'est dommage, essayer de faire mieux.", function () {
							goToView($(".main_view"));
						});
					} else {
						popin("Service indisponible", function () {
							goToView($(".main_view"));
						});
					}
				}
			});
		}
	});
	$(".add_taken_form button.btn_cancel").bind({
		"click" : function () {
			goToInappView($(".home_view"));
			goToView($(".main_view"));
			
		}
	})
}

function bindHomeView() {	
	$(".home_view .taken_btn").draggable({
		containment: ".home_view",
		revert: true
	});
	$(".home_view .droppable_container").droppable({
		accept : ".taken_btn",
		"drop" : function (event, ui) {
			setDataAddTakenView(ui.draggable.attr("data-name"), ui.draggable.attr("data-id"));
			goToView($(".add_taken_view"));
		}
	});
	
}

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


$(document).ready(function () {
	bindMaterialInput();
	bindLinkButton();
	bindLoginForm();	
	bindSignUpForm();
	bindChooseAddictionForm();
	bindMainViewHeader();
	bindMainViewMenu();
	bindUpdatePasswordForm();
	bindAddTakenForm();
	if (typeof getCookie("samm_session") === "undefined") {
		goToView($(".login_view"));
	} else {
		setDataHeader();
		goToView($(".main_view"));
		setDataHome();
		bindHomeView();
		goToInappView($(".home_view"));
	}
	
});