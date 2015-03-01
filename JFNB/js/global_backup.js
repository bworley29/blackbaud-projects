/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: JFNB
 Author(s): Ben Worley
 Product(s): BBNC
 Created: May 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	JFNB: {

		bbnc: {

			pageLoad: function(){
			
				BBI.JFNB.bbnc.desktop();
				BBI.JFNB.bbnc.viewMoreToggle();
				BBI.JFNB.bbnc.eventCalendarContent();
				BBI.JFNB.bbnc.mobile.mobileToggles();
				BBI.JFNB.bbnc.mobile.utilityMenu();
				BBI.JFNB.bbnc.mobile.communityMobileCallToActions();
				BBI.JFNB.bbnc.parts.asideContent();
				BBI.JFNB.bbnc.parts.bottomPromoContentBoxes();
				//BBI.JFNB.bbnc.parts.asideMenu();
				
			}, 	
			
			paneRefresh: function(){
				BBI.JFNB.bbnc.parts.mainMenuPart();
				BBI.JFNB.bbnc.parts.utilityMenuPart();
				BBI.JFNB.bbnc.parts.userLogin();
				BBI.JFNB.bbnc.parts.donationForm.donateGiveAmtReorder();
				BBI.JFNB.bbnc.parts.donationForm.reformatGiveDollarAmts();
				BBI.JFNB.bbnc.parts.donationForm.reorderBillingInfo();
				BBI.JFNB.bbnc.parts.reorderEventRegPaymentInfo();
				BBI.JFNB.bbnc.parts.eventRegPaymentInfo();
				BBI.JFNB.bbnc.parts.eventRegEventPriceFormatting();
				BBI.JFNB.bbnc.parts.donationForm.hideTRs();
				BBI.JFNB.bbnc.parts.donationForm.donatePaymentInfo();
				BBI.JFNB.bbnc.parts.donationForm.confirmationScreen();
				BBI.JFNB.bbnc.parts.breadcrumbs();
				BBI.JFNB.bbnc.parts.accordionContent();
				BBI.JFNB.bbnc.mobile.eventRegCart();
				BBI.JFNB.bbnc.parts.eventRegGreenCheckmarks();
				BBI.JFNB.bbnc.parts.eventRegAddThisBtns();
				BBI.JFNB.bbnc.addClassToEmptyTableCells();
				BBI.JFNB.bbnc.addClassToRequiredInputs();
			}, 	
			
			// Desktop
			desktop: function(){
				
				// Define all vars here
				var footerEmailSignUpInput;
				
				// Set all vars
				footerEmailSignUpInput = '.BBSequenceMapContentContainer input.x-form-text.x-form-field';
				
				// Add Class to Login Form Most outer parent Table
				$('table.LoginFormTable').parents('table').last().addClass('wrapLoginFormTable');
				
				// Add Class to Job Board Post Salary Req parent Table
				$('input[id*="txtSalaryMin"]').parents('table').first().addClass('jobPostSalaryTbl');
				
				// Donation Form Shopping Cart 
				$('tbody[id*="tbdCart"] table[id*="dgCart"].DonationGrid').removeAttr('border');
				
				//
				$('label.QuickSearchFieldCaption').parent().hide();
				
				//
				$('.BBSequenceMapNavigationButton').insertAfter(footerEmailSignUpInput);
				
				$(footerEmailSignUpInput).addClass('footerEmailSignUp').attr('placeholder','Email address');
				
				$('.bbformbuilder-form-part > div').addClass('wrapFootEmailSignUp');
				
			    								
			},
			
			viewMoreToggle: function () {
					// Define all vars here
					var viewMoreToggle, viewMoreToggleOrgTxt;
					
					// Set all vars here
					 viewMoreToggle = $('.viewMoreToggleLink');
					 //
					 viewMoreToggleOrgTxt = $(viewMoreToggle).html();
					//
					$(viewMoreToggle).on('click',function() {
						
						$(this).next('.viewMoreContent').slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						$(this).prev().toggleClass('active');
						
						if($(this).hasClass('active')){
							$(this).html('Close');
						} else {
							$(this).html(viewMoreToggleOrgTxt);
						}
						
					});

			},
			
			eventCalendarContent: function () {
				//
				var homeEvenCalendar, dynamicEventCal;
				//
				homeEvenCalendar = '.content div#homeFacebook';
				//
				dynamicEventCal = '.home .BBDesignationSearchResultContainer';
				//
				dynamicEventCal = $(dynamicEventCal).clone();
				//
				$(dynamicEventCal).prependTo(homeEvenCalendar);
				
				//
				/*
$('.upcomingEventWrapper .upcomingEventDate .upcomingEventMonth').each(function(){
					$(this).insertAfter($(this).next());
				});
*/

			},
			
			mobile: {
					
				mobileToggles: function () {
					// Define all vars here
					var mobileToggleMenuIcon, socialMediaIcons, desktopMainNav;
					
					// Set all vars here
					desktopMainNav = 'nav.wrapNav ul.mainNav';
					mobileToggleMenuIcon = 'a.toggleMainNav';
					socialMediaIcons = $('.socialMedia ul.socialIcons li').clone().addClass('showOnMobile');
					
					$(socialMediaIcons).appendTo(desktopMainNav);		
					
					//
					$(mobileToggleMenuIcon).on('click',function() {
						
						$(desktopMainNav).slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
					});

				},
				
				utilityMenu: function() {
					//
					var desktopUtilityLinks;
					
					desktopUtilityLinks	= $('.utility section ul').clone().addClass('showOnMobile');
					
					$(desktopUtilityLinks).prependTo('.utility > section');
				},
				
				eventRegCart: function () {
					//
					var eventRegCartValidatorCell;
				
					//
					eventRegCartValidatorCell = '.Ev2_PriceTypesCell.Ev2_PriceTypeValidatorColumn';
				
					$(eventRegCartValidatorCell).addClass('eventRegCartValidatorCell');
					
				},
				
				communityMobileCallToActions: function () {
				
					var commCallToActFirst, commCallToActImgHidden, commCallToActTxtHidden;
	
					commCallToActFirst = '.wrapCommunityContent .left div:eq(0), .wrapCommunityContent .left div:eq(1)';
					
					// Looking for hidden text block.  This text is hidden via CSS
					commCallToActTxtHidden = $('.wrapCommunityContent .wrapCommunityCTA .commTxt p:hidden');
					
					// Looking for hidden image.  This image is hidden via CSS
					commCallToActImgHidden = $('.wrapCommunityContent .wrapCommunityCTA .commImg:hidden');
					
					// Finds first hidden text block based on first visible
					//firstHiddenTxt = $('.wrapCommunityContent .wrapCommunityCTA .commTxt.hidden').first();
					
					$(commCallToActFirst).removeClass('hidden').addClass('visible');
					
					$('.wrapCommunityContent .wrapCommunityCTA div').each(function () {
						
						if($(commCallToActTxtHidden)) {
							$(commCallToActTxtHidden).parent().addClass('hidden');
						} 
						
						if($(commCallToActImgHidden)) {
							$(commCallToActImgHidden).addClass('hidden');		
						}
					
					});
					
					// Toggle Hidden Comm CTA
					$('.wrapCommunityContent .wrapCommunityCTA .commTxt.hidden h3').on('click',function() {
						$(this).parent().toggleClass('hidden visible');
						// Hidden Sibling Image	
						$(this).parent().prev().slideToggle('slow').toggleClass('hidden visible');
						// Hidden Paragraph text and .learnMore link
						$(this).nextAll().slideToggle('slow').toggleClass('visible');
						//
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
						if(  (($(this).parent().next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).parent().next('td').css('visibility') != 'hidden')) ||
						     (($(this).closest('.BBFieldControlCell').next('td').hasClass('BBFormRequiredFieldMarker')) && ($(this).closest('.BBFieldControlCell').next('td').css('visibility') !== 'hidden')) ||
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
				
				if($('.EventTable td').length) {
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


				if($('.EventCalendarPartContainer .BBFormTable').length) {
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
				
				var emptyEventItemRegHeader = $('[id*="dgEventItems"] .EventItemRegistrationsHeader:first-child');

				if($(emptyEventItemRegHeader).val() === '') {
					$.trim($(emptyEventItemRegHeader).addClass('emptyTD'));
				}
				
				if($('.EventTable').length){
					
					$('.EventTable').prev('.helpletcontent').addClass('hide');
					
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
				
				accordionContent: function () {
					
					var accordionTitleToggle;
					
					//
					accordionTitleToggle = '.wrapAccordionContent h4';
					
					//
					$(accordionTitleToggle).on('click',function() {
						
						$(this).next().slideToggle('slow').toggleClass('active');
						$(this).toggleClass('active');
						
					});
					
					
						
				}, // END accordionContent
				
				utilityMenuPart: function () {
					// Define Variables
					var utilitySearchClone, utilitySearchIcon, audienceUtilityToggle, utilityMobileGiveBtn;
					
					// Set Variables
					utilitySearchClone = $('#utility table.QuickSearchFormTable').clone();
					utilitySearchIcon = 'ul.utilityNav li.search a';
					audienceUtilityToggle = '<div class="showOnMobile audienceUtilityToggle"><a class="showOnMobile audienceUtilityToggle">Get Invloved</a></div>';
					utilityMobileGiveBtn = $('nav.wrapNav ul.mainNav li.donate a').clone();
					
					$('<li class="search"><a class="fa fa-search" href="#"></a></li>').insertAfter('.utilityNav li:last-child');
					
					//
					$(utilitySearchClone).insertAfter(utilitySearchIcon);
					
					// Insert Audience Mobile Toggle Link
					$(audienceUtilityToggle).insertBefore('.utility .audienceNav');
					
					$('div.audienceUtilityToggle').on('click',function() {
						
						$(this).next('.audienceNav').slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
					});
					
					// Mobile Give Btn
					$(utilityMobileGiveBtn).addClass('showOnMobile utilityMobileGiveBtn').insertBefore('div.audienceUtilityToggle');
					
					
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
					
					// Utility Mobile - Make a Gift 
						
				}, // END utilityMenuPart
				
				
				/*
asideMenu: function () {
					if($('aside ul.tagcloud').length) {
						var asideNavLeft = $('aside ul.tagcloud li').splice(0,8);
						var asideNavRight = $('aside ul.tagcloud li').splice(8,16);
						$(asideNavLeft).wrapAll('<div class="asideNavLeft" \/>');
						$(asideNavRight).wrapAll('<div class="asideNavRight" \/>');
					}
					
				},
*/

				 // END asideMenu
				
				breadcrumbs: function () {
				
					var mainNavExistingHomeLink;
					
					// Create Home link for Breadcrumbs
					mainNavExistingHomeLink = $('.breadcrumbs ul.mainNav li.home a').clone();
					
					if($('.breadcrumbs a.breadcrumbHome').length === 0) {
						$(mainNavExistingHomeLink).prependTo('nav.breadcrumbs').addClass('breadcrumbHome');
					}
					
					// Create Home Breadcrumb link if it doesn't already exist
					
					/*
if($('nav.breadcrumbs ul.audienceNav li.home').length === 0) {
						$(mainNavExistingHomeLink).prependTo('nav.breadcrumbs ul.audienceNav');
					}
					
					if ($('nav.breadcrumbs li.selected > a.selected').parents('ul').hasClass('mainNav')) {
						$('ul.mainNav .home').addClass('active');
					} 
					
					if ($('nav.breadcrumbs li.selected > a.selected').parents('ul').hasClass('audienceNav')) {
						$('ul.audienceNav .home').addClass('active');
					}
*/

					
					// Remove href from selected Breadcrumb anchor
					$('nav.breadcrumbs ul li.selected > a.selected').removeAttr('href');
				}, // END breadcrumbs
				
				asideContent: function () {
					
					var sidebarMenuContent, sidebarActiveAnchor;
					
					sidebarMenuContent = $('.wrapContent + aside').clone();
					sidebarActiveAnchor = 'aside ul.mainNav a.selected';
					
					$(sidebarMenuContent).insertBefore('.wrapFooter');
					$(sidebarMenuContent).wrap('<section class="container clone" \/>');
					
					//
					$('aside ul.mainNav').each(function(){
							$(sidebarActiveAnchor).parent().siblings().addClass('sibling');
							
					});
					
				}, // END Sidebar Menu
				
				bottomPromoContentBoxes: function() {
					var promoBoxLeft = '.fullWidthContent .contentFullWidthLeft';
					var promoBoxRight = '.fullWidthContent .contentFullWidthRight';
					
					if($(promoBoxLeft).length && $(promoBoxRight).length){
						$('.fullWidthContent .contentFullWidthLeft, .fullWidthContent .contentFullWidthRight').wrapAll('<div class="wrapPromoBoxes"></div>');
					}
				},
					
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
						//BBI.JFNB.bbnc.responsiveCheckboxesAddClass();
						//BBI.JFNB.bbnc.responsiveCheckboxesChangeEvent();
	
					}
	
				}, // END userLogin
				
				donationForm : {
					donateGiveAmtReorder: function () {
						if($('.fullWidthContent [id*="pnlDonationForm"] table.DonationFormTable').length) {
						
						
							// Replace Give Amounts Inner HTML
							$('table[id*="tblAmount"]').each(function (){
							         $(this).replaceWith( $(this).html()
							                .replace(/<tbody/gi, "<div class='wrapAmts'")
							                .replace(/<tr/gi, "<div class='amounts'")
							                .replace(/<\/tr>/gi, "</div>")
							                .replace(/<td/gi, "<span class='amtDetails' ")
							                .replace(/<\/td>/gi, "</span>")
							                .replace(/<\/tbody/gi, "<\/div")
							        );
							});
													
							// Reorder Give Amounts - Dollar Amount, Radio Button and Text
							$('.wrapAmts .amounts').slice(0,5).each(function() {
	
								var firstAmtTxt = $(this).children('.amtDetails:first-child');
								var firstAmtNum = $(this).children('.amtDetails:last-child');
								var amtRdo = $(firstAmtTxt).find('.vaTop input[name*="givingLevels"]');
								var amtRdoLbl = $(firstAmtTxt).find('.vaTop input[name*="givingLevels"]').next('label');
								//
								$(amtRdo).insertAfter(amtRdoLbl);
							 	$(firstAmtTxt).insertAfter(firstAmtNum);
							
							});
							
							// Reorder Payment Info above Billing Info
							var donateBillInfo = $('[id*="lblBilling"]').parents('tbody');
							var donatePayInfo = 'tbody[id*="tbdyPaymentInfo"]';
							$(donatePayInfo).insertBefore(donateBillInfo);
							
							//
							var wrapOthRdoTxt = $('.wrapAmts [id*="trOther"]').addClass('wrapOtherGiveAmt');
							
							//var wrapOthRdoTxt = $('.wrapAmts [id*="trOther"]').addClass('wrapOtherGiveAmt');
							var othRdoTxt = $('.wrapOtherGiveAmt > span:first-child');
							var othRdo = $(othRdoTxt).next();
							$(othRdoTxt).insertAfter(othRdo);
							
							var otherAmtInput = '[id*="trOther"] input[id*="txtAmount"]';
							
							//
							$('label[id*="lblTitle1"]').parent().parent().hide();
							
							//
							$('[id*="blPersonal"]').parents('tr').hide();
							
							//
							$('.DonationFieldControlCell > .wrapAmts').insertBefore('.fullWidthContent table.DonationFormTable');
							
							//
							$('[id*="trOther"] [id*="lblSymbol"]').parent().hide();

							$(otherAmtInput).parent().insertAfter('[id*="tdOther"].amtDetails');
							
							//
							$(otherAmtInput).attr('placeholder', 'Enter amount...');
							
							//
							$('<div class="dollarIcon">$</div>').insertBefore(otherAmtInput)
							
							
						}
					},
					
					//
					reformatGiveDollarAmts: function () {
						$('.wrapAmts > .amounts > .amtDetails:first-child > span:first-child').each(function(){
						  $(this).addClass('dollarAmt');
						});
						
						$('.amtDetails .dollarAmt').each(function(){
							
							var currentGiveAmt = $(this).html();
							currentGiveAmt = currentGiveAmt.replace(".00", "");
							$(this).html(currentGiveAmt);
							
						});
					},
					
					//
					hideTRs: function () {
					
						// Hide Address and Email Type
						$('[id*="pnlDonationForm"] .DonationCaptureFieldCaption [id*="AddressTypeLabel"]').parents('tr').hide();
						// Hide Country Select list
						$('[id*="pnlDonationForm"] .DonationCaptureFieldCaption [id*="lblCountry"]').parents('tr').hide();
						// Hide Phone
						//$('[id*="pnlDonationForm"] .DonationCaptureFieldCaption [id*="DonationCapture1_lblPhone"]').parents('tr').hide();
					},
					
					//
					reorderBillingInfo: function () {
					
						var billingLastNameLbl, billingLastNameInput, billingFirstNameInput, billingZipInput, billingZipLbl, billingStateSelect, billingAddress, billingEmail;
	
						billingLastNameLbl = '[id*="pnlDonationForm"] #td_LastName label[id*="lblLastName"]';
						billingLastNameInput = '[id*="pnlDonationForm"] .DonationCaptureFieldControlCell input[id*="txtLastName"]';
						billingFirstNameInput = '[id*="pnlDonationForm"] .DonationCaptureFieldControlCell input[id*="DonationCapture1_txtFirstName"]';
						billingZipInput = '[id*="pnlDonationForm"] .DonationCaptureFieldControlCell input[id*="ZipUS"]';
						billingZipLbl = '[id*="pnlDonationForm"] .DonationCaptureFieldCaption label[id*="lblZipUS"]';
						billingStateSelect = '[id*="pnlDonationForm"] .DonationCaptureFieldControlCell select[id*="StateUS"]';
						billingAddress = $('textarea[id*="AddressLine"]').parents('tr');
						billingEmail = $('input[id*="txtEmailAddress"]').parents('tr');
						//
						$(billingLastNameInput).addClass('billingLastNameInput').insertAfter(billingFirstNameInput);
						//
						$(billingLastNameLbl).addClass('billingLastNameLbl').insertAfter(billingFirstNameInput);
						//
						$('.billingLastNameLbl, .billingLastNameInput').wrapAll('<span class="wrapBillingLastName" \/>');
						//
						$(billingZipInput).addClass('billingZipInput').insertAfter(billingStateSelect);
						//
						$(billingZipLbl).addClass('billingZipLbl').insertAfter(billingStateSelect);
						//
						$('.billingZipLbl, .billingZipInput').wrapAll('<span class="wrapBillingZip" \/>');
						//
						$(billingEmail).insertBefore(billingAddress);
						
						//
						
					},
					
					//
					donatePaymentInfo: function () {
						if($('table.DonationFormTable').length){
							//
							var cardTypeTR = $('.DonationCaptureFieldCaption label[id*="DonationCapture1_lblCCType"]').parents('tr');
							var cardNameTR = $('.DonationCaptureFieldCaption label[id*="DonationCapture1_lblCardHoldersName"]').parents('tr');
							//
							var cardExpMnth = 'select[id*="DonationCapture1_cboMonth"] option:eq(0)';
							var cardExpYr = 'select[id*="DonationCapture1_cboYear"] option:eq(0)';
							//
							$(cardTypeTR).insertBefore(cardNameTR);
							//
							$(cardExpMnth).text('month');
							$(cardExpYr).text('year');
							
							//
							$('.fullWidthContent table.BBFormTable.DonationFormTable').wrap('<div class="wrapPayBillInfo" \/>');
							
							//
							$('select[id*="dd_StateUS"] option[value="MD"]').attr('selected','true');
							
							// Show hidden Donation Form after code fires
							$('.wrapPayBillInfo').show();
						}
					},
					
					confirmationScreen: function() {
						
						if($('.wrapConfirmationScreen').length) {
							
							$('.hideOnConfirmation').hide();
							
						}
						else {
							
							$('.hideOnConfirmation').show();
							
						}
							
					},
					
				},
				
				reorderEventRegPaymentInfo: function() {
					if($('.EventTable').length){
						var billingLastNameLbl, billingLastNameInput, billingFirstNameInput, billingZipInput, billingZipLbl, billingStateSelect, billingAddress, billingEmail;
	
						billingLastNameLbl = '#td_LastName label[id*="lblLastName"]';
						billingLastNameInput = '.DonationCaptureFieldControlCell input[id*="txtLastName"]';
						billingFirstNameInput = '.DonationCaptureFieldControlCell input[id*="DonationCapture1_txtFirstName"]';
						billingZipInput = '.DonationCaptureFieldControlCell input[id*="ZipUS"]';
						billingZipLbl = '.DonationCaptureFieldCaption label[id*="lblZipUS"]';
						billingStateSelect = '.DonationCaptureFieldControlCell select[id*="StateUS"]';
						billingAddress = $('textarea[id*="AddressLine"]').parents('tr');
						billingEmail = $('input[id*="txtEmailAddress"]').parents('tr');
						
						//
						$(billingLastNameInput).addClass('billingLastNameInput').insertAfter(billingFirstNameInput);
						//
						$(billingLastNameLbl).addClass('billingLastNameLbl').insertAfter(billingFirstNameInput);
						//
						$('.billingLastNameLbl, .billingLastNameInput').wrapAll('<span class="wrapBillingLastName" \/>');
						//
						$(billingZipInput).addClass('billingZipInput').insertAfter(billingStateSelect);
						//
						$(billingZipLbl).addClass('billingZipLbl').insertAfter(billingStateSelect);
						//
						$('.billingZipLbl, .billingZipInput').wrapAll('<span class="wrapBillingZip" \/>');
						//
						$(billingEmail).insertBefore(billingAddress);
						
					}
				},
				
				eventRegPaymentInfo: function () {
					if($('.EventTable').length){
						var cardTypeTR, cardNameTR, cardExpMnth, cardExpYr, billingBtnTD;
						//
						cardTypeTR = $('.DonationCaptureFieldCaption label[id*="DonationCapture1_lblCCType"]').parent().parent();
						cardNameTR = $('.DonationCaptureFieldCaption label[id*="DonationCapture1_lblCardHoldersName"]').parent().parent();
						//
						cardExpMnth = 'select[id*="DonationCapture1_cboMonth"] option:eq(0)';
						cardExpYr = 'select[id*="DonationCapture1_cboYear"] option:eq(0)';
						
						//
						$(cardTypeTR).insertBefore(cardNameTR);
						//
						$(cardExpMnth).text('month');
						$(cardExpYr).text('year');
						
						$('[id*="tbdyPaymentInfo"] [id*="DonationCapture1_trAmount"]').addClass('hide');
						$(billingBtnTD).addClass('buttonTD');
						
						//
						$('.fullWidthContent tbody.DonationCaptureFormTable').wrap('<div class="wrapPayBillInfo" \/>');
						
						//
						if($('.wrapPayBillInfo').length) {
							//
							billingBtnTD = $('.BBFormSubmitButton[value="Register"]').parent().parent().parent().parent().parent();
							
							$(billingBtnTD).addClass('buttonTD');
							
						}
						
						// Show hidden Donation Form after code fires
						$('.wrapPayBillInfo').show();
					}
				},
				
				eventRegEventPriceFormatting: function () {
					if($('.EventTable').length){
					
						
						/* Commented Out by BW 12/5/14
var eventRegTicketDollarAmountAfterText = '<span class="eventRegTicketText"> each for this';
						var eventRegTicketBeforeText = '<span class="eventRegTicketText">I am buying </span>';
						var eventRegTicketAfterText = '<span class="eventRegTicketText"> seat(s) at</span>';
*/						
					// Added 12/5/14 by BW
					var eventRegTicketDollarAmountAfterText = $('.fullWidthContent .endText').html();
					var eventRegTicketBeforeText = $('.fullWidthContent .beginText').html();
					var eventRegTicketAfterText = $('.fullWidthContent .middleText').html();
						
											
						$('.EventItemRegistrationControlCellDescription, .EventItemRegistrationControlCellNumParticipants, .EventItemRegistrationControlCellNumParticipants, .EventItemRegistrationControlCellPrice').hide();
												
						
						$('.EventItemRegistrationControlCellQuantity').each(function() {
						
							var eventRegTicketSelectList = $(this).html();
							var eventRegTicketDescription = $(this).next('.EventItemRegistrationControlCellDescription').text();
							var eventRegTicketPrice = $(this).next().next().next('.EventItemRegistrationControlCellPrice');//.html();
							var eventRegTicketDollarAmount = $(eventRegTicketPrice).find('span').text();
							
							//$(eventRegTicketDollarAmount).clone();
						
							/* Commented Out by BW 12/5/14
								$(this).html(eventRegTicketBeforeText + eventRegTicketSelectList + eventRegTicketAfterText + '<span class="eventRegTicketText dollarAmt">' + eventRegTicketDollarAmount + '</span>' + eventRegTicketDollarAmountAfterText + '<em>' + eventRegTicketDescription + '</em>' +  '.' + '</span>'); */
							
							// Added 12/5/14 by BW
							$(this).html('<span class="eventRegTicketText">' + eventRegTicketBeforeText + '</span>' + eventRegTicketSelectList + '<span class="eventRegTicketText">' + eventRegTicketAfterText + '</span>' + '<span class="eventRegTicketText dollarAmt">' + eventRegTicketDollarAmount + '</span>' + '<span class="eventRegTicketText">' + eventRegTicketDollarAmountAfterText + '<em>' + eventRegTicketDescription + '</em>' + '</span>');
							
							$('.EventItemRegistrationsTable').show();
							
						});

						
						if($('.dollarAmt') === 'No Charge') {
							$('.dollarAmt').text('$0');
						}
						
						
						$('.eventRegTicketText.dollarAmt').each(function(){
							
							var currentGiveAmt = $(this).text();
							currentGiveAmt = currentGiveAmt.replace('.00 ea.', '');
							$(this).text(currentGiveAmt);
														
						});

						
						$('table[id*="dgRegistrationsList"] .EventItemRegistrantControlCell select[id*="ddlRegistrantName"]').each(function(){
							
							$('table[id*="dgRegistrationsList"] .EventItemRegistrantControlCell select[id*="ddlRegistrantName"]').find('option:contains("New individual")').text('Guest');

						});
						
						$('[id*="dgRegistrationsList"] [id*="dgRegistrationsList"] select[id*="ddlAddress"]').each(function(){
						
							$(this).find('option:contains("New address")').text('Guest address');
							
						});
						
						$('tr[id*="trAdditionalDonation"] td.BBFieldCaption').css('line-height', '1.7');
						
						$('tr[id*="trAdditionalDonation"] td.BBFieldCaption span[id*="lblCurrency"]').css('padding-left','5px');
						
						$('tr[id*="trAdditionalDonation"] td.BBFieldCaption').contents().first().replaceWith('I would like to make a gift in the amount of : ');
						
						
						/*
if($('[id*="AddressCtl_ctl_stateUS"] [id*="AddressCtl_dd_StateUS"]').length) { 
						
							
							$('option:contains("MD")').attr('selected',true);
							
							
						}
*/
							
					}
					
					
					/*if($('.EventTable').length){
						if($('table[id*="tblProgress"] th.EventProgressCell:first-child')) {
	
							$('.EventTable input[value="Next"].BBFormSubmitButton').appendTo('.EventItemRegistrationControlCellQuantity');
							
								if($('.EventItemRegistrationControlCellQuantity input[value="Next"].BBFormSubmitButton')) {
									$('.EventTable .EventItemRegistrationControlCellQuantity input[value="Next"].BBFormSubmitButton').addClass('stepOneBtn');
								}
							$('.EventItemRegistrationsTable').show();
						} else {
							$('.EventTable input[value="Next"].BBFormSubmitButton').removeClass('stepOneBtn');
						}
					}*/
					
					/*
if($('.wrapPayBillInfo').length > 0) {
						$(billingBtnTD).addClass('buttonTD');
					}
*/

				},
				
				eventRegStepTwoBtns: function() {
					
					var prevBtnParent = $('[id*="StepNavigationTemplateContainerID_BBButton2"]').parent().parent().parent().parent().parent();
					
					$(prevBtnParent).insertAfter('[id*="dgRegistrationsList"] .EventItemRegistrantControlCell [id*="ddlRegistrantName"]').parent();	
				},
				
				eventRegGreenCheckmarks: function() {
				
					$('.EventAttendeesGrid .EventAttendeesCurrent').each(function() {
						var eventGreenCheckmark = 'img[id*="dgAttendeesSummary"]';
						
						var eventSelectedForSubm = $(eventGreenCheckmark).parent().parent().next().find('[id*="dgAttendeesSummary_dgEventTickets"] td.EventTicketsBodyCell:first-child');
						
						if($(eventGreenCheckmark).length > 0) {
							
							$(eventGreenCheckmark).prependTo(eventSelectedForSubm);
							
						}
						
					});	
					
				},
				
				eventRegAddThisBtns: function() {
					var eventAddThis = $('.addthis_responsive_sharing');
					if($('.confirmationTellFriend').length && $('.confirmationTellFriend .addthis_responsive_sharing').length <= 1) {
					  $(eventAddThis).appendTo('.confirmationTellFriend');
					}	
				},
			},
			
			
		}

	} // end JFNB

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
	BBI.JFNB.bbnc.pageLoad();


(function($){$.fn.addPlaceholder=function(options){if(!this.length){return this;}
var defaults={placeholderText:'Search',placeholderTextColor:'#999999'};var settings=$.extend({},defaults,options);var currentColor=this.css('color');this.data('placeholder',settings.placeholderText);if(this.val()===''){this.val(settings.placeholderText).css('color',settings.placeholderTextColor);}else if(this.val()===settings.placeholderText){this.css('color',settings.placeholderTextColor);}
this.click(function(){if($(this).val()===settings.placeholderText){$(this).val('').css('color',currentColor);}});this.focus(function(){if($(this).val()===settings.placeholderText){$(this).val('').css('color',currentColor);}});this.blur(function(){if($(this).val()===''){$(this).val(settings.placeholderText).css('color',settings.placeholderTextColor);}});};}(jQuery));

	$('.wrapAmts .amounts[id*="trOther"] .amtDetails:last-child input').addPlaceholder({
          placeholderText: 'Enter amount...', // defaults to 'Search' if not provided
          placeholderTextColor:'#666666' // defaults to #999999 if not provided
});
 
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.JFNB.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.JFNB.bbnc.paneRefresh();
     });
}

//



