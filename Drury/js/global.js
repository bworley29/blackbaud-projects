/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: DRURY
 Author(s): Ben Worley
 Product(s): BBNC
 Created: December 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	DRURY: {

		bbnc: {

			pageLoad: function(){
				BBI.DRURY.bbnc.browserDetection();
				BBI.DRURY.bbnc.desktop();
				BBI.DRURY.bbnc.megaMenu();
				BBI.DRURY.bbnc.mobile.mobileToggles();
				BBI.DRURY.bbnc.mobile.accordionSidebarNav();
			}, 	
			
			paneRefresh: function(){
				//BBI.DRURY.bbnc.parts.mainMenuPart();
				BBI.DRURY.bbnc.parts.utilityMenuPart();
				BBI.DRURY.bbnc.parts.userLogin();
				BBI.DRURY.bbnc.parts.breadcrumbs();
				BBI.DRURY.bbnc.parts.donateRecurringEndDate();
				BBI.DRURY.bbnc.mobile.eventRegCart();
				BBI.DRURY.bbnc.addClassToEmptyTableCells();
				BBI.DRURY.bbnc.addClassToRequiredInputs();
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

			    								
			},
			
			mobile: {
					
				mobileToggles: function () {
					var slideoutMenu = $('.headerMenus');
					var slideoutPlusMenu = $('.mobilePlusNav');
					//
					$('.mobileMainNav').on('click', function(){
						
						slideoutMenu.toggleClass("open");
						if (slideoutMenu.hasClass("open")) {
							slideoutMenu.animate({
								left: "+=78%"
							}, 400);
						} else {
							slideoutMenu.animate({
								left: "-=78%"
							}, 400);
						}
						if (slideoutPlusMenu.hasClass("openPlus")) {
							slideoutPlusMenu.removeClass('openPlus').hide().animate({
								right: "-=65%"
							}, 400);
						}
					});
					
					if($('.headerMenus').hasClass('open')) {
						
					}
					
					if(!$('.AdminPageBody').length && $('ul.mobilePlusNav').length) {
						$('footer address ul.mobilePlusNav').insertAfter('.headerMenus');
					}
					
					$('.plusMenuToggle').on('click', function(event) {
						event.preventDefault();
						
						slideoutPlusMenu.toggleClass("openPlus");
						if (slideoutPlusMenu.hasClass("openPlus")) {
							slideoutPlusMenu.show().animate({
								right: "+=65%"
							}, 400);
						} else {
							slideoutPlusMenu.hide().animate({
								right: "-=65%"
							}, 400);
						}
						if (slideoutMenu.hasClass("open")) {
							slideoutMenu.removeClass('open').animate({
								left: "-=78%"
							}, 400);
						}
					});
					
					//
					// Toggle First Level Nav	
					

				},
				
				accordionSidebarNav: function () {
					
					
					$('aside nav ul > li.parent > a').click(function () {
						
						$('aside nav ul > li.parent > a.active').removeClass('active');
					    $('aside nav ul > li.parent a + ul.active').slideUp('fast').removeClass('active');
					    
					    if($(this).next('ul').is(':visible')) {
						    
						    $(this).prev().removeClass('active');
							$(this).next('ul').slideUp('fast').removeClass('active');
							
					    } else {
						    
						    $(this).addClass('active');
						    $(this).next('ul').slideDown('slow').addClass('active');
						    
					    }
													  
					});
					
					$('footer nav ul.footer > li.title > a').click(function () {
						
						$('footer nav ul.footer > li.title > a.active').removeClass('active');
					    $('footer nav ul.footer > li.title > a + ul.active').slideUp('fast').removeClass('active');
					    
					    if($(this).next('ul').is(':visible')) {
						    
						    $(this).prev().removeClass('active');
							$(this).next('ul').slideUp('fast').removeClass('active');
							
					    } else {
						    
						    $(this).addClass('active');
						    $(this).next('ul').slideDown('slow').addClass('active');
						    
					    }
													  
					});
					
				}, // END accordionSidebarNav
				
				eventRegCart: function () {
					//
					var eventRegCartValidatorCell;
				
					//
					eventRegCartValidatorCell = '.Ev2_PriceTypesCell.Ev2_PriceTypeValidatorColumn';
				
					$(eventRegCartValidatorCell).addClass('eventRegCartValidatorCell');
					
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
			
			megaMenu: function() {
			
				var topLevelListItemLink, megaMenuItemDivToMove;
                
		        topLevelListItemLink = 'nav > ul > li > a';
		        megaMenuItemDivToMove = '.wrapMegaMenuItems .megaMenu';
		        
		        if($(topLevelListItemLink).length){
			        
			        $(topLevelListItemLink).each(function() {
				        
		            	$(megaMenuItemDivToMove).eq($(this).index()).insertAfter(this);
		            	
					});	
		        }
		        
		        $('.headerMenus nav > ul > li > a').click( function() {
			        $('.headerMenus nav > ul > li > a.active').removeClass('active');
					$('.headerMenus nav > ul > li > a + .openNav').slideUp('slow').removeClass('openNav');
					if ($(this).next('.megaMenu').is(':visible')) {
						$(this).removeClass('active');
						$(this).next('.megaMenu').slideUp('slow').removeClass('openNav');
					} else {
						$(this).addClass('active');
						$(this).next('.megaMenu').slideDown('slow').addClass('openNav');
					}
				});

		        
			},
						
			parts : {				
				
			
				
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
				
					//var breadcrumbHomeLink;
					
					// Create Home link for Breadcrumbs
					//breadcrumbHomeLink = $('<li class="home"><a href="http://www.drury.edu/" target="_new">Home</a></li>');
					
					// Create Home Breadcrumb link if it doesn't already exist
					//if($('.wrapBreadcrumbs nav ul li.home').length === 0) {
					//	$(breadcrumbHomeLink).insertBefore('nav.wrapBreadcrumbs ul.mainNav > .selected:visible');
					//}
					
					// Remove href from selected Breadcrumb anchor
					$('.breadcrumbs nav ul li.selected > a.selected').removeAttr('href');
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
						//BBI.DRURY.bbnc.responsiveCheckboxesAddClass();
						//BBI.DRURY.bbnc.responsiveCheckboxesChangeEvent();
	
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
				
				// Is this a version of Opera?
				if ($.browser.opera) {
					userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
					userAgent = userAgent.substring(0,userAgent.indexOf('.'));
					version = userAgent;
					browser = "Opera";
					$('body').addClass(browser);
				}
				
			}

		}

	} // end DRURY

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
	BBI.DRURY.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.DRURY.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.DRURY.bbnc.paneRefresh();
     });
}


