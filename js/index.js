


document.addEventListener("DOMContentLoaded", function() {
	var headerHeight = 38;
	var textArea = document.getElementById('textarea');
	var messageCenter = document.getElementById('message-center');

	textarea.addEventListener('input', setNewHeight);
	window.addEventListener('resize', setNewHeight);

	function setNewHeight() {
		var messageSize = textArea.parentElement.getBoundingClientRect().height;
		messageCenter.style.height = 'calc( 100% - ' + (messageSize + headerHeight)+ 'px)';
	}
});