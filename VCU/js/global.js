/**********************************************
 Blackbaud Design Custom JavaScript
***********************************************
 Client: VCU_Alumni
 Author(s): Ben Worley
 Product(s): bbis
 Created: Dec. 2014
 Updated:
***********************************************
 CHANGE LOG 
***********************************************

**********************************************/

BBI = {

	VCU_Alumni: {

		bbis: {

			pageLoad: function(){
			
				BBI.VCU_Alumni.bbis.desktop();
			}, 	
			
			paneRefresh: function(){
				BBI.VCU_Alumni.bbis.parts.userPhotoForm();
				BBI.VCU_Alumni.bbis.parts.userLogin();
				BBI.VCU_Alumni.bbis.addClassToEmptyTableCells();
				BBI.VCU_Alumni.bbis.addClassToRequiredInputs();
				BBI.VCU_Alumni.bbis.profileDisplayEmpty();
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
						$(this).attr('href','//bbis59760desval.blackbaudhosting.com/vcualumni/profile-update-forms/alumni---user-photo-form-page');
					});
					
					if($('[id*="imgPhoto2"]').attr('src') === '[src*="catId"]') {
						console.log('no image available');
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
						//BBI.VCU_Alumni.bbis.responsiveCheckboxesAddClass();
						//BBI.VCU_Alumni.bbis.responsiveCheckboxesChangeEvent();
	
					}
					
					if($('.signOn .LoginFormTable').length) {
						//
						$('a[id*="lbtnForgotPwdUserName"]').insertBefore('input[id*="btnLogin"].LoginFormSubmitButton');
						//
						$('input[id*="txtUsername"]').attr('placeholder','Username');
	
						$('input[id*="txtPassword"]').attr('placeholder','Password');
						
						$('input[id*="txtForgotPWDUserNameEmail"]').attr('placeholder','Email');
						
						

					}
					
					if (($('.userLoginPart').length)) {

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
	
				}, // END userLogin
			},
			
			profileDisplayEmpty: function() {
				$('.wrapProfileEmployment span').each(function(){
				  if($(this).is(':empty')) {
					  $(this).parent().hide();
					}
				});
				
				$('.wrapProfileEdu span').each(function(){
				  if($(this).is(':empty')) {
					  $(this).parent().hide();
					}
				});
				
				$('.wrapProfileAffiliationInfo span').each(function(){
				  if($(this).is(':empty')) {
					  $(this).parent().hide();
					}
				});
			},

		}

	} // end VCU_Alumni

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
	BBI.VCU_Alumni.bbis.pageLoad();
});

// Functions to run each time the pane is refreshed
try {
     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
           BBI.VCU_Alumni.bbis.paneRefresh();
     });
}
catch(err) {
     console.log('Sys is probably undefined');
     $(document).ready( function(){
           BBI.VCU_Alumni.bbis.paneRefresh();
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

