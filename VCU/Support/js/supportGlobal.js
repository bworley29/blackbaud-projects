/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: VCU_Support
 Author(s): Ben Worley
 Product(s): BBIS
 Created: Dec 2014
 Updated: April 2015 by BW
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	VCU_Support: {

		bbis: {

			pageLoad: function(){
				BBI.VCU_Support.bbis.browserDetection();
				BBI.VCU_Support.bbis.placeholderPlugin();
				BBI.VCU_Support.bbis.desktop();
				BBI.VCU_Support.bbis.mobile.mobileToggles();
				BBI.VCU_Support.bbis.miniDonation();
				BBI.VCU_Support.bbis.customSingleDonationForm.tbodyClasses();
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
				BBI.VCU_Support.bbis.parts.paymentPart();
				BBI.VCU_Support.bbis.parts.eventReg();
				BBI.VCU_Support.bbis.parts.userPhotoForm();
				BBI.VCU_Support.bbis.mobile.eventRegCart();
				BBI.VCU_Support.bbis.paymentPartInlineNav();
				BBI.VCU_Support.bbis.parts.profilePhotoForm();
				BBI.VCU_Support.bbis.parts.fundDesgSearch();
			}, 	
			
			paneRefresh: function(){
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingCountryList();
				BBI.VCU_Support.bbis.customSingleDonationForm.stepTwoDonorInfo.billingStateList();
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
					
					/*
$(document).on('click',function() {
						
						if($('nav.utility').hasClass('active')) {
							
							$('nav.utility').slideUp('fast').removeClass('active');
							$('.navbar-toggle').removeClass('active');
						
						}
						
					});
*/


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
						
						window.location = 'https://bbis59760desval.blackbaudhosting.com/giving-form?amount=' + dntAmnt;
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
		                   otherAmountText.attr('disabled', false); 
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
	                    $(billingFirstName).blur(function () {
	                        var billingFirstNameEnt = $(this).val();
	
	                        if ($(this).val() !== '') {
	                            $(hiddenFirstName).val(billingFirstNameEnt);
	                        }
	                    });
	                    
	                    // Get Last Name entered
	                    $(billingLastName).blur(function () {
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
	                    $(billingAddress).change(function () {
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
						
						$('#nameTitleList option:eq(0)').text('Title');
						
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
	                    $(billingCity).blur(function () {
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
						
					/*
$('select#billingCountry option').click(function () {
	                            $('select#billingCountry option:selected').removeAttr('selected', true);
	                            $(this).attr('selected', true);
	                            $(hiddenCountryList).find('option[value="' + $(this).val() + '"]')
	                            .attr('selected', true);
								$('.DonationCaptureFormTable [id*="Country"] option').trigger('change');
	                            
	                    });
*/
	                    // Match Selected Fund to Hidden Fund
	                    $('select#billingCountry option').click(function () {
	                        var shownCountryListSelected = $('select#billingCountry option:selected');
	                        var hiddenCountryList = '.DonationCaptureFormTable [id*="Country"]';
	
	                        $(hiddenCountryList).find('option[value="' + shownCountryListSelected.val() + '"]')
	                            .attr('selected', true);
	                        var hiddenCountrySelected = $('.DonationCaptureFormTable [id*="Country"]').find('option:selected');
	                           // $(hiddenCountrySelected).trigger('change');
	                            console.log(hiddenCountrySelected);
	                    });
					},
					
					billingStateList: function () {
						var shownStateList, hiddenStateList;
						
						hiddenStateList = $('.DonationCaptureFormTable [id*="State"]').children().clone();
						shownStateList = 'select#billingState';
						
						if($('select#billingState option').length === 0) {
							$(hiddenStateList).prependTo(shownStateList);
						}
						
						$('#billingState option:eq(0)').text('State');
						
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
						hiddenZip = '.DonationFormTable [id*="Zip"]';
						
						// Get ZIP entered
	                    $(billingZip).blur(function () {
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
	                    $(billingPhone).blur(function () {
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
	                    $(billingEmail).blur(function () {
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
	                            //$('.paymentInfo ul.paymentInfo li[class*="card"]').addClass('siblingsComplete');
	                            $('.paymentInfo h3').addClass('complete');
	                        }
	                    });
					},
					
					submitButton: function () {
						$('.DonationButtonCell input[type="submit"].DonationSubmitButton').prependTo('.submitButton');
					},
					
				},
				
				stepOneToggleAnimations: function() {
					$('.donateAmount h3').addClass('complete');
		            $('.donorInfo .personalInfoList').removeClass('hide').slideDown();
		            $('.donorInfo').find('h3').removeClass();
		            $('#billingFirstName').focus();
				},
				
				stepToggles: function () {
					$('#wrapSingleGivingForm .givingAmountOptions .rdoAmount input[type="radio"]').click(function() {
			            if($(this).is(':checked') && $('ul.giftType').length === 0) {
				            BBI.VCU_Support.bbis.customSingleDonationForm.stepOneToggleAnimations();
			            }
			        });

					$('#wrapSingleGivingForm .givingAmountOptions .otherAmount input[type="text"]').blur(function() {
			            if($(this).val() !== '' && $('ul.giftType').length === 0) {
				            BBI.VCU_Support.bbis.customSingleDonationForm.stepOneToggleAnimations();
						}
			        });
					
					$('#wrapSingleGivingForm .giftType li input[type="checkbox"]').click(function() {
			            if($(this).is(':checked')) {
				            BBI.VCU_Support.bbis.customSingleDonationForm.stepOneToggleAnimations();
			            }
			        });
			
			        $('input#email[type="email"]').keyup(function() {
			
			            var emailValidator = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
			
			            if ($(this).val().match(emailValidator)) {
			
			                $('.paymentInfo').removeClass('hide').slideDown();
			                $('.donorInfo').find('h3').addClass('complete');
			                $('.paymentInfo').find('h3').removeClass();
			                //$('#cardholder').focus();
			
			            } 
			
			        });
			        
			        if($('body').hasClass('Explorer')) {
				        $('.personalInfoList input#email').keyup(function() {
				
				            var emailValidator = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
				
				            if ($(this).val().match(emailValidator)) {
				
				                $('.paymentInfo').removeClass('hide').slideDown();
				                $('.donorInfo').find('h3').addClass('complete');
				                $('.paymentInfo').find('h3').removeClass();
				                //$('#cardholder').focus();
				
				            } 
				
				        });
			        }
	
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
				
				paymentPart: function () {
					
					if($('.donationConfirmation').is(':visible')) {
						$('ul.givingStepsNav').hide();
					}
					
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
						
						$(this).attr('href','../support-user-photo-form');
					
					});
					
				},
				
				profilePhotoForm: function () {
					
					if($('.wrapContent aside.returnUser table.ProfilePhotoFormTable').length === 0) {
						$('<a href="../support-user-photo-form" title="Upload a profile photo"><div id="imgPhoto"><i class="fa fa-camera">&nbsp;<\/i><br \/> Upload a photo<\/div><\/a>').appendTo('.wrapContent aside.returnUser div[id*="divProfilePhotoForm"]');
					}
				},
				
				fundDesgSearch: function () {
					if($('.BBDesignationSearchContainer').length) {
						$('.BBDesignationSearchResult').each(function() {
							$(this).find('p:eq(0)').addClass('designationTitle');
						});
						
						
						$('.BBDesignationSearchResult p a').not('.BBAddToCartLink').each(function() {
							$(this).addClass('makeGiftLink');
						});
						
						
						$('.BBDesignationSearchResult').each(function() {
							var newHref = $(this).find('.makeGiftLink').attr('href') + '&name=' + $(this).find('.designationTitle').text();
							$(this).find('.makeGiftLink').attr('href', newHref);
						});
					}
					
					if ($('.donationForm').length) {
						var desingationID, desingationName ;
						// pass designation ID via url
						if (window.location.href.indexOf('?id') != -1) {
							 desingationID = window.location.href.split('=')[1];
							 desingationName = window.location.href.split('=')[2];
							$('#designation').append('<option class="newOption" value="' + desingationID + '">' + desingationName + '</option>');
							var newValID = $('.newOption').val().replace(/&name/g,'');
							$('.newOption').val(newValID);
							
							var newText = $('.newOption').html().replace(/%20/g,' ');
							//newTextUpdated = $(newText).html().replace(/&name/g,'');
							$('.newOption').html(newText);
							newTextUpdated = $('.newOption').html().split('&')[0];
							$('.newOption').html(newTextUpdated).attr('selected',true);
							$('#designation').addClass('disabled').prop('disabled', true);
						}
					}

				},

			},
			
			browserDetection: function () {
				var userAgent = navigator.userAgent.toLowerCase(),
			    browser   = '',
			    version   = 0;
			
				$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
				
				// Is this a version of IE?
				if ($.browser.msie) {
				  userAgent = $.browser.version;
				  userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
				  version = userAgent;
				  browser = "Internet Explorer";
				  $('body').addClass(browser);
				}
				
				// Is this a version of Chrome?
				if ($.browser.chrome) {
				  userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
				  userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
				  version = userAgent;
				  // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
				  $.browser.safari = false;
				  browser = "Chrome";
				  $('body').addClass(browser);
				}
				
				// Is this a version of Safari?
				if ($.browser.safari) {
				  userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);	
				  userAgent = userAgent.substring(0,userAgent.indexOf('.'));
				  version = userAgent;	
				  browser = "Safari";
				  $('body').addClass(browser);
				}
				
				// Is this a version of Mozilla?
				if ($.browser.mozilla) {
					//Is it Firefox?
					if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
						userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
						userAgent = userAgent.substring(0,userAgent.indexOf('.'));
						version = userAgent;
						browser = "Firefox"
						$('body').addClass(browser);
					}
					// If not then it must be another Mozilla
					else {
					  browser = "Mozilla (not Firefox)"
					}
				}
				
			},
			
			placeholderPlugin: function () {
				
				if($('body').hasClass('Explorer')) {
					/* Placeholders.js v4.0.1 */
					/*!
					 * The MIT License
					 *
					 * Copyright (c) 2012 James Allardice
					 *
					 * Permission is hereby granted, free of charge, to any person obtaining a copy
					 * of this software and associated documentation files (the "Software"), to
					 * deal in the Software without restriction, including without limitation the
					 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
					 * sell copies of the Software, and to permit persons to whom the Software is
					 * furnished to do so, subject to the following conditions:
					 *
					 * The above copyright notice and this permission notice shall be included in
					 * all copies or substantial portions of the Software.
					 *
					 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
					 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
					 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
					 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
					 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
					 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
					 * IN THE SOFTWARE.
					 */
					!function(a){"use strict";function b(){}function c(){try{return document.activeElement}catch(a){}}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return!0;return!1}function e(a,b,c){return a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):void 0}function f(a,b){var c;a.createTextRange?(c=a.createTextRange(),c.move("character",b),c.select()):a.selectionStart&&(a.focus(),a.setSelectionRange(b,b))}function g(a,b){try{return a.type=b,!0}catch(c){return!1}}function h(a,b){if(a&&a.getAttribute(B))b(a);else for(var c,d=a?a.getElementsByTagName("input"):N,e=a?a.getElementsByTagName("textarea"):O,f=d?d.length:0,g=e?e.length:0,h=f+g,i=0;h>i;i++)c=f>i?d[i]:e[i-f],b(c)}function i(a){h(a,k)}function j(a){h(a,l)}function k(a,b){var c=!!b&&a.value!==b,d=a.value===a.getAttribute(B);if((c||d)&&"true"===a.getAttribute(C)){a.removeAttribute(C),a.value=a.value.replace(a.getAttribute(B),""),a.className=a.className.replace(A,"");var e=a.getAttribute(I);parseInt(e,10)>=0&&(a.setAttribute("maxLength",e),a.removeAttribute(I));var f=a.getAttribute(D);return f&&(a.type=f),!0}return!1}function l(a){var b=a.getAttribute(B);if(""===a.value&&b){a.setAttribute(C,"true"),a.value=b,a.className+=" "+z;var c=a.getAttribute(I);c||(a.setAttribute(I,a.maxLength),a.removeAttribute("maxLength"));var d=a.getAttribute(D);return d?a.type="text":"password"===a.type&&g(a,"text")&&a.setAttribute(D,"password"),!0}return!1}function m(a){return function(){P&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)?f(a,0):k(a)}}function n(a){return function(){l(a)}}function o(a){return function(){i(a)}}function p(a){return function(b){return v=a.value,"true"===a.getAttribute(C)&&v===a.getAttribute(B)&&d(x,b.keyCode)?(b.preventDefault&&b.preventDefault(),!1):void 0}}function q(a){return function(){k(a,v),""===a.value&&(a.blur(),f(a,0))}}function r(a){return function(){a===c()&&a.value===a.getAttribute(B)&&"true"===a.getAttribute(C)&&f(a,0)}}function s(a){var b=a.form;b&&"string"==typeof b&&(b=document.getElementById(b),b.getAttribute(E)||(e(b,"submit",o(b)),b.setAttribute(E,"true"))),e(a,"focus",m(a)),e(a,"blur",n(a)),P&&(e(a,"keydown",p(a)),e(a,"keyup",q(a)),e(a,"click",r(a))),a.setAttribute(F,"true"),a.setAttribute(B,T),(P||a!==c())&&l(a)}var t=document.createElement("input"),u=void 0!==t.placeholder;if(a.Placeholders={nativeSupport:u,disable:u?b:i,enable:u?b:j},!u){var v,w=["text","search","url","tel","email","password","number","textarea"],x=[27,33,34,35,36,37,38,39,40,8,46],y="#ccc",z="placeholdersjs",A=new RegExp("(?:^|\\s)"+z+"(?!\\S)"),B="data-placeholder-value",C="data-placeholder-active",D="data-placeholder-type",E="data-placeholder-submit",F="data-placeholder-bound",G="data-placeholder-focus",H="data-placeholder-live",I="data-placeholder-maxlength",J=100,K=document.getElementsByTagName("head")[0],L=document.documentElement,M=a.Placeholders,N=document.getElementsByTagName("input"),O=document.getElementsByTagName("textarea"),P="false"===L.getAttribute(G),Q="false"!==L.getAttribute(H),R=document.createElement("style");R.type="text/css";var S=document.createTextNode("."+z+" {color:"+y+";}");R.styleSheet?R.styleSheet.cssText=S.nodeValue:R.appendChild(S),K.insertBefore(R,K.firstChild);for(var T,U,V=0,W=N.length+O.length;W>V;V++)U=V<N.length?N[V]:O[V-N.length],T=U.attributes.placeholder,T&&(T=T.nodeValue,T&&d(w,U.type)&&s(U));var X=setInterval(function(){for(var a=0,b=N.length+O.length;b>a;a++)U=a<N.length?N[a]:O[a-N.length],T=U.attributes.placeholder,T?(T=T.nodeValue,T&&d(w,U.type)&&(U.getAttribute(F)||s(U),(T!==U.getAttribute(B)||"password"===U.type&&!U.getAttribute(D))&&("password"===U.type&&!U.getAttribute(D)&&g(U,"text")&&U.setAttribute(D,"password"),U.value===U.getAttribute(B)&&(U.value=T),U.setAttribute(B,T)))):U.getAttribute(C)&&(k(U),U.removeAttribute(B));Q||clearInterval(X)},J);e(a,"beforeunload",function(){M.disable()})}}(this);
				}
			},


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

