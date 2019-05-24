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

function popin(message, callback) {
	if ($(".overlay .popin").length === 0) {
		$("body").append(htmlPopinView);
	}
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