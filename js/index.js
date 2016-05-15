

angular.module('SampleApp', [])

.controller('SampleController', function($filter, CONVERSATIONS) {
	var self = this;

	self.conversations = CONVERSATIONS;

	(function init() {
		self.currentlyViewing = self.conversations[0];
		self.currentlyViewing.isActive = true;
	})();

	self.viewConversation = function(conversation) {
		self.currentlyViewing.isActive = false;
		self.currentlyViewing.isNew = false;
		conversation.isActive = true;
		self.currentlyViewing = conversation;
	};

	self.addMessage = function(conversation, message) {
		if (message) {
			conversation.messageHistory.push({
				isRecieved: false,
				message: message,
				timestamp: $filter('date')(Date.now(), 'h:MM a'),
				datestamp: $filter('date')(Date.now(), 'M/d/yyyy'),
			});
			self.userMessage = null;
		}
	};
})

.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Listen for change events to enable binding
      element.on('blur keydown change', function() {
        scope.$eval(read);

      });
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.text();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }

      var headerHeight = 38;
      var textArea = element[0];
      var messageCenter = document.getElementById('message-center');

      function setNewHeight() {
      	var messageSize = textArea.parentElement.getBoundingClientRect().height;
      	messageCenter.style.height = 'calc( 100% - ' + (messageSize + headerHeight)+ 'px)';
      	messageCenter.scrollTop = messageCenter.scrollHeight;
      }

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.text(ngModel.$viewValue || '');
        setNewHeight();
      };
      
      textarea.addEventListener('input', setNewHeight);
      window.addEventListener('resize', setNewHeight);
    }
  };
}]);