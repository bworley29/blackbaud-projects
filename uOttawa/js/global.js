/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: uOttawa University
 Author(s): Ben Worley
 Product(s): BBNC
 Created: Dec 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI_Global = {

	uOttawa: {

		bbnc: {

			pageLoad: function(){
				BBI_Global.uOttawa.bbnc.hoverIntPlugin();
				BBI_Global.uOttawa.bbnc.mainNav();
				BBI_Global.uOttawa.bbnc.mobile.mobileToggles();
			}, 	
			
			paneRefresh: function(){
				BBI_Global.uOttawa.bbnc.parts.mainMenuPart();
				BBI_Global.uOttawa.bbnc.parts.quickSearch();
				BBI_Global.uOttawa.bbnc.parts.miniDonation();
				BBI_Global.uOttawa.bbnc.parts.donationFormQueryString();
				BBI_Global.uOttawa.bbnc.addClassToEmptyTableCells();
				BBI_Global.uOttawa.bbnc.addClassToRequiredInputs();
				BBI_Global.uOttawa.bbnc.customSingleDonationForm.tbodyClasses();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationType.frequency();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationType.corporateOption();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationType.typeTitle();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationAmount.radioButtonAmounts();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationAmount.otherAmount();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationAmount.wrapLiAmounts();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.donationAmount.amountTitle();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.personalInfo.matchingGiftOpt();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.personalInfo.tableWrapper();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.personalInfo.userTypeOptions();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.personalInfo.personalInfoTitle();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.personalInfo.sourceOptions();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.tributeInfo();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.paymentInfo.tableWrapper();
				BBI_Global.uOttawa.bbnc.customSingleDonationForm.paymentInfo.paymentTitle();
				BBI_Global.uOttawa.bbnc.customSingleDonationForm.paymentInfo.cardType();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.fundDesignation();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.userAttributeList();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.selectListDefaultText();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.submitButton();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.formErrors();
                BBI_Global.uOttawa.bbnc.customSingleDonationForm.showDonationForm();
			},
			
			// Hover-Int Plugin
			hoverIntPlugin: function() {
			    (function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);
			},
			
			// Main Nav
			mainNav : function() {
				
				$('nav ul.mainNav > li').removeClass('open');
			    $('.megaMenu').removeClass('shown');
			    var viewport = function() {
			    		var e = window,
			    			a = 'inner';
			    		if (!('innerWidth' in window)) {
			    			a = 'client';
			    			e = document.documentElement || document.body;
			    		}
			    		return {
			    			width: e[a + 'Width'],
			    			height: e[a + 'Height']
			    		};
			    	}();
			    $(window).on('orientationchange resize', function() {
			    	var e = window,
			    		a = 'inner';
			    	if (!('innerWidth' in window)) {
			    		a = 'client';
			    		e = document.documentElement || document.body;
			    	}
			    	viewport = {
			    		width: e[a + 'Width'],
			    		height: e[a + 'Height']
			    	};
			    });
	
				var topLevelListItemLink, megaMenuItemDivToMove;
				
			    topLevelListItemLink = 'nav ul.mainNav > li > a';
			    megaMenuItemDivToMove = '.wrapMegaMenuItems .megaMenu';
			    
			    $(topLevelListItemLink).each(function() {
			    	$(megaMenuItemDivToMove).eq($(this).index()).insertAfter(this);
			    });
				
				var topLevelListItem, megaMenuDiv;
				
				topLevelListItem = 'nav ul.mainNav > li';
				megaMenuDiv = 'nav ul.mainNav > li > a + .megaMenu';
				
				//Top Level Hover
			    $(topLevelListItem).hoverIntent({
			    	sensitivity: 3,
			    	// number = sensitivity threshold (must be 1 or higher)    
			    	interval: 150,
			    	// number = milliseconds for onMouseOver polling interval     
			    	timeout: 150,
			    	// number = milliseconds delay before onMouseOut
			    	over: function() {
			    		$(this).addClass('hover');
			    		if (viewport.width > 735) {
			    			$(this).addClass('open');
			    			$(megaMenuDiv).removeClass('shown');
			    			$(this).children('.megaMenu').addClass('shown');
			    		}
			    	},
			    	out: function() {
			    		$(this).removeClass('open');
			    		$(megaMenuDiv).removeClass('shown');
			    		$(this).removeClass('hover');
			    	}
			    }, viewport);
			
				//Top Level Click//
			    $(topLevelListItemLink).on('click touchend', function(event) {
			    	if (viewport.width > 735) {
			    		event.preventDefault();
			    		$(topLevelListItemLink).removeClass('open');
			    		$(this).addClass('open');
			    		$(megaMenuDiv).removeClass('shown');
			    		$(this).parent('li').children('.megaMenu').addClass('shown');
			    	}
			    });
				
			},
			    								
			
			mobile: {
					
				mobileToggles: function () {
					// Define all vars here
					var toggleMenuIcon, desktopMainNav, desktopUtilityNav;
					
					// Set all vars here
					desktopUtilityNav = $('ul.utilityNav').clone();
					mobileUtilityToggleIcon = 'a.toggle.utility';
					desktopMainNav = $('.wrapMainNav ul.mainNav').clone();
					
					
					//
					$(desktopUtilityNav).insertAfter(mobileUtilityToggleIcon);
					//
					$('#uottawa-mobile-nav-toggle').on('click',function() {
						
						$(this).parent().next('.wrapMainNav').slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
					});

				},
							
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
							
							window.location = '2015-training-donation?amount=' + dntAmnt;
							return false;
							
						});
					}
				},
				
				donationFormQueryString: function () {
					
					if( $('.DonationFormTable').length >= 1){						
						// pass amount via url
						if(window.location.href.indexOf('?amount') != -1){
							var amount = window.location.href.split('=')[1];
							$('[name*="txtAmount"]').val(amount).trigger('keyup');
							$('[name*="givingLevels"][id*="rdoOther"]').trigger('click');
							
						}

					}
					if( $('.DonationFormTable').length >= 1){						
						// pass amount via url
						if(window.location.href.indexOf('&amount') != -1){
							var amount = window.location.href.split('=')[3];
							$('[name*="givingLevels"][id*="rdoOther"]').trigger('click');
							$('[name*="txtAmount"]').val(amount).trigger('keyup');
						}
					}
				},
				
			},
			
			customSingleDonationForm: {
				
				// Add Classes to parent Tbody of each section of the hidden form
				tbodyClasses: function () {
					// Set Vars
					//var donationInfo, additionalInfo, designationSelectList, billingInfo, tributeInfo, paymentInfo;
					
					// Define Vars
					//
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
					
				},
				
				donationType: {
					
					frequency: function () {
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
							
					},
					
					corporateOption: function () {
						
						$('.additionalInfo tr[id*="trCorporate"]').wrap('<div class="corporateOptionRdoBtn"><table class="trCorporate"></table><\/div>');
						$('.billingInfo tr[id*="trCompany"]').appendTo('.corporateOptionRdoBtn');
						$('.corporateOptionRdoBtn').insertAfter('.donationFrequency');
						$('tr[id*="trCompany"]').wrap('<table class="trCompany"></table>');
						
						$('.corporateOptionRdoBtn [id*="trCorporate"] .DonationFieldCaption').insertAfter('.corporateOptionRdoBtn [id*="trCorporate"] .DonationFieldControlCell');
					},
					
					typeTitle: function() {
						var donationTypePayrollDeducLink = $('.donationTypePayrollDeducLink').clone();
						
						$('.DonationListingHeading [id*="lblPersonal"]').wrap('<h3><\/h3>');
						
						$('.DonationListingHeading [id*="lblPersonal"]').parents('tbody').addClass('donationTypeTbody');
						
						$('.donationTypeTbody h3').insertBefore('.donationTypeTbody');
						
						donationTypePayrollDeducLink.insertAfter('.donationFrequency');
					},
					
				},
				
				tributeInfo: function () {
					
					var tributeCkBxWrapper = '<div class="tributeCkBxWrapper"><input type="checkbox" id="turnOnTributesRdo" name="turnOnTributesRdo"> <label for="turnOnTributesRdo">Make my gift in memory or in honor of</label></div>';
					
					$(tributeCkBxWrapper).insertAfter('.corporateOptionRdoBtn');
					
					$('.tributeInfo').appendTo('.tributeCkBxWrapper');
					$('.tributeInfo').wrap('<div class="wrapTributeInfo"></div>');
					
					$('.tributeInfo .DonationFieldCheckboxCaption input[id*="chkAcknowledge"]').live('click', function(){
						
						if($('[id*="trAcknowledgeeFirstName"]').length < 1) {
							setTimeout(function() {
						      $('#turnOnTributesRdo').attr('checked',true);
							  $('.wrapTributeInfo').slideDown('fast');
							  console.log('chkAcknowledge clicked');
							}, 2000);
						
						}
						
						if($(this).not(':checked')) {
							setTimeout(function() {
						      $('#turnOnTributesRdo').attr('checked',true);
							  $('.wrapTributeInfo').slideDown('fast');
							}, 2000);
						}
						
					});
					
					$('#turnOnTributesRdo').click(function() {
						
						if($('.wrapTributeInfo').is(':visible')) {
							$('.wrapTributeInfo').slideUp();
							if($('.tributeInfo .DonationFieldCheckboxCaption input[id*="chkAcknowledge"]').is(':checked')) {
								
								$('.tributeInfo .DonationFieldCheckboxCaption input[id*="chkAcknowledge"]').trigger('click');
								
								setTimeout(function() {
									
							      $('#turnOnTributesRdo').attr('checked',false);
								  $('.wrapTributeInfo').slideUp();
								  console.log('turnOnTributesRdo clicked');
								  
								}, 2000);
							}
						} else {
							$('.wrapTributeInfo').slideDown();
						}
						
					});
					
					var tributesBtnChecked = $('#turnOnTributesRdo');
					
					$('[id*="chkCorporate"]').live('click', function(){
						setTimeout(function() {
							console.log('chkCorporate clicked');
						  if($(tributesBtnChecked).is(':checked')) {
							  console.log('is checked');
						    $('#turnOnTributesRdo').attr('checked', true);
						    $('.wrapTributeInfo').slideDown();   
						  }
						}, 2000);
					  
					});
					
					//$('.tributeInfo').wrap('<table class="wrapper tributes"></table>');
										
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
				
				userAttributeList: function () {
					$('.fundDesignation label[id*="lblLgnCt"]').parent('td.DonationFieldCaption').addClass('hide');
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
					
					userTypeOptions: function() {
						var userTypeRdoList = $('table.BBFormChecklist').parent('div.BBFormChecklistContainer').parent().parent('tr');
						$(userTypeRdoList).addClass('userTypeTr').insertAfter('.billingInfo > tr:first-child');
						
						$('[id*="trAnonymous"]').insertAfter('.userTypeTr');
						//$('.userTypeTr > td:eq(1)').attr('colspan','2');
						//$('.userTypeTr > td:first-child').hide();
					},
					
					personalInfoTitle: function () {
						$('.billing .billingInfo .DonationCaptureListingHeading span').wrap('<h3 class="personalInfoTitle">');
						//$('.personalInfoTitle').insertAfter('.billing .billingInfo > tr');
					},
					
					sourceOptions: function () {
						var personalEmail = $('input[id*="txtEmail"]').parent().parent();
						$('[id*="trSource"]').insertAfter(personalEmail);
					},
					
				},
				
				paymentInfo: {
					
					movePaymentToSidebar: function() {
						var paymentInfoTbody, paymentDivWrapper;
						
						paymentInfoTbody = $('tbody[id*="tbdyPaymentInfo"]').not('.notClone').clone();
						paymentInfoTbody.addClass('notClone');
						$('.wrapContent section table.DonationFormTable tbody[id*="tbdyPaymentInfo"]').remove();
												
						if($('.siteWrapperOuter .wrapContent aside tbody[id*="tbdyPaymentInfo"]').length === 0) {
							paymentInfoTbody.appendTo('.siteWrapperOuter .wrapContent aside');
						}
						
						if($('div.paymentWrapper').length === 0) {
							$('.siteWrapperOuter .wrapContent aside tbody[id*="tbdyPaymentInfo"]').wrap('<div class="paymentWrapper"></div>');
						}
					},
					
					tableWrapper: function () {
						if($('table.wrapper.payment').length === 0) {
							//$('.siteWrapperOuter .wrapContent aside .paymentInfo').wrap('<table class="wrapper payment"></table>');
							$('.paymentInfo').wrap('<table class="wrapper payment"></table>');
						}
					},
					
					paymentTitle: function() {
					
						$('.paymentInfo .BBListingHeading [id*="lblPayment"]').wrap('<h3></h3>');
						
						$('.paymentInfo .BBListingHeading h3').insertBefore('.paymentWrapper');
												
						$('.paymentInfo h3').insertBefore('.wrapper.payment');
							
					},
					
					cardType: function () {
						var cardNumber, cardTypeEnt, creditCardValidator, cardTypeVisa, cardTypeMasterCard, cardTypeAmEx, cardTypeDiscover, cardTypeInvalid, cardType;
						
						cardNumber = 'input[id*="txtCardNumber"]';
						
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
	                    	$('<span class="cardTypeEnt hide"><\/span>').insertAfter('input[id*="txtCardNumber"]');
						}
						
						// Get Card Number entered
	                    $(cardNumber).keyup(function () {
	                        if ($(this).val().match(cardTypeVisa)) {
	                            $(this).removeClass().addClass('cardTypeVisa');
	                            $(cardType).html('Visa');
	                            $('select[id*="cboCardType"]').find('option:contains(Visa)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeMasterCard)) {
	                            $(this).removeClass().addClass('cardTypeMasterCard');
	                            $(cardType).html('MasterCard');
	                            $('select[id*="cboCardType"]').find('option:contains(MasterCard)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeAmEx)) {
	                            $(this).removeClass().addClass('cardTypeAmEx');
	                            $(cardType).html('American Express');
	                            $('select[id*="cboCardType"]').find('option:contains(American)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeDiscover)) {
	                            $(this).removeClass().addClass('cardTypeDiscover');
	                            $(cardType).html('Discover');
	                            $('select[id*="cboCardType"]').find('option:contains(Discover)').attr('selected', 'selected');
	                        } else if ($(this).val().match(cardTypeInvalid) || $(this).val() === '') {
	                            $(this).removeClass().addClass('cardTypeInvalid');
	                            $('.cardTypeEnt').text('');
	                        }
	                    });
	
	                    // Get Card Type Based on Card Number
	                    $('.cardTypeEnt').text(cardTypeEnt);
						
						$('select[id*="cboCardType"]').parent().parent().hide();
					},
					
				},
				
				selectListDefaultText: function () {
					
					$('table.DonationFormTable select').each(function(){

					  if($(this).children('option:eq(0)').html() === '') {
					  
					    $(this).children('option:eq(0)').html('&lt;Please Select&gt;');
					  }
					
					});
					
				},
				
				submitButton: function () {
					//var cloneSubmit = $('.DonationButtonCell input.DonationSubmitButton').clone();
					
					$('input.DonationSubmitButton').parent().parent().appendTo('.paymentInfo');
					
					$('input.DonationSubmitButton').click(function(){
						
						if($('#turnOnTributesRdo').is(':checked')) {
							setTimeout(function() {
						      $('#turnOnTributesRdo').attr('checked',true);
							  $('.wrapTributeInfo').slideDown('fast');
							}, 2000);
						}
						
					});
					
					//cloneSubmit.insertAfter('.paymentWrapper');
				},
				
				formErrors: function () {
					$('div[id*="ValidationSummary1"].DonationValidationSummary').prependTo('.DonationFormTable');
				},
				
				showDonationForm: function() {
					$('table.DonationFormTable').addClass('show');	
				},
				
			},

		}

	} // end uOttawa

}; // end BBI_Global

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
	BBI_Global.uOttawa.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI_Global.uOttawa.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI_Global.uOttawa.bbnc.paneRefresh();
     });
}
