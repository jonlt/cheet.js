# cheet.js

## easy easter eggs in the browser

fork of: https://github.com/namuol/cheet.js

in stead of:

    cheet("i d d q d", function(){
	    alert("god mode!");
	});
	
use:

    cheet("keyup:73 keyup:68 keyup:68 keyup:81 keyup:68", function(){
	    alert("god mode!");
	});
	
	
also supports click events:

    cheat("click:#i click:#d click:#d click:#q click:#d", function(){
	    alert("god mode!");
	});

click-events are defined using jquery selectors.

Events are created and removed using jQuery, so you need jQuery in order to use this.