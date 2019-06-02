var htmlPopinView = '<div class="overlay"><div class="popin"><div class="container_popin"><header class="header_popin"></header><p class="message_popin"></p><button class="btn_popin">OK</button></div></div></div>';
/*
<div class="overlay">
	<div class="popin">
		<div class="container_popin">
			<header class="header_popin"></header>
			<p class="message_popin"></p>
			<button class="btn_popin">OK</button>
		</div>			
	</div>
</div>
*/

function popinWindow(message, callback) {
	if ($(".overlay .popin").length === 0) {
		$("body").append(htmlPopinView);
	}
	//createWindowOverlay();
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

/* NEW : WINDOW */
//var tmplConfirmWindow = "";

function createOverlay() {
	var overlay = $("<div>", {
		class : "overlay"
	});
	return overlay;
}

function createWindow() {
	var windowElem = $("<div>", {
		class : "window"
	});
	return windowElem;
}

function createHeaderWindow(title) {
	var header = $("<header>", {
		class : "header_window"
	});
	header.html("<h1>"+title+"</h1>");
	return header;
}

function openWindow(overlay, windowElem) {
	if ($(".overlay .window").length === 0) {
		overlay.append(windowElem);
		$("body").append(overlay);
		$("body").append(windowElem);
		overlay.fadeIn();
		windowElem.fadeIn();
	}
}

function removeWindow(overlay, windowElem) {
	windowElem.fadeOut().remove();
	overlay.remove();
}

function createButton(text, className) {
	var button = $("<div class=\"form_field col_2\"><button class=\""+className+"\">"+text+"</button></div>");
	return button;
}

function displayInformationWindow(id_template, callback = false, data_object = false) {
	var overlay = createOverlay();
	var informationWindow = createWindow();
	var htmlContent = $("#"+id_template).html();
	if (data_object) {
		htmlContent = replaceContent(htmlContent, data_object);
	}
	informationWindow.append($(htmlContent));
	openWindow(overlay, informationWindow);	
	if (callback) {
		callback();
	} else {
		informationWindow.find("button").bind({
			"click" : function () {
				removeWindow(overlay, informationWindow);
			}
		});
	}
}

function displayConfirmWindow(title, callbackConfirm, callbackNoConfirm = false) {
	var overlay = createOverlay();
	var confirmWindow = createWindow();
	var header = createHeaderWindow(title);
	confirmWindow.append(header);
	var btnConfirm = createButton("Oui", "btn");
	var btnNoConfirm = createButton("Non", "btn_cancel");
	confirmWindow.append(btnConfirm);
	btnNoConfirm.bind({
		"click" : function () {
			if (callbackNoConfirm) {
				callbackNoConfirm();
			}
			removeWindow(overlay, confirmWindow);
		}
	});	
	if (callbackConfirm) {
		btnConfirm.bind({
			"click" : function () {
				callbackConfirm();
			}
		});
	}
	confirmWindow.append(btnNoConfirm);
	openWindow(overlay, confirmWindow);
}