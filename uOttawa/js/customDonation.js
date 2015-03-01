/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: uOttawa Alumni
 Author(s): Ben Worley
 Product(s): BBNC
 Created: December 2014
 Updated: 01/28/15
***********************************************

***********************************************
ADD SUPPORT FOR CONSTUENT CODE
**********************************************/

BBI_Donation_Form = {

    ottawa: {

        bbnc: {

            pageLoad: function () {
	            
            },

            paneRefresh: function () {
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.tbodyClasses();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationType.frequency();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationType.corporateOption();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationType.typeTitle();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationAmount.radioButtonAmounts();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationAmount.otherAmount();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationAmount.wrapLiAmounts();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.donationAmount.amountTitle();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.personalInfo.matchingGiftOpt();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.personalInfo.tableWrapper();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.personalInfo.personalInfoTitle();
                //BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.userTypeOptions();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.tributeInfo();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.paymentInfo.movePaymentToSidebar();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.paymentInfo.tableWrapper();
				BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.paymentInfo.paymentTitle();
				BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.paymentInfo.cardTypeSection();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.fundDesignation();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.submitButton();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.formErrors();
                BBI_Donation_Form.ottawa.bbnc.customSingleDonationForm.showDonationForm();
            },

			customSingleDonationForm: {
				
				// Add Classes to parent Tbody of each section of the hidden form
				tbodyClasses: function () {
					// Set Vars
					//var donationInfo, additionalInfo, designationSelectList, billingInfo, tributeInfo, paymentInfo;
					
					// Define Vars
					//
					if($('.DonationFormTable').length) {
						// Donation Information/Amount
						if($('tbody.donationInfo').length === 0) {
							$('[id*="txtAmount"]').parents('tbody').addClass('donationInfo');
						}
						
						// Additional Information
						if($('tbody.additionalInfo').length === 0) {
							$('[id*="trDesignation"]').parents('tbody').addClass('additionalInfo');
						}
						
						// Billing Information
						if($('tbody.billingInfo').length === 0) {
							$('[id*="DonationCapture1_txtFirstName"]').parents('tbody').addClass('billingInfo');
						}
						
						// Tribute Information
						if($('tbody.tributeInfo').length === 0) {
							$('[id*="lblTributeHeading"]').parents('tbody').addClass('tributeInfo');
						}
						
						// Payment Information
						if($('tbody.paymentInfo').length === 0) {
							$('[id*="DonationCapture1_lblCardHoldersName"]').parents('tbody').addClass('paymentInfo');
						}
					}
					
				},
				
				donationType: {
					
					frequency: function () {
						if($('.DonationFormTable').length) {
							if($('div.donationFrequency').length === 0) {
								$('<div class="donationFrequency"></div>').insertAfter('table.DonationFormTable > tbody:first-child');
							}
							if($('div.donationFrequency').length) {
								$('table[id*="rdoGiftType"] tr:first-child td').children().wrapAll('<div class="oneTime"><\/div>');
								$('table[id*="rdoGiftType"] tr:last-child td').children().wrapAll('<div class="recurring"><\/div>');
								$('[id*="trRecurrence"]').wrap('<div class="recurringDateOption"><\/div>');
								
								$('.oneTime').prependTo('.donationFrequency');
								$('.recurring').appendTo('.donationFrequency');
								$('.recurringDateOption').insertAfter('.recurring');
							}
						}
							
					},
					
					corporateOption: function () {
						if($('.DonationFormTable').length) {
							$('.additionalInfo tr[id*="trCorporate"]').wrap('<div class="corporateOptionRdoBtn"><\/div>');
							$('.billingInfo tr[id*="trCompany"]').appendTo('.corporateOptionRdoBtn');
							$('.corporateOptionRdoBtn').insertAfter('.donationFrequency');
						}
					},
					
					typeTitle: function() {
						if($('.DonationFormTable').length) {
							var donationTypePayrollDeducLink = $('.donationTypePayrollDeducLink').clone();
							
							$('.DonationListingHeading [id*="lblPersonal"]').wrap('<h3><\/h3>');
							
							$('.DonationListingHeading [id*="lblPersonal"]').parents('tbody').addClass('donationTypeTbody');
							
							$('.donationTypeTbody h3').insertBefore('.donationTypeTbody');
							
							donationTypePayrollDeducLink.insertAfter('.donationFrequency');
						}
					},
					
				},
				
				tributeInfo: function () {
					if($('.DonationFormTable').length) {
						var tributeCkBxWrapper = '<div class="tributeCkBxWrapper"><input type="checkbox" id="turnOnTributesRdo" name="turnOnTributesRdo"> <label for="turnOnTributesRdo">Make my gift in memory or in honor of</label></div>';
						
						$(tributeCkBxWrapper).insertAfter('.corporateOptionRdoBtn');
						
						$('.tributeInfo').appendTo('.tributeCkBxWrapper');
						$('.tributeInfo').wrap('<div class="wrapTributeInfo"></div>');
						
						$('#turnOnTributesRdo').click(function() {
							
							if($('.wrapTributeInfo').is(':visible')) {
								$('.wrapTributeInfo').slideUp();
							} else {
								$('.wrapTributeInfo').slideDown();
							}
						});
						
						$('.tributeInfo .DonationFieldCheckboxCaption input[id*="chkAcknowledge"]').live('click', function(){
							setTimeout(function() {
						      $('#turnOnTributesRdo').attr('checked',true);
								$('.wrapTributeInfo').slideDown();
							}, 2000);
						});
						
						$('.tributeInfo').wrap('<table class="wrapper tributes"></table>');
					}
					
				},
				
				donationAmount: {
					
					radioButtonAmounts: function() {
						var amountRdo = '.donationInfo [id*="tblAmount"] .donationInfo tr td:first-child > span';
						var amountRdoLabel = '[id*="tblAmount"] tr td:last-child span:first-child';
						
						// Moving Radio Btn Labels inline to the appropriate Rdo Btn
						$(amountRdoLabel).each(function(){
							
							$(this).insertAfter($(this).parent().prev().find('span input[type="radio"]'));
							
						});
						
						// Create and insert UL to hold all Giving Amount options
						$('<ul class="amountRdoList"></ul>').insertAfter('.donationInfo [id*="tblAmount"]');
						
						// Add Class of 'radioAmount' to each item and wrap it with an Li
						$(amountRdo).each(function(){
	
				            $(this).addClass('radioAmount').wrapAll('<li></li>');
							
						});
						
						// Move each Li created above to Ul
						$('[id*="tblAmount"] li').each(function() {
							 $(this).prependTo('.amountRdoList');
						});
						
						// Apply Classes to each Li in Ul.amountRdoList
						$('ul.amountRdoList li').each(function(index){
						  $(this).addClass('givingAmount_'+ index);
						});
						
						$('ul.amountRdoList').insertBefore('tbody[id*="pnlDonation"].donationInfo');
						
					},
					
					otherAmount: function () {
						var otherAmtInput, otherInputId;
						
						otherAmtInput = 'tr[id*="trOther"] input[id*="txtAmount"]';
						
						otherInputId = $('.radioAmount input[type="radio"][id*="rdoOther"]').attr('id');
						
						$(otherAmtInput).wrap('<div class="otherAmount"></div>');
						
						$('.otherAmount').insertAfter('ul.amountRdoList li input[id*="rdoOther"]').parent().parent();
						
						// Move Other Giving Amount option to bottom of the list
						$('.otherAmount').parent().parent().insertAfter('ul.amountRdoList li:last-child');
						
						$('<label class="otherAmtRdoLbl" for="' + otherInputId + '">Other</label>').insertAfter('ul.amountRdoList li:last-child .radioAmount input[type="radio"][id*="rdoOther"]');
						
					},
					
					wrapLiAmounts: function () {
						$('.givingAmount_2, .givingAmount_3, .givingAmount_4').wrapAll('<div class="liAmountWrapper">');
						$('.givingAmount_5, .givingAmount_6, .givingAmount_7').wrapAll('<div class="liAmountWrapper">');
						$('.givingAmount_1').wrapAll('<div class="liAmountWrapper">');
						$('.liAmountWrapper:eq(1)').addClass('middle');
					},

					amountTitle: function () {
						var donationAmountLink = $('.donationAmountLink').clone();
						
						$('<h3>Donation Amount</h3>').insertBefore('.amountRdoList');
						
						//$('span[id*="lblPersonal"]').parent('h3').unwrap();
						
						donationAmountLink.insertAfter('.amountRdoList');
					},
				},
				
				fundDesignation: function() {
					var fundDesignationFundSearchLink = $('.fundDesignationFundSearchLink').clone();
					
					//$('.additionalInfo tr[id*="trDesignation"], .additionalInfo tr[trDesignationOther]');
					
					fundDesignationFundSearchLink.insertAfter('.additionalInfo');
					
					$('.additionalInfo').wrap('<table class="wrapper fundDesignation"></table>');
				},
				
				userTypeOptions: function() {
					console.log('userTypeOptions did not run');
					$('tr[id*="trGiftType"]').next().addClass('userTypeTr').prependTo('.billingInfo');
					console.log('userTypeOptions ran');
				},
				
				personalInfo: {
					
					matchingGiftOpt: function () {
						
						var matchingGiftSection = $('[id*="tbdyMatchingGifts"] input[id*="chkMGCompany"]').parent().parent().parent().addClass('matchingGiftOption');	
						var lastName = $('.billingInfo #td_LastName').parent();
						$(matchingGiftSection).insertAfter(lastName);
						$('tr[id*="tr_MGCompany"]').insertAfter('.matchingGiftOption');
						$('.matchingGiftOption > td:first-child').addClass('matchingGiftOptionTd').attr('colspan','2');
						$('.matchingGiftOption td.wsNowrap').remove();
						
					},
					
					tableWrapper: function () {
						$('.billingInfo').wrap('<table class="wrapper billing"></table>');
					},
					
					personalInfoTitle: function() {
						
						$('.billingInfo .BBListingHeading [id*="DonationCapture1_lblBilling"]').wrap('<h3></h3>');
						
						$('.billingInfo h3').insertBefore('.wrapper.billing');
						
						$('span[id*="lblBilling"]').parent('h3').insertBefore('.wrapper.billing');
					},
					
				},
				
				paymentInfo: {
					
					movePaymentToSidebar: function() {
						var paymentInfoTbody, paymentDivWrapper;
						
						paymentInfoTbody = $('table.DonationFormTable tbody[id*="tbdyPaymentInfo"]').clone();
						
						if($('.siteWrapperOuter .wrapContent aside tbody[id*="tbdyPaymentInfo"]').length === 0) {
							paymentInfoTbody.appendTo('.siteWrapperOuter .wrapContent aside');
						}
						
						if($('div.paymentWrapper').length === 0) {
							$('.siteWrapperOuter .wrapContent aside tbody[id*="tbdyPaymentInfo"]').wrap('<div class="paymentWrapper"></div>');
						}
					},
					
					tableWrapper: function () {
						if($('table.wrapper.payment').length === 0) {
							$('.siteWrapperOuter .wrapContent aside .paymentInfo').wrap('<table class="wrapper payment"></table>');
						}
					},
					
					paymentTitle: function() {
					
						$('aside .paymentInfo .BBListingHeading [id*="lblPayment"]').wrap('<h3></h3>');
						
						$('aside .paymentInfo .BBListingHeading h3').insertBefore('.paymentWrapper');
												
						$('.paymentInfo h3').insertBefore('.wrapper.payment');
							
					},
					
					cardTypeSection: function () {
						var cardNumber, cardTypeEnt, creditCardValidator, cardTypeVisa, cardTypeMasterCard, cardTypeAmEx, cardTypeDiscover, cardTypeInvalid, cardType;
						
						cardNumber = 'aside input[id*="txtCardNumber"]';
						
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
	                    
	                    if($('.cardTypeEnt').length === 0) {	
	                    	$('<span class="cardTypeEnt hide"><\/span>').insertAfter('aside input[id*="txtCardNumber"]');
						}
						
						// Get Card Number entered
	                    $(cardNumber).keyup(function () {
	                        if ($(this).val().match(cardTypeVisa)) {
	                            $(this).removeClass().addClass('cardTypeVisa');
	                            $(cardType).html('Visa');
	                            $('aside select[id*="cboCardType"]').find('option:contains(Visa)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeMasterCard)) {
	                            $(this).removeClass().addClass('cardTypeMasterCard');
	                            $(cardType).html('MasterCard');
	                            $('aside select[id*="cboCardType"]').find('option:contains(MasterCard)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeAmEx)) {
	                            $(this).removeClass().addClass('cardTypeAmEx');
	                            $(cardType).html('American Express');
	                            $('aside select[id*="cboCardType"]').find('option:contains(American)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeDiscover)) {
	                            $(this).removeClass().addClass('cardTypeDiscover');
	                            $(cardType).html('Discover');
	                            $('aside select[id*="cboCardType"]').find('option:contains(Discover)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeInvalid) || $(this).val() === '') {
	                            $(this).removeClass().addClass('cardTypeInvalid');
	                            $('.cardTypeEnt').text('');
	                        }
	                    });
	
	                    // Get Card Type Based on Card Number
	                    $('.cardTypeEnt').text(cardTypeEnt);
	
	                    // Get Credit Card Number Entered
	                    $(cardNumber).keyup(function () {
	                        if ($(this).val().match(creditCardValidator)) {
	                            $(this).removeClass('invalid').addClass('valid');
	                        } else {
	                            $(this).removeClass('valid').addClass('invalid');
	                        }
	                    });
	
	                    $(cardNumber).blur(function () {
	                        if ($(this).val().match(creditCardValidator)) {
	                            $(this).removeClass('invalid').addClass('valid');
	                        } else {
	                            $(this).removeClass('valid').addClass('invalid');
	                        }
	                    });

						
						$('select[id*="cboCardType"]').parent().parent().hide();
					},

					
				},
				
				submitButton: function () {
					
					$('.DonationButtonCell input.DonationSubmitButton').insertAfter('.wrapper.billing');
					alert('Hey Ryan');
					$('tr[id*="trGiftType"]').next().prependTo('.billingInfo');
					
				},
				
				formErrors: function () {
					$('div[id*="ValidationSummary1"].DonationValidationSummary').prependTo('.DonationFormTable');
				},
				
				showDonationForm: function() {
					$('table.DonationFormTable').addClass('show');	
				},
				
			},

        } // end bbnc

    } // end ottawa

}; // end BBI_Donation_Form

/*
===================================================
 Run Global Functions
 --------------------------------------------------
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
 --------------------------------------------------
*/

// Functions to run each time the page loads
$(document).ready(function () {
    BBI_Donation_Form.ottawa.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
    Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function () {
        BBI_Donation_Form.ottawa.bbnc.paneRefresh();
        
    });
} catch (err) {
    console.log('Sys is probably undefined');
    $(document).ready(function () {
        BBI_Donation_Form.ottawa.bbnc.paneRefresh();
    });
}
