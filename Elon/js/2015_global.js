/* Blackbaud ISD Custom Javascript
====================================================================
Client: Elon University  
Author(s): Ben Worley
Product(s): BBNC
Created: 02/17/2015
Updated: mm/dd/yyyy


CHANGELOG
====================================================================
mm/dd/yyyy: 


INSTRUCTIONS
====================================================================
1. Include this file at the layout level on the very last line.
2. Functions should be placed in pageInit, pageRefresh or pageLoad, respectively.
3. Every custom function should have its code wrapped in a conditional, checking for the existence (.length !==0) of the specific part being altered.
*/


var BBI = BBI || {

	// update these values when updating changelog
	Config: {
		version: 1.0,
		updated: 'mm/dd/yyyy hh:mm',
		isEditView: !!window.location.href.match('pagedesign')
	},
	
	Defaults: {
		rootpath: BLACKBAUD.api.pageInformation.rootPath,
		pageId: BLACKBAUD.api.pageInformation.pageId
	},
	
	Methods: {
		// all functions which should run instantly
		pageInit: function () {
			// runs on partial page refresh
			Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function () {
				BBI.Methods.pageRefresh();
			});
			
			// runs on full page load
			$(document).ready(function () {
				BBI.Methods.pageLoad();
			});
		},
		
		// runs on partial page refresh
		pageRefresh: function () {
			BBI.Methods.moveHeader();
			BBI.Methods.addClassToRequiredInputs();
			BBI.Methods.addClassToTextareaLabel();
			BBI.Methods.addClassToEmptyTableCells();
			BBI.Methods.parts.donationForm();
			BBI.Methods.responsiveDonationForm();
			BBI.Methods.responsiveUserEmailPreferences();
			BBI.Methods.responsiveEventRegistrationNew();
			BBI.Methods.responsivePaymentPart();
			BBI.Methods.responsiveUserLogin();
			BBI.Methods.responsiveSurvey();
		},
		
		// runs on full page load
		pageLoad: function () {
			BBI.Methods.getHeaderAndFooter();
			BBI.Methods.fixedSidebar();
			BBI.Methods.dynamicBreadcrumb();
			BBI.Methods.mobileSidebarToggle();
			BBI.Methods.checkWindowInitialSize();
			$(window).resize(BBI.Methods.windowResizeFunctions);
			$(window).scroll(BBI.Methods.scrollFunctions);
		},
		
		parts: {
			donationForm: function () {
				// Shopping Cart
				if($('table.DonationFormTable').length){
					if($('tr[id*="trCart"] > td.emptyTD:hidden')) {
						$('tr[id*="trCart"] > td.emptyTD').next().attr('colspan','2');
					}
				}
				// For when only the Other Giving option is configured
				if($('table[id$="tblAmount"] input[name$="givingLevels"]').length === 0) {
					$('[id*="TB_pnlDonation"]').addClass('onlyOtherAmtShown');
				}
				
				if($('table[id*="tblAmount"]').length){
					// Define Variables
					var giveAmtDescription, giveAmtDollarAmt;
					
					// Set Variables
					giveAmtDescription = 'table[id*="tblAmount"] .DonationFieldControlCell span input[name*="givingLevels"] + label';
					
					// Iterate over all giving amounts and place the dollar amount description inline to each dollar amount
					$(giveAmtDescription).each(function (){
						var giveAmtDescriptionClone = $(this).clone();
						// Find Giving amount dollar amount TD
						giveAmtDollarAmt = $(this).parent('span').parent('td').next('td');
						
						// Insert Giving amount text after the dollar amount
						$(giveAmtDescriptionClone).appendTo(giveAmtDollarAmt).addClass('donateGivAmtTxt');
						
					});
					
					$('.donateGivAmtTxt').each(function() {
						$(this).wrap('<span class="donateGivAmtLblTxt">');
						$(this).replaceWith( $(this).html()		
							.replace(/<label/gi, '<div class="customLoginForm"')
					        .replace(/<\/label/gi, '<\/div>')
					    );
					    
					});
						
				}
			},

		},
		
		getHeaderAndFooter: function () {
			if($('.supportSite').length) {
				$.ajax({
					url: '//www.elon.edu/globalheaderapi/api/main/',
					type: 'GET',
					dataType: 'jsonp',
					crossDomain: true,
					jsonpCallback: 'myCustomCallbackName',
					success: function(data) {
						$('head').append($(data.HeaderAndFooterStyles));
						
						$('body').prepend($(data.HeaderHTML));
						$('body').append($(data.FooterHTML));
					
						$('head').append($(data.HeaderScripts));
						
					},
					error: function(jqXHR,status,error) {
						//console.log(error);
					}
				});
			}
			else if($('.lawSite').length) {
				$.ajax({
					url: '//www.elon.edu/globalheaderapi/api/law/',
					type: 'GET',
					dataType: 'jsonp',
					crossDomain: true,
					jsonpCallback: 'myCustomCallbackName',
					success: function(data) {
						$('body').prepend($(data.HeaderHTML));
						$('body').append($(data.FooterHTML));
						
						$('head').append($(data.HeaderAndFooterStyles));
						$('head').append($(data.HeaderScripts));
					},
					error: function(jqXHR,status,error) {
						//alert('error');
					}
				});
			}
	
		},
		
		moveHeader: function () {
			if($('#homepage-header').length && $('[id*="bbBetaAdminMenuDiv"]').length){
				$('#homepage-header').insertAfter('[id*="bbBetaAdminMenuDiv"]');
			}
		},
		
		mobileSidebarToggle: function () {
			$('.wrapContent .mobileSidebarToggle').click(function(){
				
				$(this).next('ul').slideToggle();
				$(this).toggleClass('active');
			});
			
		},
		
		dynamicBreadcrumb: function () {
			$('li.currentPage a').html('');
			var dynPageTitle = $('h1.BBDynamicPageTitle').clone();
			if($('li.currentPage a').html() === '') {
				dynPageTitle.prependTo('li.currentPage a');
			}
		},
		
		fixedSidebar: function () {
			var navTopPosition = $('#secondary-nav').offset().top + 120
			var navLeftPosition = $('#secondary-nav').offset().left
			var nav = $('#secondary-nav');
			var scrolled = false;
			$(window).scroll(function() {
				if (navTopPosition < $(window).scrollTop() && !scrolled) {
					nav.addClass('fixeSidebar').css('left',navLeftPosition);
					scrolled = true;
				}
				if (navTopPosition > $(window).scrollTop() && scrolled) {
					nav.removeClass('fixeSidebar').css('left','auto');
					scrolled = false;
				}
			});
		},
		
		// gets variables and values from URL
		getUrlVars: function () {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
				vars[key] = unescape(value.replace(/\+/g, " "));
			});
			return vars;
		},
		
		returnQueryValueByName: function (name) {
			BLACKBAUD.api.querystring.getQueryStringValue(name);
		},
		
		// fix positioning of part context menu
		fixPositioning: function () {
			$('div[id*="_panelPopup"]').appendTo('body');
			$('div[id*="_designPaneCloak"]').css({
				"top": "0px",
				"left": "0px"
			});
			$('.DesignPane').css("position", "relative");
		},
				
		// code that runs only the first time the window size is calculated after a full page load
		checkWindowInitialSize: function () {
			// calculate scroll bar width if any browser other than Safari is detected
			if (!((navigator.userAgent.indexOf('Safari') != -1) && (navigator.userAgent.indexOf('Chrome') == -1))) {
				BBI.Methods.params.scrollBarWidth = window.innerWidth - $("body").width();
			}
			// if tablet size
			if (($(window).width() < BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth) && ($(window).width() >= BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth)) {
				BBI.Methods.goTabletOnce();
				BBI.Methods.goTabletAlways();
				// else if phone size
			} else if ($(window).width() < BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth) {
				BBI.Methods.goPhoneOnce();
				BBI.Methods.goPhoneAlways();
				// otherwise, must be desktop size
			} else {
				BBI.Methods.goDesktopOnce();
				BBI.Methods.goDesktopAlways();
			}
			BBI.Methods.params.oldWidth = $(window).width();
		},
		
		// code that runs each time the window is resized or device orientation is rotated
		checkWindowSize: function () {
			// calculate scroll bar width if any browser other than Safari is detected
			if (!((navigator.userAgent.indexOf('Safari') != -1) && (navigator.userAgent.indexOf('Chrome') == -1))) {
				BBI.Methods.params.scrollBarWidth = window.innerWidth - $("body").width();
			}
			// if moving into tablet size from either phone or desktop size
			if (($(window).width() < BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth) && ($(window).width() >= BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth) && ((BBI.Methods.params.oldWidth >= BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth) || (BBI.Methods.params.oldWidth < BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth))) {
				BBI.Methods.goTabletOnce();
				BBI.Methods.goTabletAlways();
			}
			// if currently at tablet size but resizing within tablet size
			else if (($(window).width() < BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth) && ($(window).width() >= BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth)) {
				BBI.Methods.goTabletAlways();
			}
			// if moving into phone size from anything greater than phone size
			else if (($(window).width() < BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth) && (BBI.Methods.params.oldWidth >= BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth)) {
				BBI.Methods.goPhoneOnce();
				BBI.Methods.goPhoneAlways();
			}
			// if currently at phone size but resizing within phone size
			else if ($(window).width() < BBI.Methods.params.breakBelow2 - BBI.Methods.params.scrollBarWidth) {
				BBI.Methods.goPhoneAlways();
			}
			// if moving to desktop size from anything smaller
			else if (($(window).width() >= BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth) && (BBI.Methods.params.oldWidth < BBI.Methods.params.breakBelow1 - BBI.Methods.params.scrollBarWidth)) {
				BBI.Methods.goDesktopOnce();
				BBI.Methods.goDesktopAlways();
			}
			// other size must be moving from desktop to desktop size
			else {
				BBI.Methods.goDesktopAlways();
			}
			BBI.Methods.params.oldWidth = $(window).width();
		},
		
		// adds "required" class to inputs that are required fields
		addClassToRequiredInputs: function () {
			// check if we're on a page with a form first
			if (($('.BBFormTable').length) || ($('.PaymentPart_FormContainer').length) || ($('div[id$="ev2wiz"]').length) || ($('div[id$="formWizard"]').length)) {
				// iterate over all form inputs and drop-downs
				$('input, select, textarea').each(function () {
					// for each one, test if it's a required field
					if ((($(this).parent().next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).parent().next('td').css('visibility') != 'hidden')) || (($(this).closest('.BBFieldControlCell').next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).closest('.BBFieldControlCell').next('td').css('visibility') != 'hidden')) || ($(this).closest('.BBFieldControlCell').next('td').children("span:first").hasClass('BBFormRequiredFieldMarker')) || ($(this).next('span').hasClass('BBFormRequiredFieldMarker'))) {
						$(this).addClass('required');
						if ($(this).attr('id').indexOf('cboYear') >= 0) {
							// do nothing... it's the year ddl in credit card month/year
						} else if ($(this).attr('id').indexOf('cboMonth') >= 0) {
							$(this).closest('table').parent().prev('td[id$="ExpiryLbl"]').children('label').eq(0).addClass('required');
						} else if ($(this).prev('label').length > 0) {
							$(this).prev('label').addClass('required');
						} else if ($(this).prev('div').children('label').length > 0) {
							$(this).prev('div').children('label').eq(0).addClass('required');
						} else {
							$(this).parent().prev('td').children('label').eq(0).addClass('required');
						}
					}
				});
			}
		},
		
		// add class to label for textarea inputs on div-based forms
		addClassToTextareaLabel: function () {
			$('.BBDivFieldContainer textarea').prev('label').addClass('labelForTextarea');
		},
		
		// adds class to empty table cells
		addClassToEmptyTableCells: function () {
			if ($('td').length) {
				$('td').each(function () {
					if ($(this).children().length > 0) {
						if ($(this).children(':visible').length === 0) {
							$(this).addClass('emptyTD');
						}
					} else if ($.trim($(this).html()) === "") {
						$(this).addClass('emptyTD');
					}
				});
				$('td > span').each(function () {
					if ($.trim($(this).html()) === "") {
						$(this).addClass('emptyTDSpan');
					}
				});
			}
		},
		
		// bind handler to change event of checkboxes to call separate function to apply/remove classes to/from label when clicked
		responsiveCheckboxesChangeEvent: function () {
			$('input[type="checkbox"]').change(BBI.Methods.responsiveCheckboxesAddClass).next('label').addClass('checkboxLabel');
		},
		
		// dynamic classes added/removed from checkbox labels for mobile treatment
		responsiveCheckboxesAddClass: function () {
			$('input[type="checkbox"]').each(function () {
				if ($(this).attr('checked') == 'checked') {
					$(this).next('label').addClass('boxChecked');
				} else {
					$(this).next('label').removeClass('boxChecked');
				}
			});
		},
		
		// bind handler to change event of giving amount radio buttons to call separate function to apply/remove classes to/from labels when clicked/tapped
		responsiveGivingAmountsChangeEvent: function () {
			$('table[id$="tblAmount"] input[name$="givingLevels"]').change(BBI.Methods.responsiveGivingAmountsAddClass);
		},
		
		// give class to the giving amount for the radio button that's currently selected
		responsiveGivingAmountsAddClass: function () {
			$('table[id$="tblAmount"] input[name$="givingLevels"]').each(function () {
				if ($(this).attr('checked') == 'checked') {
					if ($(this).val() == 'rdoOther') {
						$(this).siblings('label').eq(0).addClass('boxChecked');
					} else {
						$(this).closest('td').next('td').children('.radioLabel').addClass('boxChecked');
					}
				} else {
					if ($(this).val() == 'rdoOther') {
						$(this).siblings('label').eq(0).removeClass('boxChecked');
					} else {
						$(this).closest('td').next('td').children('.radioLabel').removeClass('boxChecked');
					}
				}
			});
		},
		
		// bind handler to change event of radio buttons (except giving amounts) to call separate function to apply/remove classes to/from labels when clicked/tapped
		responsiveRadioButtonChangeEvent: function () {
			if ($('input[type="radio"]').length) {
				$('input[type="radio"]').filter(function () {
					return -1 === this.name.indexOf('givingLevels');
				}).change(BBI.Methods.responsiveRadioButtonAddClass).next('label').addClass('radioLabel');
			}
		},
		
		// give class to radio button label if its button has been clicked
		responsiveRadioButtonAddClass: function () {
			$('input[type="radio"]').filter(function () {
				return -1 === this.name.indexOf('givingLevels');
			}).each(function () {
				if ($(this).attr('checked') == 'checked') {
					$(this).next('label').addClass('boxChecked');
				} else {
					$(this).next('label').removeClass('boxChecked');
				}
			});
		},
		
		// Donation Form classes and responsive behavior
		responsiveDonationForm: function () {
			if ($('.DonationFormTable').length) {
				$('.DonationFormTable').addClass('hide');
				// classes that help with targeted styling
				$('label[id$="lblTxtOnMonthlyQuarterly"]').parent().addClass('labelRecurrenceStartingOn');
				$('input[id$="Recurrence_rdoDay"]').parent().parent().addClass('radioRecurrenceDay');
				$('select[id$="Recurrence_ddlDayNumber2"]').parent().addClass('inputDayOfMonth');
				$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(1)').addClass('emptyTDBelowOnLabel');
				$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(2)').addClass('radioRecurrenceDayFrequency');
				$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(3)').addClass('inputRecurrenceDayFrequency');
				$('tr[id$="Recurrence_trAnnually"] > td').eq(0).addClass('annualRecurrenceTD');
				// swap text in weekly and monthly drop-downs
				$('select[id$="Recurrence_ddlPosition"]').each(function () {
					$(this).children('option').eq(0).html('1st');
					$(this).children('option').eq(1).html('2nd');
					$(this).children('option').eq(2).html('3rd');
					$(this).children('option').eq(3).html('4th');
				});
				$('select[id$="Recurrence_ddlDayOfWeek2"]').each(function () {
					$(this).children('option').eq(0).html('Sun');
					$(this).children('option').eq(1).html('Mon');
					$(this).children('option').eq(2).html('Tue');
					$(this).children('option').eq(3).html('Wed');
					$(this).children('option').eq(4).html('Thu');
					$(this).children('option').eq(5).html('Fri');
					$(this).children('option').eq(6).html('Sat');
				});
				$('label[for$="Recurrence_ddlDayNumber2"], label[for$="Recurrence_ddlDayOfWeek2"]').each(function () {
					if ($(this).html().indexOf('of every month') >= 0) {
						$(this).html('monthly');
					} else if ($(this).html().indexOf('of every three months') >= 0) {
						$(this).html('every 3rd mo.');
					}
				});
				// shorter text for corporate and anonymous donations
				$('input[id$="chkCorporate"] + label').html('Give on behalf of a company');
				$('input[id$="chkAnonymous"] + label').html('Give anonymously');
				// give giving amount span a class and make it clickable to set giving amount
				if ($('input[name$="givingLevels"]').length) {
					$('input[name$="givingLevels"]').each(function () {
						$(this).closest('td').addClass('givingAmountInputTD').next('td').children('span').eq(0).addClass('givingAmount radioLabel').click(function () {
							// remove "checked" class from other amount text input <tr> wrapper
							$(this).parent().parent().siblings('tr[id$="trOther"]').children('td').removeClass('checked');
							// fire click event of the hidden input when the label is clicked
							$(this).parent().prev('td').find('label').eq(0).click();
							if ($('input[id$="txtAmount"]').length) {
								$('input[id$="txtAmount"]').val('');
							}
						});
					});
					// give the "Other Amount" label the same classes so that it's styled the same way in mobile mode
					$('input[name$="givingLevels"][id$="rdoOther"]').next('label').addClass('givingAmount radioLabel');
				}
				// add class to <tr> wrapper around the "Other Amount" box when the "Other" input's label is clicked
				if ($('input[id$="txtAmount"]').length) {
					$('input[id$="rdoOther"]').click(function () {
						$(this).parent().parent().next('td').addClass('checked');
					});
				}
				// nice treatment for checkboxes and radio buttons on mobile devices
				BBI.Methods.responsiveCheckboxesAddClass();
				BBI.Methods.responsiveCheckboxesChangeEvent();
				BBI.Methods.responsiveGivingAmountsAddClass();
				BBI.Methods.responsiveGivingAmountsChangeEvent();
				BBI.Methods.responsiveRadioButtonAddClass();
				BBI.Methods.responsiveRadioButtonChangeEvent();
				// add "clearfix" class to span that contains company matching gift link
				if ($('input[id$="chkMGCompany"]').length) {
					$('input[id$="chkMGCompany"]').parent().addClass('clearfix');
				}
				
				$('table[id$="tblAmount"] [id*="trOther"] .wsNowrap table tr td[id*="Td1"]').addClass('otherAmountTd');
				
				$('.otherAmountTd').prev('td').addClass('hide');
				
				$('.otherAmountTd').click(function(){
				  $('table[id$="tblAmount"] [id*="trOther"] [id*="rdoOther"]').trigger('click');
				  $('table[id$="tblAmount"] [id*="trOther"] [id*="txtAmount"]').focus();
				  $(this).addClass('boxChecked');
				});
				
				$('.radioLabel').click(function(){
					if($('table[id$="tblAmount"] [id*="trOther"] [id*="rdoOther"]').not(':checked')) {
						$('.otherAmountTd').removeClass('boxChecked');
					}
				});
				
				$('.DonationFormTable').removeClass('hide');
			}
		},
		
		// User Email Preferences classes and responsive behavior
		responsiveUserEmailPreferences: function () {
			if ($('.SubscriptionFormTable').length) {
				// nice treatment for checkboxes on mobile devices
				BBI.Methods.responsiveCheckboxesAddClass();
				BBI.Methods.responsiveCheckboxesChangeEvent();
			}
		},
		
		// Event Registration Form (2.0) classes and responsive behavior
		responsiveEventRegistrationNew: function () {
			if ($('.BBEventRegSequenceMap').length) {
				// add "clearfix" class where needed
				$('div.Ev2_PriceTypesHeader, div.Ev2_PriceTypesRow, div.Ev2_SummaryTotal, div.Ev2_RegistrantFieldCell').addClass('clearfix');
				// handle showing/hiding of the price validation text
				$('input[id*="txtQty"]').blur(function () {
					var $targetSpan = $(this).parent().nextAll('.Ev2_PriceTypeValidatorColumn').children('span.Ev2_Step1QtyValidation');
					setTimeout(function () {
						if ($targetSpan.css('visibility') == 'visible') {
							$targetSpan.parent().addClass('validationActive');
						} else {
							$targetSpan.parent().removeClass('validationActive');
						}
					}, 500);
				});
			}
		},
		
		// Event Registration (Classic) classes and responsive behavior
		responsiveEventRegistrationClassic: function () {
			if ($('.EventTable .EventProgressCell').length) {
				// treatment of the step navigation
				$('.EventTable table[id$="tblProgress"] th').each(function (index) {
					var stepText = $(this).html();
					var stepTextSplit = stepText.split('>');
					$(this).html('<span class="stepIndex">' + (index + 1) + '</span><span class="stepText">' + stepTextSplit[1] + '</span>');
				});
				$('.EventTable table[id$="tblProgress"] th').last().addClass('last');
				// add class for attribute checklists
				$('div.LoginFormCheckListContainer').parent().prev('td').addClass('checklistLabelContainer');
				$('td.EventItemRegistrantControlCellName').parent().parent().parent().addClass('eventAttributeContainer');
				// add class for previous/next button container table
				$('.EventTable input[id*="StepNavigationTemplateContainerID"]').eq(0).closest('table').addClass('prevNextContainerTable');
				$('.EventTable input[id*="StartNavigationTemplateContainerID"]').eq(0).parent().addClass('nextContainerTR');
				// nice treatment for checkboxes on mobile devices
				BBI.Methods.responsiveCheckboxesAddClass();
				BBI.Methods.responsiveCheckboxesChangeEvent();
			}
		},
		
		// Payment Part responsive behavior
		responsivePaymentPart: function () {
			if ($('.PaymentPart_FormContainer').length) {
				// nice treatment for checkboxes on mobile devices
				BBI.Methods.responsiveCheckboxesAddClass();
				BBI.Methods.responsiveCheckboxesChangeEvent();
			}
		},
		
		// User Login Part classes and responsive behavior
		responsiveUserLogin: function () {
			if ($('.LoginFormTable').length) {
				// add classes to style <td>'s with no classes
				$('.LoginFormTable .BBFieldControlCell').each(function () {
					$(this).prev('td').addClass('BBFieldCaption');
				});
				// add a class 'remember login' container
				$('label[for$="cbRememberLogin"]').parent().addClass('rememberLoginContainer');
				// add class to table that holds validation container
				$('.LoginFormValidatorSummary').closest('table').addClass('userLoginValidationContainer');
			}
			if ($('tr[id$="trSignInBody"]').length) {
				// add class to outer part container
				$('tr[id$="trSignInBody"]').closest('table').addClass('userLoginPart');
				// nice treatment for checkboxes on mobile devices
				BBI.Methods.responsiveCheckboxesAddClass();
				BBI.Methods.responsiveCheckboxesChangeEvent();
			}
		},
		
		// Survey Part classes and responsive behavior
		responsiveSurvey: function () {
			if ($('.SurveyQuestionTable').length > 0) {
				$('.SurveyQuestionTable td span.BBFormRequiredFieldMarker').parent().next('td').children('span').eq(0).addClass('required');
			}
		},
		
		// force Event Calendar to show in list view when in mobile mode
		responsiveEventCalendar: function () {
			if (($('.EventCalendarPartContainer').length) && ($('.CalendarViewCalendarContainer').length)) {
				$('input[id$="ImageButtonViewList"]').click();
			} else if ($('.EventCalendarPartContainer').length) {
				$('a.ListViewEventTitle').each(function () {
					var href = $(this).attr('href');
					$(this).after('<a class="BBFormSubmitButton" href="' + href + '">View Details</a>');
				});
			}
		},
		
		// screen width parameters
		params: {
			oldWidth: '1000',
			breakBelow1: '769',
			breakBelow2: '481', // set to zero if you only need one break point for code execution
			scrollBarWidth: '0', // necessary for some browsers' treatment of scroll bars in media queries
			scrolledTo: '0', // will hold the current document scroll position
			previousScrolledTo: '0', // will hold the previous document scroll position
		},
		
		// stuff to do when the window resizes
		windowResizeFunctions: function () {
			BBI.Methods.checkWindowSize();
		},
		
		// stuff to do when scrolling has been detected
		scrollFunctions: function () {
			BBI.Methods.params.previousScrolledTo = BBI.Methods.params.scrolledTo;
			BBI.Methods.params.scrolledTo = $(window).scrollTop();
		},
		
		// add code that should only fire one time once the viewport reaches "desktop" width
		goDesktopOnce: function () {
			$('body').addClass('desktopMode').removeClass('mobileMode tabletMode phoneMode');
		},
		
		// add code that should fire anytime the viewport size changes and the new width is in the "desktop" range
		goDesktopAlways: function () {},
		
		// add code that should only fire one time once the viewport reaches "tablet" width
		goTabletOnce: function () {
			$('body').addClass('mobileMode tabletMode').removeClass('desktopMode phoneMode');
		},
		
		// add code that should fire anytime the viewport size changes and the new width is in the "tablet" range
		goTabletAlways: function () {},
		
		// add code that should only fire one time once the viewport reaches "phone" width
		goPhoneOnce: function () {
			$('body').addClass('mobileMode phoneMode').removeClass('desktopMode tabletMode');
			// show Event Calendar in mobile mode
			BBI.Methods.responsiveEventCalendar();
		},
		
		// add code that should fire anytime the viewport size changes and the new width is in the "phone" range
		goPhoneAlways: function () {}
		
	}
	
};

// run global scripts
BBI.Methods.pageInit();


/* PLUGINS
==================================================================== */

// make jQuery ":contains" case-insensitive
// http://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
jQuery.expr[':'].Contains = function (a, i, m) { return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; };

// make it safe to use console.log always
window.log=function(){if(log.history=log.history||[],log.history.push(arguments),this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);"object"==typeof console.log?log.apply.call(console.log,console,a):console.log.apply(console,a)}},function(a){function b(){}for(var d,c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(",");d=c.pop();)a[d]=a[d]||b}(function(){try{return console.log(),window.console}catch(a){return window.console={}}}());
