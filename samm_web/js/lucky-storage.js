var expiresDay = 7;

function setCookie(cookieName, cookieValue) {
	var today = new Date();
	var expire = new Date();
	//cookie expire in 7 days
	expire.setTime(today.getTime() + 86400000 * expiresDay);
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

function getLocalStorage(key) {
	return localStorage.getItem(key);
}

function clearLocalStorage() {
	localStorage.clear();
}

function setLocalStorageUser(user) {
	localStorage.setItem("user.id", user.id);
	localStorage.setItem("user.email", user.email);
	localStorage.setItem("user.username", user.username);
	localStorage.setItem("user.score", user.score);
	localStorage.setItem("user.creation_date", user.creation_date);
}

function setLocalStorageUserAddiction(user_addictions) {
	localStorage.setItem("user_addiction", JSON.stringify(user_addictions));
	user_addictions.user_addictions.forEach(function(user_addiction) {
		localStorage.setItem(user_addiction.addiction+":reset_date", user_addiction.reset_date);
	});
}