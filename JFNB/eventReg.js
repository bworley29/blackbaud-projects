					if($('.EventTable').length){
					
						
						var eventRegTicketDollarAmountAfterText = '<span class="eventRegTicketText"> each for this';
						var eventRegTicketBeforeText = '<span class="eventRegTicketText">I am buying </span>';
						var eventRegTicketAfterText = '<span class="eventRegTicketText"> seat(s) at</span>';
						
						// Hides desired fields from form					
						$('.EventItemRegistrationControlCellDescription, .EventItemRegistrationControlCellNumParticipants, .EventItemRegistrationControlCellNumParticipants, .EventItemRegistrationControlCellPrice').hide();
												
						// Dynamically gathers each Step One items functionality and text needed to build new experience per mock-up.  
						$('.EventItemRegistrationControlCellQuantity').each(function() {
						
							var eventRegTicketSelectList = $(this).html();
							var eventRegTicketDescription = $(this).next('.EventItemRegistrationControlCellDescription').text();
							var eventRegTicketPrice = $(this).next().next().next('.EventItemRegistrationControlCellPrice').html();
							var eventRegTicketDollarAmount = $(eventRegTicketPrice).closest('span').text();
							
							$(eventRegTicketDollarAmount).clone();
						
							$(this).html(eventRegTicketBeforeText + eventRegTicketSelectList + eventRegTicketAfterText + '<span class="eventRegTicketText dollarAmt">' + eventRegTicketDollarAmount + '</span>' + eventRegTicketDollarAmountAfterText + '<em>' + eventRegTicketDescription + '</em>' +  '.' + '</span>');
							
							$('.EventItemRegistrationsTable').show();
							
						});

						// Dynamically change amounts that are 'No Charge' to read as $0
						if($('.dollarAmt') === 'No Charge') {
							$('.dollarAmt').text('$0');
						}
						
						// Dynamically change all dollar amounts to remove trailing '.00'
						$('.eventRegTicketText.dollarAmt').each(function(){
							
							var currentGiveAmt = $(this).text();
							currentGiveAmt = currentGiveAmt.replace('.00 ea.', '');
							$(this).text(currentGiveAmt);
														
						});
						
						// Dynamically make all select list options on step two that read 'Guest' and change them to read as 'Guest'.
						$('table[id*="dgRegistrationsList"] .EventItemRegistrantControlCell select[id*="ddlRegistrantName"]').each(function(){
							
							$('table[id*="dgRegistrationsList"] .EventItemRegistrantControlCell select[id*="ddlRegistrantName"]').find('option:contains("New individual")').text('Guest');

						});
						// Dynamically make all select list options on step two that read 'New Address' and change them to read as 'Guest address'.
						$('[id*="dgRegistrationsList"] [id*="dgRegistrationsList"] select[id*="ddlAddress"]').each(function(){
						
							$(this).find('option:contains("New address")').text('Guest address');
							
						});
