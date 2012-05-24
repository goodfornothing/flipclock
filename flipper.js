		var countDownFrom = 730;  		//initial number of days required
		var completed = 0;				//initial number of seconds completed
		var peopleCount = 2345978;		//initial number of people involved

		function decreaseTime(hoursDown) {	
			completed  += ( parseInt(hoursDown) );
			difference = (countDownFrom * 24 * 60  * 60) - completed;
			if (difference < 0) {
				difference = 0;
			}
			
			var days = Math.floor(difference / 86400);
			var hours = Math.floor((difference % 86400) / 3600);
			var mins = Math.floor((difference % 3600) / 60);
			var secs = Math.floor(difference % 60);
			
			// Update the clock elements
			changeValue($('#d1'), Math.floor(days / 100));
			changeValue($('#d2'), Math.floor((days % 100 ) / 10));
			changeValue($('#d3'), days % 10);

			changeValue($('#h1'), Math.floor(hours / 10));
			changeValue($('#h2'), hours % 10);
			changeValue($('#m1'), Math.floor(mins / 10));
			changeValue($('#m2'), mins % 10);
			changeValue($('#s1'), Math.floor(secs / 10));
			changeValue($('#s2'), secs % 10);

		}
				
		// Update a number
		function changeValue(obj, newValue) {
					
			// If the div has no value yet, then just set it immediately
			var value = $('.value', obj).text();
			if (value == '')
				return $('.value', obj).html(newValue);
			
			// Only do anything if the value has actually changed
			if (value == newValue)
				return;
			
			// Add top/bottom elements to flip
			$('<div class="top change"><div class="card">'+value+'</div></div>')
				.appendTo(obj);
			$('<div class="bottom change"><div class="bottom"><div class="card">'+
				newValue+'</div></div></div>').appendTo(obj);
			$('<div class="new-top top"><div class="card">'+newValue+'</div></div>')
				.appendTo(obj);
			
			// As soon as the flip elements are added to the DOM, fire the CSS animation
			window.setTimeout(function() {
				$('.change', obj).addClass('flip');
			}, 10);
			
			// After 600ms, cleanup the transitional elements
			window.setTimeout(function() {
				obj.find('.value').html(newValue);
				$('.change', obj).remove();
			}, 600);
			
		}


		// Update number of people
		function updatePeopleCounter() {

			changeValue($('#n8'), peopleCount % 10 );
			changeValue($('#n7'), Math.floor( ( peopleCount % 100 ) / 10 ));
			changeValue($('#n6'), Math.floor(( peopleCount % 1000 ) / 100 ));
			changeValue($('#n5'), Math.floor(( peopleCount % 10000 ) / 1000 ));
			changeValue($('#n4'), Math.floor(( peopleCount % 100000 ) / 10000 ));
			changeValue($('#n3'), Math.floor(( peopleCount % 1000000 ) / 100000 ));
			changeValue($('#n2'), Math.floor(( peopleCount % 10000000 ) / 1000000 ));
			changeValue($('#n1'), Math.floor(( peopleCount % 100000000 ) / 10000000 ));
		}
		
		
		// People Icons
		function updatePeopleIcons(){		
			var i = Math.floor(Math.random() * 10);
			$('#people').append('<img src="./images/image'+i+'.jpg" />');
		}
		
				
		// Increment People Counter
		function incrementPeopleCounter (number) {
			var numberInteger = parseInt(number);
			
			peopleCount += numberInteger;
			
			updatePeopleCounter();
			
			updatePeopleIcons();
		}
		
		// Increment People Counter randomly for the demo
		function incrementPeopleCounterRandomly(){
			if (((countDownFrom * 24 * 60  * 60) - completed) > 0) { 
				var newPeople = Math.random() * 1000;
				incrementPeopleCounter(newPeople);
				
				decreaseTime(newPeople * (Math.random() * 5000));
			} else {
				document.getElementById ("heading").innerHTML = "TRIAL COMPLETED!<br>THANK YOU FOR YOUR HELP!";
			}
		}

		
		// Display initial counters and call the random incrementor every second
		decreaseTime(0);
		updatePeopleCounter();
		
		window.setInterval(incrementPeopleCounterRandomly, 1000);
		