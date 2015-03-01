/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: JFED Broward County
 Author(s): Ben Worley
 Product(s): BBNC
 Created: October 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	JFEDBC: {

		bbnc: {

			pageLoad: function(){
			
				BBI.JFEDBC.bbnc.desktop();
				BBI.JFEDBC.bbnc.mobile.mobileToggles();
				BBI.JFEDBC.bbnc.tinyMceOptions();
			}, 	
			
			paneRefresh: function(){
				BBI.JFEDBC.bbnc.parts.mainMenuPart();
				BBI.JFEDBC.bbnc.parts.utilityMenuPart();
				BBI.JFEDBC.bbnc.parts.userLogin();
				BBI.JFEDBC.bbnc.parts.breadcrumbs();
				BBI.JFEDBC.bbnc.parts.accordionContent();
				BBI.JFEDBC.bbnc.parts.donateRecurringEndDate();
				BBI.JFEDBC.bbnc.parts.quickSearch();
				BBI.JFEDBC.bbnc.parts.commFoundParts();
				BBI.JFEDBC.bbnc.mobile.eventRegCart();
				BBI.JFEDBC.bbnc.addClassToEmptyTableCells();
				BBI.JFEDBC.bbnc.addClassToRequiredInputs();
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
				/*
$('.blueBg').each(function(){
					if($(this).find.closest('.container').is(':empty').length === 0) {
					  $(this).addClass('allChildrenEmpty');
					} else  {
						$(this).removeClass('allChildrenEmpty');
					}
				});
*/
					
				//$('.utility nav ul.taskNav li.mail a').attr('href','#connect');
			    								
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
					$('.toggleMainNav').on('click',function() {
						
						$(this).parent().next().slideToggle('fast').toggleClass('active');
						$(this).toggleClass('active');
						
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
			
			tinyMceOptions: function() {
				// Hides H1 option from Format Drop-down list
				if($('#divModalPage').length) {
					$('.mceListBoxMenu table td.mce_formatPreview.mce_h1').parent().hide();
					
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
				
				commFoundParts: function() {
					var commFoundTable = '.DAGRGrid';
					var commFoundTableAlt = '.FSGrid';
					
					if($(commFoundTable).length) {
						$(commFoundTable).each(function(){
							$(this).parents('table').addClass('tableWrapper');
						});						
					}
					
					if($(commFoundTableAlt).length) {
						$(commFoundTableAlt).each(function(){
							$(this).parents('table').addClass('tableWrapper');
						});						
					}
					
					if($('.tableWrapper').length){
						$('.tableWrapper').each(function(){
  
						  $(this).siblings('table').addClass('tableWrapper');
						  
						});
					}
					
					$('.DonorGrantListingHeading').each(function(){
						
						$(this).parents('table').addClass('tableWrapper');
					});
					
					if($('.tableWrapper td').length) {
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
					
					//$('<li class="search"><a class="fa fa-search" href="#"></a></li>').insertAfter('.utilityNav li:last-child');
					
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
					breadcrumbHomeLink = $('<li class="home"><a href="http://www.JFEDBCenver.edu/" target="_new">MSU Denver Alumni Association</a></li>');
					
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
						//BBI.JFEDBC.bbnc.responsiveCheckboxesAddClass();
						//BBI.JFEDBC.bbnc.responsiveCheckboxesChangeEvent();
	
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
				
				
			}

		}

	} // end JFEDBC

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
	BBI.JFEDBC.bbnc.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.JFEDBC.bbnc.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.JFEDBC.bbnc.paneRefresh();
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

