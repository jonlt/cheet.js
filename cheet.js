(function(){
	var eventValidators = {
		"keyup" : function(e, data) {
			return e.keyCode == data;
		},
		"click" : function(e, data) {
			return $(e.target).is(data);
		}
	};

	var Sequence = function(sequenceString, next, fail, done) {
		var that = this;
		var allEvents = sequenceString.split(' ');
		var handler;
		
		this.continue = function(str){
			var events = str.split(' ');
			var current = events[0];
			var eventType = current.split(':')[0];
			var eventArg = current.split(':')[1];
			
			handler = function(e){
				var currentHandler = handler;
				if(!eventValidators[eventType] || !eventValidators[eventType](e, eventArg)){
					$(document).unbind(eventType, currentHandler);
					fail(e);
					that.continue(sequenceString);
					return;
				}
				
				events.splice(0,1);
				var newSequenceString = events.join(' ');
				$(document).unbind(eventType, currentHandler);
				next(e, sequenceString, allEvents.length - (events.length + 1));			
				
				if(events.length > 0) {
					$(document).unbind(eventType, currentHandler);
					that.continue(newSequenceString);
				} else {
					done();
					that.continue(sequenceString);
				}
			};
			
			if(events.length > 0) {
				$(document).bind(eventType, {}, handler);
			}
		};
	};

	function cheet(str, handlers){
		var next, fail, done;

		if (typeof handlers === 'function') {
			next = function(){};
			fail = function(){};
			done = handlers;
		} else if (handlers != null) {
			next = handlers.next;
			fail = handlers.fail;
			done = handlers.done;
		}

		var s = new Sequence(str, next, fail, done);
		s.continue(str);
	};
	
	window.cheet = cheet;
})();