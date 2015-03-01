/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: VCU_Support
 Author(s): Ben Worley
 Product(s): BBIS
 Created: Dec 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	VCU_Support: {

		bbis: {

			pageLoad: function(){
			
				BBI.VCU_Support.bbis.desktop();
				BBI.VCU_Support.bbis.mobile.mobileToggles();
				BBI.VCU_Support.bbis.miniDonation();
				BBI.VCU_Support.bbis.customSingleDonationForm.tbodyClasses();
				BBI.VCU_Support.bbis.paymentPartInlineNav();
			}, 	
			
			paneRefresh: function(){
				BBI.VCU_Support.bbis.customSingleDonationForm.stepOneGivingDetails.fundDesignationOption();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepOneGivingDetails.clickHiddenAmount();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepOneGivingDetails.donationAmount();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingTitleList();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingName();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingAddress();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingCity();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingZip();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingPhone();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingEmail();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingCountryList();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingStateList();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepThreePaymentInfo.cardholder();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepThreePaymentInfo.cardNumber();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepThreePaymentInfo.cardExp();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepThreePaymentInfo.cardCSC();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepThreePaymentInfo.submitButton();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepToggles();
				BBI.VCU_Support.bbis.customSingleDonationForm.hiddenFormValidation();
				BBI.VCU_Support.bbis.parts.mainMenuPart();
				BBI.VCU_Support.bbis.parts.donation();
				BBI.VCU_Support.bbis.parts.utilityMenuPart();
				BBI.VCU_Support.bbis.parts.userLogin();
				BBI.VCU_Support.bbis.parts.breadcrumbs();
				BBI.VCU_Support.bbis.parts.donateRecurringEndDate();
				BBI.VCU_Support.bbis.parts.quickSearch();
				BBI.VCU_Support.bbis.parts.commPrefForm();
				BBI.VCU_Support.bbis.parts.paymentSummary();
				BBI.VCU_Support.bbis.parts.eventReg();
				BBI.VCU_Support.bbis.parts.userPhotoForm();
				BBI.VCU_Support.bbis.mobile.eventRegCart();
				BBI.VCU_Support.bbis.addClassToEmptyTableCells();
				BBI.VCU_Support.bbis.addClassToRequiredInputs();
			}, 	
			
			// Desktop
			desktop: function(){
				
				// Define all vars here
				//var ;
				
				// Set all vars
				
				// Add Class to Login Form Most outer parent Table
				$('table.LoginFormTable').parents('table').last().addClass('wrapLoginFormTable');
				
				// Add Class to Job Board Post Salary Req parent Table
				$('input[id*="txtSalaryMin"]').parents('table').first().addClass('jobPostSalaryTbl');
				
				// Donation Form Shopping Cart 
				$('tbody[id*="tbdCart"] table[id*="dgCart"].DonationGrid').removeAttr('border');
				
				//
				$('label.QuickSearchFieldCaption').parent().hide();
				
				//
				$('#wrapSingleGivingForm + .BBDesignationSearchResultContainer').wrapAll('<div id="myModal" class="reveal-modal xlarge" data-reveal="" />');

			    								
			},
			
			modal: function () {
				
				$('#myModal').wrapInner('<div class="remodal" data-remodal-id="modal"></div>');
				
				if($('#myModal .remodal').length) {
					
					var inst = $("[data-remodal-id=modal]").remodal();
					inst.close();
					
				}
				
			},
			
			mobile: {
					
				mobileToggles: function () {
					// Define all vars here
					
					// Set all vars here

					//
					$('.navbar-toggle').on('click',function(event) {
						event.stopPropagation();
						$(this).next('nav.utility').slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
					});
					
					$(document).on('click',function() {
						
						if($('nav.utility').hasClass('active')) {
							
							$('nav.utility').slideUp('fast').removeClass('active');
							$('.navbar-toggle').removeClass('active');
						
						}
						
					});


				},
				
				eventRegCart: function () {
					//
					var eventRegCartValidatorCell;
				
					//
					eventRegCartValidatorCell = '.Ev2_PriceTypesCell.Ev2_PriceTypeValidatorColumn';
				
					$(eventRegCartValidatorCell).addClass('eventRegCartValidatorCell');
					
				},
			
			},
			
				// VCU Support Mini Donation Form
			miniDonation: function() {
				if ($('.donationAmountMiniForm').length >= 1) {
					
					// Enable/Disable Continue Button
					$('input#submitDonation').attr('disabled', true);
					
					// Add Placeholder Text
					$('input#amountLevelOther').attr('placeholder','Enter gift amount');
					
					// Amount Input
					$('input#amountLevelOther').on('keyup', function() {
												
						if (isNaN($('input#amountLevelOther').val()) || $(this).val() === '') {
							
							$('input#submitDonation').attr('disabled', true);
							
							$(this).removeClass('anotherAmtActive');
							
							$('.errorValidation span').addClass('invalid');							
							
						} else if ($(this).val() > '') {
							
														
							$('input#submitDonation').removeAttr('disabled', true);
							
							$(this).addClass('anotherAmtActive');

							$('.errorValidation span').removeClass('invalid');	
							
						}
						
					});
					
					// pass amount to url
					$('#submitDonation').on('click', function() {
						
						var dntAmnt;
						// amount
						
						if ($('input#amountLevelOther').hasClass('anotherAmtActive')) {
							
							dntAmnt = $('input#amountLevelOther').val();
							
						}
						
						window.location = 'https://bbis59760desval.blackbaudhosting.com/online-giving/single-donation-form?amount=' + dntAmnt;
						return false;
						
					});
				}
			},
			
			//adds a class 'required' to inputs that are required fields
			addClassToRequiredInputs: function () {

				//check if we're on a page with a form first...
				if (($('.BBFormTable').length)) {

					//iterate over all form inputs and drop-downs...
					$('input, select, textarea').each(function() {

						//for each one, test if it's a required field...
						if(  (($(this).parent().next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).parent().next('td').css('visibility') !== 'hidden')) ||
						     (($(this).closest('.BBFieldControlCell').next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).closest('.BBFieldControlCell').next('td').css('visibility') != 'hidden')) ||
						     ($(this).closest('.BBFieldControlCell').next('td').children("span:first").hasClass('BBFormRequiredFieldMarker')) ||
						     ($(this).next('span').hasClass('BBFormRequiredFieldMarker'))  ) 
					    {
							$(this).addClass('required');

							if($(this).attr('id').indexOf('cboYear') >=0 ) {
								//do nothing...it's the year ddl in credit card month/year
							} else if ($(this).attr('id').indexOf('cboMonth') >= 0) {
								$(this).closest('table').parent().prev('td[id$="ExpiryLbl"]').children('label').eq(0).addClass('required');
							} else if($(this).prev('label').length > 0) {
								$(this).prev('label').addClass('required');
							} else {
								$(this).parent().prev('td').children('label').eq(0).addClass('required');
							}
						}
					});

				}

			},
			
			//adds class to empty table cells
			addClassToEmptyTableCells: function() {
				if($('.LoginFormTable td').length) {
					$('td').each(function() {
						if($(this).children().length > 0) {
							if($(this).children(':visible').length === 0) {
								$(this).addClass('emptyTD');
							}
						} else if ($.trim($(this).html()) === "") {
							$(this).addClass('emptyTD');
						}
					});

					$('td > span').each(function() {
						if($.trim($(this).html()) === "") {
							$(this).addClass('emptyTDSpan');
						}
					});
				}
				
				if($('.DonationFormTable td').length) {
					$('td').each(function() {
						if($(this).children().length > 0) {
							if($(this).children(':visible').length === 0) {
								$(this).addClass('emptyTD');
							}
						} else if ($.trim($(this).html()) === "") {
							$(this).addClass('emptyTD');
						}
					});

					$('td > span').each(function() {
						if($.trim($(this).html()) === "") {
							$(this).addClass('emptyTDSpan');
						}
					});
				}
			},
			
			customSingleDonationForm: {
				
				// Add Classes to parent Tbody of each section of the hidden form
				tbodyClasses: function () {
					// Set Vars
					var donationInfo, additionalInfo, designationSelectList, billingInfo, tributeInfo, paymentInfo;
					
					// Define Vars
					//
					// Donation Information/Amount
					donationInfo = $('[id*="txtAmount"]').parents('tbody').addClass('donationInfo');
					
					// Additional Information
					additionalInfo = $('[id*="trDesignation"]').parents('tbody').addClass('additionalInfo');
					
					// Billing Information
					billingInfo = $('[id*="DonationCapture1_txtFirstName"]').parents('tbody').addClass('billingInfo');
					
					// Tribute Information
					tributeInfo = $('[id*="lblTributeHeading"]').parents('tbody').addClass('tributeInfo');
					
					// Tributre Name
					/*
tributeNameInput = '.tributeInfo [id*="trTributeName"] input[id*="txtTribute"]';
					
					// Tribute Type Select List
					tributeTypeSelectList = '.tributeInfo [id*="trTributeDesc"] select[id*="ddlTribute"]';
					
					// Tribute Description Input
					tributeDescInput = '.tributeInfo [id*="trTributeDesc2"] input[id*="txtTributeDescription"]';
*/
					// Payment Information
					paymentInfo = $('[id*="DonationCapture1_lblCardHoldersName"]').parents('tbody').addClass('paymentInfo');
					
					
				},
	
				// Step One - Giving Details
				stepOneGivingDetails: {
					
					fundDesignationOption: function () {
						var shownFundList, hiddenFundDesgList;
						
						hiddenFundDesgList = $('.additionalInfo select[id*="ddlDesignations"]').children().clone();
						$('<select id="fundDesignList"></select>').prependTo('ul.fundDesignation li.fundDesignationList');
						shownFundList = 'select#fundDesignList';
						
						if($('ul.fundDesignation li.fundDesignationList select option').length === 0) {
							$(hiddenFundDesgList).prependTo(shownFundList);
						}
						
						$('select#fundDesignList option').click(function () {
	                            $('select#fundDesignList option:selected').removeAttr('checked', 'true');
	                            $(this).attr('checked', 'true');
	                            
	                    });
	                    
	                    // Match Selected Fund to Hidden Fund
	                    $(shownFundList).on('change', function () {
	                        var shownFundListSelected = $('select#fundDesignList option:selected');
	                        var hiddenFundList = '.additionalInfo select[id*="ddlDesignations"]';
	
	                        $(hiddenFundList).find('option[value="' + shownFundListSelected.val() + '"]')
	                            .attr('selected', true);
	                    });
					},
				
					clickHiddenAmount: function () {
	                    // auto-select "Other" amount option in hidden form (on page load)
	                    $('input[value="rdoOther"]').click();
	                    // set initial value of selected amount option (on page load)
	                    var checkedRadio = $('.givingAmountOptions input[name="amount"]:checked').val();
	                    $('.DonationFormTable input[id$="txtAmount"]').val(checkedRadio);
	                },
				
					// Donation Amount
	                donationAmount: function () {
	                    var otherAmountRadio = $('.givingAmountOptions .otherAmount input[type="radio"]#otherAmt');
	                    var otherAmountText = $('.givingAmountOptions .otherAmount input[type="text"]');
	                    var giftAmountShown = $('.givingAmountOptions input[type="radio"][id*="opt"]');
	                    var giftAmountHidden = $('.DonationFormTable input[id$="txtAmount"]');
	
	                    giftAmountShown.change(function () {
		                    var rdoAmtChk = $('.givingAmountOptions input[type="radio"][id*="opt"]:checked').val();
		                    otherAmountText.val('');
		                    otherAmountText.attr('disabled', true);
	                        giftAmountHidden.val(rdoAmtChk);
	                    });
	                    
	                    otherAmountRadio.click(function(){
		                   otherAmountText.removeAttr('disabled', true); 
	                    });
	
	                    otherAmountText.keyup(function () {
	                        giftAmountHidden.val($(this).val());
	                    });
	
	                },
					
				},
				
				// Step Two - Donor Info
				stepTwoDonorInfo: {
					
					billingName: function () {
						var billingFirstName, billingLastName, hiddenFirstName,  hiddenLastName;
						
						billingFirstName = '.donorFirstName #billingFirstName';
						billingLastName = '.donorLastName #billingLastName';
						hiddenFirstName = '.billingInfo [id*="txtFirstName"]';
						hiddenLastName = '.billingInfo [id*="txtLastName"]';
						
						// Get First Name entered
	                    $(billingFirstName).keyup(function () {
	                        var billingFirstNameEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenFirstName).val(billingFirstNameEnt);
	                        }
	                    });
	                    
	                    // Get Last Name entered
	                    $(billingLastName).keyup(function () {
	                        var billingLastNameEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenLastName).val(billingLastNameEnt);
	                        }
	                    });
					},
					
					billingAddress: function () {
						var billingAddress, hiddenBillingAddress;
						
						billingAddress = '.personalInfoList #billingAddress';
						hiddenBillingAddress = '.billingInfo [id*="AddressLine"]';
						
						// Get Address entered
	                    $(billingAddress).keyup(function () {
	                        var billingAddressEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenBillingAddress).val(billingAddressEnt);
	                        }
	                    });
					},
					
					billingTitleList: function () {
						var shownTitleList, hiddenTitleList;
						
						hiddenTitleList = $('.DonationCaptureFormTable select[id*="Title"]').children().clone();
						shownTitleList = '.donorTitle select#nameTitleList';
						
						if($('select#nameTitleList option').length === 0) {
							$(hiddenTitleList).prependTo(shownTitleList);
						}
						
						$('select#nameTitleList option').click(function () {
                            $('select#nameTitleList option:selected').removeAttr('checked', 'true');
                            $(this).attr('checked', 'true');
	                            
	                    });
	                    
	                    // Match Selected Fund to Hidden Fund
	                    $(shownTitleList).on('change', function () {
	                        var shownTitleListSelected = $('select#nameTitleList option:selected');
	                        var hiddenTitleList = '.DonationCaptureFormTable select[id*="Title"]';
	
	                        $(hiddenTitleList).find('option[value="' + shownTitleListSelected.val() + '"]')
	                            .attr('selected', true);
	                    });
					},
					
					billingCity: function () {
						var billingCity, hiddenCity;
						
						billingCity = '.wrapCity #billingCity';
						hiddenCity = '.billingInfo [id*="City"]';
						
						// Get City entered
	                    $(billingCity).keyup(function () {
	                        var billingCityEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenCity).val(billingCityEnt);
	                        }
	                    });
					},
										
					billingCountryList: function () {
						var shownCountryList, hiddenCountryList;
						
						hiddenCountryList = $('.DonationCaptureFormTable [id*="Country"]').children().clone();
						shownCountryList = 'select#billingCountry';
						
						if($('select#billingCountry option').length === 0) {
							$(hiddenCountryList).prependTo(shownCountryList);
						}
						
						$('select#billingCountry option').click(function () {
	                            $('select#billingCountry option:selected').removeAttr('checked', 'true');
	                            $(this).attr('checked', 'true');
	                            
	                    });
	                    
	                    // Match Selected Fund to Hidden Fund
	                    $(shownCountryList).on('change', function () {
	                        var shownCountryListSelected = $('select#billingCountry option:selected');
	                        var hiddenCountryList = '.DonationCaptureFormTable [id*="Country"]';
	
	                        $(hiddenCountryList).find('option[value="' + shownCountryListSelected.val() + '"]')
	                            .attr('selected', true);
	                    });
					},
					
					billingStateList: function () {
						var shownStateList, hiddenStateList;
						
						hiddenStateList = $('.DonationCaptureFormTable [id*="State"]').children().clone();
						shownStateList = 'select#billingState';
						
						if($('select#billingState option').length === 0) {
							$(hiddenStateList).prependTo(shownStateList);
						}
						
						$('select#billingState option').click(function () {
	                            $('select#billingState option:selected').removeAttr('checked', 'true');
	                            $(this).attr('checked', 'true');
	                            
	                    });
	                    
	                    // Match Selected State to Hidden State
	                    $(shownStateList).on('change', function () {
	                        var shownStateListSelected = $('select#billingState option:selected');
	                        var hiddenStateList = '.DonationCaptureFormTable [id*="State"]';
	
	                        $(hiddenStateList).find('option[value="' + shownStateListSelected.val() + '"]')
	                            .attr('selected', true);
	                    });
					},
					
					billingZip: function () {
						var billingZip, hiddenZip;
						
						billingZip = '.wrapZip #zip';
						hiddenZip = '.billingInfo [id*="Zip"]';
						
						// Get ZIP entered
	                    $(billingZip).keyup(function () {
	                        var billingZipEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenZip).val(billingZipEnt);
	                        }
	                    });
					},
					
					billingPhone: function () {
						var billingPhone, hiddenBillingPhone;
						
						billingPhone = '.personalInfoList #billingPhone';
						hiddenBillingPhone = '.billingInfo [id*="txtPhone"]';
						
						// Get Phone entered
	                    $(billingPhone).keyup(function () {
	                        var billingPhoneEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenBillingPhone).val(billingPhoneEnt);
	                        }
	                    });
					},
					
					billingEmail: function () {
						var billingEmail, hiddenBillingEmail;
						
						billingEmail = '.personalInfoList #email';
						hiddenBillingEmail = '.billingInfo [id*="txtEmailAddress"]';
						
						// Get Email entered
	                    $(billingEmail).keyup(function () {
	                        var billingEmailEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenBillingEmail).val(billingEmailEnt);
	                        }
	                    });
					},

					
				},
				
				// Step One - Payment Info
				stepThreePaymentInfo: {					
			
					cardholder: function() {
						var cardholder, hiddenCardholder;
						
						cardholder = '.paymentInfo #cardholder';
						hiddenCardholder = '.paymentInfo [id*="txtCardholder"]';
						
						// Get Cardholder Name entered
	                    $(cardholder).keyup(function () {
	                        var cardHolderEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenCardholder).val(cardHolderEnt);
	                        }
	                    });
	                    
					},
					
					cardNumber: function () {
						var cardNumber, hiddenCardNumber, cardTypeEnt, creditCardValidator, cardTypeVisa, cardTypeMasterCard, cardTypeAmEx, cardTypeDiscover, cardTypeInvalid, cardType;
						
						cardNumber = '.paymentInfo #cardNumber';
						hiddenCardNumber = 'table.DonationFormTable input[id*="txtCardNumber"]';
						
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
	                    //
	                    cardTypeEnt = $(cardType).text();

						
						// Get Card Number entered
	                    $(cardNumber).keyup(function () {
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
	                    $('.cardTypeEnt').text(cardTypeEnt);
	
	                    // Get Credit Card Number Entered
	                    $(cardNumber).keyup(function () {
	                        var cardNumEnt = $(cardNumber).val();
	                        if ($(this).val().match(creditCardValidator)) {
	                            $(this).removeClass('invalid').addClass('valid');
	                            $('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
	                        } else {
	                            $(this).removeClass('valid').addClass('invalid');
	                        }
	                    });
	
	                    $(cardNumber).blur(function () {
	                        var cardNumEnt = $(cardNumber).val();
	                        if ($(this).val().match(creditCardValidator)) {
	                            $(this).removeClass('invalid').addClass('valid');
	                            $('input[id*="DonationCapture1_txtCardNumber"]').val(cardNumEnt);
	                        } else {
	                            $(this).removeClass('valid').addClass('invalid');
	                        }
	                    });
	                    
					},
					
					cardExp: function () {
						var cardExpMonth, cardExpYear, hiddenCardExpMonth, hiddenCardExpYear, hiddenCardExpMonthClone, hiddenCardExpYearClone;
						
						// Card Expiration Month
	                    cardExpMonth = 'select#cardExpMonth';
	                    // Card Expiration Year
	                    cardExpYear = 'select#cardExpYr';
	                    // Hidden Exp Month
	                    hiddenCardExpMonth = 'table.DonationFormTable select[id*="cboMonth"]';
	                    // Hidden Exp Year
						hiddenCardExpYear = 'table.DonationFormTable select[id*="cboYear"]';
						// Clone Hidden Exp Month
						hiddenCardExpMonthClone = $(hiddenCardExpMonth).children().clone();
						// Clone Hidden Exp Year
						hiddenCardExpYearClone = $(hiddenCardExpYear).children().clone();

	                    // Build Card Exp Year Select list Options
	                    if ($('select#cardExpMonth option').length === 0) {
	                        $(hiddenCardExpMonthClone).appendTo('select#cardExpMonth');
	                        $('select#cardExpMonth option:eq(0)').text('Month');
	                    }
	
	                    // Get Card Exp Month
	                    $(cardExpMonth).change(function () {
	                        var cardExpMonthSelected = $('select#cardExpMonth :selected').val();
	                        $(hiddenCardExpMonth).find('option:contains("' + cardExpMonthSelected + '")').attr('selected', 'selected');
	                    });
	
	                    // Build Card Exp Year Select list Options
	                    if ($('select#cardExpYr option').length === 0) {
	                        $(hiddenCardExpYearClone).appendTo('select#cardExpYr');
	                        $('select#cardExpYr option:eq(0)').text('Year');
	                    }
	
	                    // Get Card Exp Year
	                    $(cardExpYear).change(function () {
	                        var cardExpYearSelected = $('select#cardExpYr :selected').val();
	                        $(hiddenCardExpYear).find('option:contains("' + cardExpYearSelected + '")').attr('selected', 'selected');
	                        console.log('Year selected');
	                    });
						
					},
					
					cardCSC: function () {
						var cardSecCode, csvValidator, hiddenCardSecurityCode;
						
						// Card Security Code
	                    cardSecCode = 'input#cscCode';
	                    // CSC Validation RegEx Pattern
	                    csvValidator = new RegExp(/^\d{3,4}$/);
	                    // Hidden/Old Form Vars
	                    hiddenCardSecurityCode = 'table.DonationFormTable input[id*="txtCSC"]';
	                    
						// Get CSC Entered
	                    $(cardSecCode).blur(function () {
	                        var cscEnt = $(cardSecCode).val();
	                        if (!$(this).val().match(csvValidator)) {
	                            $(this).addClass('invalid');
	                        } else {
	                            $(this).removeClass('invalid').addClass('valid');
	                            $(hiddenCardSecurityCode).val(cscEnt);
	                            $('.paymentInfo ul.paymentInfo li[class*="card"]').addClass('siblingsComplete');
	                            $('.paymentInfo h3').addClass('complete');
	                        }
	                    });
					},
					
					submitButton: function () {
						$('.DonationButtonCell input[type="submit"].DonationSubmitButton').prependTo('.submitButton');
					},
					
				},
				
				stepToggles: function () {
					$('#wrapSingleGivingForm .givingAmountOptions .rdoAmount input[type="radio"]').click(function() {
			            if($(this).is(':checked')) {
				            console.log('not the Other Rdo');
				            $('.donateAmount h3').addClass('complete');
				            $('.donorInfo .personalInfoList').slideDown();
				            $('.donorInfo').find('h3').removeClass();
				            $('#billingFirstName').focus();
			            }
			        });

					$('#wrapSingleGivingForm .givingAmountOptions .otherAmount input[type="text"]').blur(function() {
			            if($(this).val() !== '') {
				            $('.donateAmount h3').addClass('complete');
				            $('.donorInfo .personalInfoList').slideDown();
				            $('.donorInfo').find('h3').removeClass();
				            $('#billingFirstName').focus();
						}
			        });

			
			        $('input#email[type="email"]').blur(function() {
			
			            var emailValidator = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
			
			            if ($(this).val().match(emailValidator)) {
			
			                $('.paymentInfo').slideDown();
			                $('.donorInfo').find('h3').addClass('complete');
			                $('.paymentInfo').find('h3').removeClass();
			                $('#cardholder').focus();
			
			            } 
			
			        });
	
				},
                                
                hiddenFormValidation: function () {
	              // Form Error(s) Text
	              $('#wrapSingleGivingForm + [id*="UpdatePanel"] .DonationFormTable [id*="ValidationSummary1"].DonationValidationSummary').insertBefore('.donateAmount');
	              
	              // Form Submitted Text
	              var forSubmittedText = $('[id*="lblThanks"].DonationMessage').insertBefore('.donateAmount');
	              
	              if($(forSubmittedText).length) {
		              $('fieldset.step').hide();
	              }
                },

				
			},
			
			paymentPartInlineNav: function () {
				if($('.PaymentPart_FormContainer').length) {
					$('ul.givingStepsNav').addClass('stepTwoActive');
				}	
			},
									
			parts : {
			
				mainMenuPart: function () {
				
					var mobileMainNavToggleIcon, mobileMainNavDropdownIcon;
					
					mobileMainNavToggleIcon = '.showOnMobile.mobileMainNav';
					mobileMainNavDropdownIcon = 'nav ul.mainNav li.parent i.fa';
					
					if($('.wrapMainNav ul.mainNav > li.parent i.fa').length === 0) {
						$('<i class="fa" \/>').insertBefore('.wrapMainNav ul.mainNav > li.parent > ul');
						}
					
					//
					$(mobileMainNavToggleIcon).on('click',function() {
						
						$(this).next().slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
					});
					
					//
					$(mobileMainNavDropdownIcon).on('click',function() {
						
						$(this).next('ul').slideToggle('fast');
						$(this).toggleClass('active');
						$(this).prev().toggleClass('disable');
						$(this).parent().toggleClass('active');
						
					});
	
	
				}, // END mainMenuPart
				
				quickSearch: function() {
										
					var inputTextBox = '.utility input.QuickSearchTextbox';
					
					$(inputTextBox).attr('placeholder','Search');
					
				},
								
				donateRecurringEndDate: function() {
					if($('.DonationFormTable').length) {
						if($('[id*="Recurrence_divFrequency"]').length) {
							$('label[id*="Recurrence_lblTxtEnding"], input[id*="Recurrence_DatePickerEnd"], input[id*="Recurrence_DatePickerEnd"] + img.ui-datepicker-trigger').wrapAll('<div class="wrapEndDate" \/>');
						}
						// Forces Numeric Keypad on mobile to only display
						$('input[id*="DonationCapture1_AddressCtl_tb_ZipUS"], input[id*="txtAmount"], input[id*="DonationCapture1_txtPhone"], input[id*="DonationCapture1_txtCardNumber"], input[id*="DonationCapture1_txtCSC"]').attr("pattern", "[0-9]*");						
						
						
						if($('tbody[id*="tbdCart"] tr[id*="Cart"]').length) {
							$('tbody[id*="tbdCart"] tr[id*="Cart"]').find('.DonationFieldCaption').next().attr('colspan','2');
						}
					}
					
				},
				
				donation: function(){
					if( $('#wrapSingleGivingForm').length >= 1){						
						// pass amount via url
						if(window.location.href.indexOf('?amount') != -1){
							var amount = window.location.href.split('=')[1];
							$('.otherAmount input[type="radio"]').trigger('click');
							$('.otherAmount input[type="text"]').val(amount).trigger('blur');
							
						}
					}
					
					if($('table.DonationFormTable').length) {
						var matchingGiftText = '.matchingGiftText';
						$(matchingGiftText).hide();
						var matchingGiftTextClone = $(matchingGiftText).clone()
						$(matchingGiftTextClone).show().insertAfter('[id*="lblMatchingGifts"]');
					}	
						
				},
				
				utilityMenuPart: function () {
				
					var utilitySearchClone = $('#utility table.QuickSearchFormTable').clone();
					var utilitySearchIcon = 'ul.utilityNav li.search a';
					
					$('<li class="search"><a class="fa fa-search" href="#"></a></li>').insertAfter('.utilityNav li:last-child');
					
					//
					$(utilitySearchClone).insertAfter(utilitySearchIcon);
					
					//
					
					
					// Quick Search toggle event
					$(utilitySearchIcon).on('click',function() {
						$('#utility .search').prevAll().toggleClass('disable');
						
						if($('#utility li.disable')) {	
							//$(this).next().slideToggle('fast').toggleClass('active');
							$(this).toggleClass('active');
							$(this).parent().toggleClass('activeLi');
							$(this).parent().parent().toggleClass('activeUl');
							$(this).next().animate(
								{
									width: 'toggle'
								}
							);
							
						}
						
					});
						
				}, // END utilityMenuPart
				
				breadcrumbs: function () {
				
					var breadcrumbHomeLink;
					
					// Create Home link for Breadcrumbs
					breadcrumbHomeLink = $('<li class="home"><a href="http://www.VCU_Supportenver.edu/" target="_new">MSU Denver Alumni Association</a></li>');
					
					// Create Home Breadcrumb link if it doesn't already exist
					if($('nav.wrapBreadcrumbs ul.mainNav li.home').length === 0) {
						$(breadcrumbHomeLink).insertBefore('nav.wrapBreadcrumbs ul.mainNav > .selected:visible');
					}
					
					// Remove href from selected Breadcrumb anchor
					$('nav.wrapBreadcrumbs ul.mainNav li.selected > a.selected').removeAttr('href');
				}, // END breadcrumbs
					
				// User Login Part classes and responsive behavior
				userLogin: function() {
	
					if($('.LoginFormTable').length) {
	
						//add classes to style <td>'s with no classes
						$('.LoginFormTable .BBFieldControlCell').each(function() {
							$(this).prev('td').addClass('BBFieldCaption');
						});
	
						//add a class 'remember login' container
						$('label[for$="cbRememberLogin"]').parent().addClass('rememberLoginContainer');
	
						//add class to table that holds validation container
						$('.LoginFormValidatorSummary').closest('table').addClass('userLoginValidationContainer');
	
					}
	
					if($('tr[id$="trSignInBody"]').length) {
	
	
						//adding class to outer part container
						$('tr[id$="trSignInBody"]').closest('table').addClass('userLoginPart');
	
						//nice treatment for checkboxes from mobile devices
						//BBI.VCU_Support.bbis.responsiveCheckboxesAddClass();
						//BBI.VCU_Support.bbis.responsiveCheckboxesChangeEvent();
	
					}
					
					if($('.signOn .LoginFormTable').length) {
						//
						$('a[id*="lbtnForgotPwdUserName"]').insertBefore('input[id*="btnLogin"].LoginFormSubmitButton');
						//
						$('input[id*="txtUsername"]').attr('placeholder','Username');
	
						$('input[id*="txtPassword"]').attr('placeholder','Password');
						
						$('input[id*="txtForgotPWDUserNameEmail"]').attr('placeholder','Email');
						
						

					}
	
				}, // END userLogin
				
				commPrefForm: function () {
					$('.bbformbuilder-element-block[id*="commPrefs"] ##header > div').attr('style','');
					$('.bbformbuilder-element-block[id*="commPrefs"] #item > div').attr('style','');
				},
				
				paymentSummary: function() {
					var cartItemDesgRow, cartItemDesgAmountInput, existingCartUpdateLink, existingCartUpdateLinkClone;
					
					cartItemDesgRow = '.wrapSidebar .PaymentPartSummary_Container .PaymentPartSummary_Cart table.PaymentPartSummary_CartList tr.PaymentPartSummary_CartRows';

					cartItemDesgAmountInput = '.wrapSidebar .PaymentPartSummary_Container .PaymentPartSummary_Cart table.PaymentPartSummary_CartList input[id*="txtItemUnitPrice"]';
					
					existingCartUpdateLink = '.wrapSidebar .PaymentPartSummary_Container .PaymentPartSummary_CartOptions a[id*="ButtonUpdateCart"]';
					
					existingCartUpdateLinkClone = $(existingCartUpdateLink).clone()
					
					$(cartItemDesgRow).each(function(){
						if($('tr.PaymentPartSummary_CartRows a[id*="ButtonUpdateCart"]').length === 0) {
							$(existingCartUpdateLinkClone).insertAfter(cartItemDesgAmountInput);
						}
					});



	
				},
				
				eventReg: function () {
					if($('.EventTable').length) {
						$('.EventTable .EventSectionHeader').parent('tr').remove();
						$('.EventTable .BBFormSubmitButton[value="Previous"]').parent().parent().parent().parent().addClass('formButtons');
						$('.EventItemsSelectionGrid').parent('td').addClass('wrapEventItemsSelectionGridTd');
						$('.EventTable tr[id*="trAdditionalDonation"] td span, .EventTable tr[id*="trAdditionalDonation"] td input').wrapAll('<div class="wrapAddGift" /div>');
						$('[id*="dgRegistrationsList"] .EventItemRegistrantControlCellName').parent().parent().parent().addClass('wrapEventItemRegistrantControlCellName');
					}
				},
				
				userPhotoForm: function () {
					var userPhotoImgLink;
					
					userPhotoImgLink = 'aside.returnUser .ProfilePhotoFormTable a[id*="lnkPhoto"]';
					
					$(userPhotoImgLink).addClass('fa fa-edit');

					$('aside.returnUser .ProfilePhotoFormTable a[id*="lnkPhoto"].fa-edit').removeAttr('href');
					
					$('aside.returnUser .ProfilePhotoFormTable a[id*="lnkPhoto"].fa-edit').unbind('click').click(function(){
					
						/*
$('.returnUser table.ProfilePhotoFormTable tr:nth-child(4), .returnUser table.ProfilePhotoFormTable tr:nth-child(5), .returnUser table.ProfilePhotoFormTable tr:nth-child(6)').slideToggle();
						$(this).toggleClass('active');
						
						if($(this).hasClass('active')) {
							$(this).removeClass('fa-edit').addClass('fa-times-circle');
						} else {
							$(this).removeClass('fa-times-circle').addClass('fa-edit');
						}
*/
						
						$(this).attr('href','//bbis59760desval.blackbaudhosting.com/my-profile/support-user-photo-form');
					
					});
					
				},

			}

		}

	} // end VCU_Support

}; // end BBI

/*
===================================================
 Run Global Functions 
---------------------------------------------------
 Default load methods to be used inside bbis:
 	* Sys.WebForms
 	Event raised after all content on the page is 
 	refreshed or loaded after postback. Can be 
 	add_pageLoaded () or remove_pageLoade();

 Alternative load methods to be used outside bbis:
 	* $(window).load();
	Triggered after the window is loaded

	* $(document).ready();  
	Triggered after all assets completely received.	
---------------------------------------------------
*/

// Functions to run each time the page loads
$(document).ready( function(){
	BBI.VCU_Support.bbis.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.VCU_Support.bbis.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.VCU_Support.bbis.paneRefresh();
     });
}

$(window).bind("load", function() {
   
   setTimeout(function facebookFrame() {
		  if ($('.sidebarContent iframe').length > 0) {
		  
			    $('.sidebarContent iframe').addClass('facebookFrame');
			    
		  } else {
		  
			    setTimeout(facebookFrame, 50);
			    
		  }
	  }, 50);
   
});



