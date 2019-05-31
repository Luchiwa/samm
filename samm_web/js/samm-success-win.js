function getZindexMax() {
	var index_highest = 0;
	$("*").each(function() {
		var index_current = parseInt($(this).css("zIndex"), 10);
		if (index_current > index_highest) {
			index_highest = index_current;
		}
	});
	return index_highest;
}

function createHeader(success_name) {
	var header =  $("<header>");
	var title = $("<h1>");
	title.text(success_name);
	header.append(title);
	return header;
}

function createContentAddiction(addiction_name) {
	var content_addiction = $("<section>", {
		class : "addiction"
	});
	var addiction_badge = $("<div>", {
		class : addiction_name
	});
	content_addiction.append(addiction_badge);
	return content_addiction;
}

function createContentSuccess(success_description, success_point) {
	var content_success = $("<section>", {
		class : "content_success"
	});
	var p_description = $("<p>", {
		class : "success_description"
	});
	p_description.text(success_description);
	var p_point = $("<p>", {
		class : "success_point"
	});
	p_point.text("Score augmenté de "+success_point);
	content_success.append(p_description);
	content_success.append(p_point);
	return content_success;
}

function createButtonCloseSuccess() {
	var content_button = $("<section>", {
		class : "close_success"
	});
	var button = $("<button>", {
		class : "close_success_btn"
	});
	button.bind({
		"click" : function () {
			$(this).parent().parent().fadeOut().remove();
		}
	})
	content_button.append(button);

	return content_button;
}

function initSuccessView(success_name, addiction_name, success_description, success_point) {
	var header = createHeader(success_name);
	var contentAddiction = createContentAddiction(addiction_name);
	var contentSuccess = createContentSuccess(success_description, success_point);
	var buttonClose = createButtonCloseSuccess();
	var success_view = $("<section>", {
		class : "success_view"
	});
	success_view.append(header);
	success_view.append(contentAddiction);
	success_view.append(contentSuccess);
	success_view.append(buttonClose);
	success_view.css("z-index", getZindexMax()+1);
	$("body").prepend(success_view);
}