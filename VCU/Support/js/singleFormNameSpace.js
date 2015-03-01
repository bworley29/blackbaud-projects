customSingleDonationForm: {
	
	// Step One - Giving Details
	stepOneGivingDetails: function () {
		
		// Set Vars
		var donationInfo, additionalInfo, designationSelectList;
		
		// Define Vars
		//
		// Donation Information/Amount
		donationInfo = $('[id*="thCaptionAmount"]').parents('tbody').addClass('donationInfo');
		
		// Additional Information
		additionalInfo = $('[id*="trDesignation"]').parents('tbody').addClass('additionalInfo');
		
		designationSelectList = $('select[id*="ddlDesignations"].DonationSelectList').parent().parent('tr[id*="trDesignation"]');

		
	},
	
	// Step Two - Donor Info
	stepTwoDonorInfo: function () {
		
		// Set Vars
		var billingInfo, billingTitleSelectList, billingCountrySelectList, billingStateSelectList,  tributeInfo, tributeNameInput, tributeTypeSelectList, tributeDescInput;
		
		// Define Vars
		//
		// Billing Information
		billingInfo = $('[id*="DonationCapture1_txtFirstName"]').parents('tbody').addClass('billingInfo');
		billingTitleSelectList = 'select[id*="DonationCapture1_cboTitle"].DonationCaptureSelectList';

		// Billing Country Select List
		billingCountrySelectList = '.billingInfo td[id*="Country"] select[id*="Country"]';
		
		// Billing State Select List
		billingStateSelectList = '.billingInfo td[id*="state"] select[id*="State"]';
		
		// Tribute Information
		tributeInfo = $('[id*="lblTributeHeading"]').parents('tbody').addClass('tributeInfo');
		
		// Tributre Name
		tributeNameInput = '.tributeInfo [id*="trTributeName"] input[id*="txtTribute"]';
		
		// Tribute Type Select List
		tributeTypeSelectList = '.tributeInfo [id*="trTributeDesc"] select[id*="ddlTribute"]';
		
		// Tribute Description Input
		tributeDescInput = '.tributeInfo [id*="trTributeDesc2"] input[id*="txtTributeDescription"]';
		
	},
	
	// Step One - Payment Info
	stepThreePaymentInfo: function () {
		
		// Set Vars
		var paymentInfo;
		
		// Define Vars
		//
		// Payment Information
		paymentInfo = $('[id*="DonationCapture1_lblCardHoldersName"]').parents('tbody').addClass('paymentInfo');


		
	},
	
},