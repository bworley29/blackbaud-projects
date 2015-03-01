/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: uOttawa Alumni
 Author(s): Ben Worley & Mark Hillard
 Product(s): BBNC
 Created: December 2014
 Updated: 
***********************************************

***********************************************

**********************************************/

BBI = {

	ottawa: {

		bbnc: {

			pageLoad: function(){
				//BBI.ottawa.bbnc.customGivingForm.donationType();
				//BBI.ottawa.bbnc.customGivingForm.giftInMemory();
				BBI.ottawa.bbnc.customGivingForm.billingInfo();						
			},
			
			paneRefresh: function(){
				BBI.ottawa.bbnc.customGivingForm.donationAmount();
				BBI.ottawa.bbnc.customGivingForm.fundDesignation();
				BBI.ottawa.bbnc.customGivingForm.matchingGift();
				BBI.ottawa.bbnc.customGivingForm.paymentInfo();
			},
			
			customGivingForm: {
				// Donation Type
				donationType: function(){
					// Declare Var
					//var ;
					// Define Var
				},
				// Donation Amount
				donationAmount: function() {
					// Declare Var
					//var ;
					// Define Var
				},
				// Gift in memory/honor
				giftInMemory: function() {
					// Declare Var
					//var ;
					// Define Var
				},
				// Direct my gift
				fundDesignation: function() {
					// Declare Var
					var hiddenFundDesgList;
					// Define Var
					hiddenFundDesgList = $('select[id*="ddlDesignations"].DonationSelectList').children().clone();
					// Build Fund Designation Select list Options
				    if($('select#fundDesignList option').length === 0 ) {
				        $(hiddenFundDesgList).appendTo('select#fundDesignList');
				    }

					// Toggle Function when 'To a specific Fund' is clicked
					$('.fundDesignation input[name="giftOpt"]').click(function(){
			            if($(this).next().next('select').length > 0) {
			            
			                $('.fundDesignation input[name="giftOpt"]').next().next('select').slideUp().addClass('hide');
			                $('.fundDesignation input[name="giftOpt"]:selected').removeAttr('checked','true');
			                $(this).next().next('select').slideDown().removeClass();
			                
			            } else {
			                $('.fundDesignation input[name="giftOpt"]:selected').removeAttr('checked','true');
			                $('.fundDesignation input[name="giftOpt"]').next().next('select').slideUp().addClass('hide');
			            }
		
		    		});
				},
				// Personal Information
				billingInfo: function() {
					
					// Declare Var
					var billingFirst, billingLast, billingAddress,  billingZipCode, billingCity, billingState, billingCountry, billingPhone, billingEmailAddress, oldBillingZip, oldBillingEmail, oldBillingFirstName,  oldBillingLastName, oldBillingZip ;
					// Define Var
					// Billing First Name
				    billingFirst = 'input#billingFirstName';
				    // Billing Last Name
				    billingLast = 'input#billingLastName';
				    // Billing Address Line
				    billingAddress = 'input#billingAddress';
				    // Billing City
				    billingCity = '#billingCity';
				    // Billing State
				    billingState = '#billingState';
				    // ZIP Code
				    billingZipCode = $('input#zip');
				    // Billing Country
				    billingCountry = '#billingCountry';
				    // Billing Phone
				    billingPhone = '#billingPhone';
				    // Email Address
				    billingEmailAddress = 'input#email';
				    // Email Validation RegEx
				    emailValidator = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
				    // Hidden Form Billing Info
				    //
					oldBillingFirstName = 'table.DonationFormTable input[id*="txtFirstName"]';
					//
					oldBillingLastName = 'table.DonationFormTable input[id*="txtLastName"]';
					//
					oldBillingCountry = 'table.DonationFormTable [id*="Country"] select[id*="dd_Country"]';
					//
					oldBillingAddressLine = 'table.DonationFormTable [id*="addrline"] textarea[id*="AddressLine"]';
					//
					oldBillingCity = 'table.DonationFormTable [id*="ctl_city"] input[id*="City"]';
					//
					oldBillingState = 'table.DonationFormTable td.billingState > select';
					//
					oldBillingZip = 'table.DonationFormTable [id*="ctl_zip"] input[id*="Zip"]';
					//
					oldBillingPhone = 'table.DonationFormTable input[id*="txtPhone"]';
					//
					oldBillingEmail = 'table.DonationFormTable tr[id*="trSingleEmailContainer"] input[id*="txtEmail"]';
					
					
					// Pass Billing First Name entered to hiddne form
					$(billingFirst).blur(function (){
						var billingFirstEnt = $(billingFirst).val();
						//						
						if ($(this).val() !== '')
						{
							$(oldBillingFirstName).val(billingFirstEnt);
						}
					});
					
					// Pass Billing Last Name entered to hidden form
					$(billingLast).blur(function (){
						var billingLastEnt = $(billingLast).val();
						//						
						if ($(this).val() !== '')
						{
							$(oldBillingLastName).val(billingLastEnt);
						}
					});
					
					// Pass Billing Address entered to hidden form
					$(billingAddress).blur(function (){
						var billingAddressEnt = $(billingAddress).val();
						//						
						if ($(this).val() !== '')
						{
							$(oldBillingAddressLine).val(billingAddressEnt);
						}
					});
					
					// Pass City entered to hidden form
					$(billingCity).blur(function (){
						var billingCityEnt = $(billingCity).val();
						//						
						if ($(this).val() !== '')
						{
							$(oldBillingCity).val(billingCityEnt);
						}
					});
										
					// Build Country Select list Options
					if($('select#billingCountry option').length === 0 ) {
						
						$(oldBillingCountry).children().clone().appendTo('select#billingCountry');
					}
					
					// Add Class to State/Provice Select list parent TD.  This will allow the list to be easily targeted when a country other than US is selected.
					$('label:contains("State")').parent().next().addClass('billingState');
					
					// Pass Country Select to hidden form
					$(billingCountry).change(function (){
						var billingCountrySel = $('select#billingCountry :selected').val();
						$(oldBillingCountry).find('option:contains("' + billingCountrySel + '")').attr('selected','selected');
					});
					
					// Build State Select list Option
					if($('select#billingState option').length === 0 ) {
						
						$(oldBillingState).children().clone().appendTo('select#billingState');
					}
					
					// Pass State Select to hidden form
					$(billingState).change(function (){
						var billingStateSel = $('select#billingState :selected').val();
						$(oldBillingState).find('option:contains("' + billingStateSel + '")').attr('selected','selected');
					});
					
					// Pass ZIP Code text to hidden form
				    $(billingZipCode).blur(function () {
						var billingZipCodeEnt = $(billingZipCode).val();
						if ($(this).val() !== '')
						{
							$(oldBillingZip).val(billingZipCodeEnt);
						}
					});
					
					// Pass Phone entered to hidden form
					$(billingPhone).blur(function (){
						var billingPhoneEnt = $(billingPhone).val();
						//						
						if ($(this).val() !== '')
						{
							$(oldBillingPhone).val(billingPhoneEnt);
						}
					});
					
					// Pass Email Address entered to hidden form
					$(billingEmailAddress).blur(function(){
						var billingEmailAddressEnt = $(billingEmailAddress).val();
						if (!$(this).val().match(emailValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldBillingEmail).val(billingEmailAddressEnt);
						}
						
					});


				},
				// Matching Gift
				matchingGift: function() {
					$('input#matchGift').click(function() {
						$('.wrapMatchingGift').slideToggle().removeClass('hide');

					});
					
				},
				// Payment Information
				paymentInfo: function() {
					// Declare Var
					var cardNumber, creditCardValidator, cardTypeVisa, cardTypeMasterCard, cardTypeAmEx, cardTypeDiscover, cardTypeInvalid, cardType,  cardholderName, cardExpMnth, cardExpYr, cardSecCode, oldCardholderName, oldCardNumber, oldCardExpMonth, oldCardExpYear, oldCardSecurityCode;
					// Define Var
					// Credit Card Number
				    cardNumber = 'input#cardNumber';
				    // RegEx Cardnumber Pattern
				    creditCardValidator = new RegExp(/^\d{4}-?\d{4}-?\d{4}-?\d{3,4}$/);
				    // Visa Card Type
				    cardTypeVisa = new RegExp(/^4$/);
				    // MasterCard Card Type
				    cardTypeMasterCard = new RegExp(/^5$/);
				    // American Express Card Type
				    cardTypeAmEx = new RegExp(/^3$/);
				    // Discover Card Type
				    cardTypeDiscover = new RegExp(/^6$/);
				    // Invalid Card Type
				    cardTypeInvalid = new RegExp(/^(0|1|2|7|8|9)$/);
				    // Dynamic text of card type selected
				    cardType = '.cardTypeEnt';
					// Cardholder Name
					cardholderName = 'input#cardholder[type="text"]';
					// Card Expiration Month
					cardExpMnth = 'select#cardExpMonth';
					// Card Expiration Year
					cardExpYr = 'select#cardExpYr';
					// Card Security Code
					cardSecCode = 'input#cscCode';
					// CSC Validation RegEx Pattern
					csvValidator = new RegExp(/^\d{3,4}$/);
					// Hidden/Old Form Vars
					oldCardholderName = 'table.DonationFormTable input[id*="txtCardholder"]';
					oldCardNumber = 'table.DonationFormTable input[id*="txtCardNumber"]';
					oldCardExpMonth = 'table.DonationFormTable select[id*="cboMonth"]';
					oldCardExpYear = 'table.DonationFormTable select[id*="cboYear"]';
					oldCardSecurityCode = 'table.DonationFormTable input[id*="txtCSC"]';
					
					// Get Card Number entered
				    $(cardNumber).keyup(function() {
					    if ($(this).val().match(cardTypeVisa)) {
					        $(this).removeClass().addClass('cardTypeVisa');
					        $(cardType).html('Visa');
					        $('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(Visa)').attr('selected', 'selected');
					    } else if ($(this).val().match(cardTypeMasterCard)) {
					        $(this).removeClass().addClass('cardTypeMasterCard');
					        $(cardType).html('MasterCard');
					        $('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(MasterCard)').attr('selected', 'selected');
					    } else if ($(this).val().match(cardTypeAmEx)) {
					        $(this).removeClass().addClass('cardTypeAmEx');
					        $(cardType).html('American Express');
					        $('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(American)').attr('selected', 'selected');
					    } else if ($(this).val().match(cardTypeDiscover)) {
					        $(this).removeClass().addClass('cardTypeDiscover');
					        $(cardType).html('Discover');
					        $('table.DonationFormTable select[id*="cboCardType"]').find('option:contains(Discover)').attr('selected', 'selected');
					    } else if ($(this).val().match(cardTypeInvalid) || $(this).val() === '') {
					        $(this).removeClass().addClass('cardTypeInvalid');
					        $('.cardTypeEnt').text('');
					    }
				    });
				    
				    // Get Card Type Based on Card Number
				    var cardTypeEnt = $(cardType).text();
				    $('.cardTypeEnt').text(cardTypeEnt);
				    
				    // Get Credit Card Number Entered
				    $(cardNumber).keyup(function() {
				    var cardNumEnt = $(cardNumber).val();
				    if ($(this).val().match(creditCardValidator)) {
				        $(this).removeClass('invalid').addClass('valid');
				        $('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
				    } else {
				        $(this).removeClass('valid').addClass('invalid');
				    }
				    });
				
				    $(cardNumber).blur(function() {
				    var cardNumEnt = $(cardNumber).val();
				    if ($(this).val().match(creditCardValidator)) {
				        $(this).removeClass('invalid').addClass('valid');
				        $('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
				    } else {
				        $(this).removeClass('valid').addClass('invalid');
				    }
				    });
				    				    
				        
				    // Get Cardholder Name entered 
					$(cardholderName).blur(function (){
						var cardHolderEnt = $(cardholderName).val();
						//
						
						if ($(this).val() !== '') {
							$(oldCardholderName).val(cardHolderEnt);
						}
					});
					
					hiddenCardExpMonthList = $('select[id*="cboMonth"]').children().clone();
					
					// Build Card Exp Year Select list Options
				    if($('select#cardExpMonth option').length === 0 ) {
				        $(hiddenCardExpMonthList).appendTo('select#cardExpMonth');
				        $('select#cardExpMonth option:eq(0)').text('Month');
				    }
					
					// Get Card Exp Month
				
					$(cardExpMnth).change(function (){
						var cardExpMnthSel = $('select#cardExpMonth :selected').val();
						//
						$(oldCardExpMonth).find('option:contains("' + cardExpMnthSel + '")').attr('selected','selected');
					});
					
					hiddenCardExpYrList = $('select[id*="cboYear"]').children().clone();
					
					// Build Card Exp Year Select list Options
				    if($('select#cardExpYr option').length === 0 ) {
				        $(hiddenCardExpYrList).appendTo('select#cardExpYr');
				        $('select#cardExpYr option:eq(0)').text('Year');
				    }
				
					// Get Card Exp Year
				
					$(cardExpYr).change(function (){
						var cardExpYrSel = $('select#cardExpYr :selected').val();
						$(oldCardExpYear).find('option:contains("' + cardExpYrSel + '")').attr('selected','selected');
					});
					
				
					// Get CSC Entered
				
					$(cardSecCode).blur(function (){
						var cscEnt = $(cardSecCode).val();
						if (!$(this).val().match(csvValidator))
						{
							$(this).addClass('invalid');
						}
						else
						{
							$(this).removeClass('invalid').addClass('valid');
							$(oldCardSecurityCode).val(cscEnt);
						}
					});


				},
			}
		
} // end bbnc

	} // end ottawa

}; // end BBI

/*
===================================================
 Run Global Functions 
---------------------------------------------------
 Default load methods to be used inside BBNC:
 * Sys.WebForms
 Event raised after all content on the page is 
 refreshed or loaded after postback. Can be 
 add_pageLoaded () or remove_pageLoade();

 Alternative load methods to be used outside BBNC:
 * $(window).load();
 Triggered after the window is loaded

 * $(document).ready();  
 Triggered after all assets completely received.	
---------------------------------------------------
*/

// Functions to run each time the page loads
$(document).ready( function(){
	BBI.ottawa.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.ottawa.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.ottawa.bbnc.paneRefresh();
     });
}
