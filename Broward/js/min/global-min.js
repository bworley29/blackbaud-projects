BBI={JFEDBC:{bbnc:{pageLoad:function(){BBI.JFEDBC.bbnc.desktop(),BBI.JFEDBC.bbnc.mobile.mobileToggles(),BBI.JFEDBC.bbnc.tinyMceOptions()},paneRefresh:function(){BBI.JFEDBC.bbnc.parts.mainMenuPart(),BBI.JFEDBC.bbnc.parts.utilityMenuPart(),BBI.JFEDBC.bbnc.parts.userLogin(),BBI.JFEDBC.bbnc.parts.breadcrumbs(),BBI.JFEDBC.bbnc.parts.accordionContent(),BBI.JFEDBC.bbnc.parts.donateRecurringEndDate(),BBI.JFEDBC.bbnc.parts.quickSearch(),BBI.JFEDBC.bbnc.parts.commFoundParts(),BBI.JFEDBC.bbnc.mobile.eventRegCart(),BBI.JFEDBC.bbnc.addClassToEmptyTableCells(),BBI.JFEDBC.bbnc.addClassToRequiredInputs()},desktop:function(){$("table.LoginFormTable").parents("table").last().addClass("wrapLoginFormTable"),$('input[id*="txtSalaryMin"]').parents("table").first().addClass("jobPostSalaryTbl"),$('tbody[id*="tbdCart"] table[id*="dgCart"].DonationGrid').removeAttr("border"),$("label.QuickSearchFieldCaption").parent().hide(),$(".utility nav ul.taskNav li.mail a").attr("href","#connect")},mobile:{mobileToggles:function(){var t,e,a;a=$("ul.utilityNav").clone(),mobileUtilityToggleIcon="a.toggle.utility",e=$(".wrapMainNav ul.mainNav").clone(),$(a).insertAfter(mobileUtilityToggleIcon),$(".toggleMainNav").on("click",function(){$(this).parent().next().slideToggle("fast").toggleClass("active"),$(this).toggleClass("active")})},eventRegCart:function(){var t;t=".Ev2_PriceTypesCell.Ev2_PriceTypeValidatorColumn",$(t).addClass("eventRegCartValidatorCell")}},addClassToRequiredInputs:function(){$(".BBFormTable").length&&$("input, select, textarea").each(function(){($(this).parent().next("td").hasClass("BBFormRequiredFieldMarker")&&"hidden"!==$(this).parent().next("td").css("visibility")||$(this).closest(".BBFieldControlCell").next("td").hasClass("BBFormRequiredFieldMarker")&&"hidden"!=$(this).closest(".BBFieldControlCell").next("td").css("visibility")||$(this).closest(".BBFieldControlCell").next("td").children("span:first").hasClass("BBFormRequiredFieldMarker")||$(this).next("span").hasClass("BBFormRequiredFieldMarker"))&&($(this).addClass("required"),$(this).attr("id").indexOf("cboYear")>=0||($(this).attr("id").indexOf("cboMonth")>=0?$(this).closest("table").parent().prev('td[id$="ExpiryLbl"]').children("label").eq(0).addClass("required"):$(this).prev("label").length>0?$(this).prev("label").addClass("required"):$(this).parent().prev("td").children("label").eq(0).addClass("required")))})},addClassToEmptyTableCells:function(){$(".LoginFormTable td").length&&($("td").each(function(){$(this).children().length>0?0===$(this).children(":visible").length&&$(this).addClass("emptyTD"):""===$.trim($(this).html())&&$(this).addClass("emptyTD")}),$("td > span").each(function(){""===$.trim($(this).html())&&$(this).addClass("emptyTDSpan")})),$(".DonationFormTable td").length&&($("td").each(function(){$(this).children().length>0?0===$(this).children(":visible").length&&$(this).addClass("emptyTD"):""===$.trim($(this).html())&&$(this).addClass("emptyTD")}),$("td > span").each(function(){""===$.trim($(this).html())&&$(this).addClass("emptyTDSpan")}))},tinyMceOptions:function(){$("#divModalPage").length&&$(".mceListBoxMenu table td.mce_formatPreview.mce_h1").parent().hide()},parts:{mainMenuPart:function(){var t,e;t=".showOnMobile.mobileMainNav",e="nav ul.mainNav li.parent i.fa",0===$(".wrapMainNav ul.mainNav > li.parent i.fa").length&&$('<i class="fa" />').insertBefore(".wrapMainNav ul.mainNav > li.parent > ul"),$(t).on("click",function(){$(this).next().slideToggle("fast").toggleClass("active"),$(this).toggleClass("active")}),$(e).on("click",function(){$(this).next("ul").slideToggle("fast"),$(this).toggleClass("active"),$(this).prev().toggleClass("disable"),$(this).parent().toggleClass("active")})},quickSearch:function(){var t=".utility input.QuickSearchTextbox";$(t).attr("placeholder","Search")},commFoundParts:function(){var t=".DAGRGrid",e=".FSGrid";$(t).length&&$(t).each(function(){$(this).parents("table").addClass("tableWrapper")}),$(e).length&&$(e).each(function(){$(this).parents("table").addClass("tableWrapper")}),$(".tableWrapper").length&&$(".tableWrapper").each(function(){$(this).siblings("table").addClass("tableWrapper")}),$(".DonorGrantListingHeading").each(function(){$(this).parents("table").addClass("tableWrapper")}),$(".tableWrapper td").length&&($("td").each(function(){$(this).children().length>0?0===$(this).children(":visible").length&&$(this).addClass("emptyTD"):""===$.trim($(this).html())&&$(this).addClass("emptyTD")}),$("td > span").each(function(){""===$.trim($(this).html())&&$(this).addClass("emptyTDSpan")}))},accordionContent:function(){var t;t=".wrapAccordionContent h4",$(t).on("click",function(){$(this).next().slideToggle("slow").toggleClass("active"),$(this).toggleClass("active")})},donateRecurringEndDate:function(){$(".DonationFormTable").length&&($('[id*="Recurrence_divFrequency"]').length&&$('label[id*="Recurrence_lblTxtEnding"], input[id*="Recurrence_DatePickerEnd"], input[id*="Recurrence_DatePickerEnd"] + img.ui-datepicker-trigger').wrapAll('<div class="wrapEndDate" />'),$('input[id*="DonationCapture1_AddressCtl_tb_ZipUS"], input[id*="txtAmount"], input[id*="DonationCapture1_txtPhone"], input[id*="DonationCapture1_txtCardNumber"], input[id*="DonationCapture1_txtCSC"]').attr("pattern","[0-9]*"),$('tbody[id*="tbdCart"] tr[id*="Cart"]').length&&$('tbody[id*="tbdCart"] tr[id*="Cart"]').find(".DonationFieldCaption").next().attr("colspan","2"))},utilityMenuPart:function(){var t=$("#utility table.QuickSearchFormTable").clone(),e="ul.utilityNav li.search a";$(t).insertAfter(e),$(e).on("click",function(){$("#utility .search").prevAll().toggleClass("disable"),$("#utility li.disable")&&($(this).toggleClass("active"),$(this).parent().toggleClass("activeLi"),$(this).parent().parent().toggleClass("activeUl"),$(this).next().animate({width:"toggle"}))})},breadcrumbs:function(){var t;t=$('<li class="home"><a href="http://www.JFEDBCenver.edu/" target="_new">MSU Denver Alumni Association</a></li>'),0===$("nav.wrapBreadcrumbs ul.mainNav li.home").length&&$(t).insertBefore("nav.wrapBreadcrumbs ul.mainNav > .selected:visible"),$("nav.wrapBreadcrumbs ul.mainNav li.selected > a.selected").removeAttr("href")},userLogin:function(){$(".LoginFormTable").length&&($(".LoginFormTable .BBFieldControlCell").each(function(){$(this).prev("td").addClass("BBFieldCaption")}),$('label[for$="cbRememberLogin"]').parent().addClass("rememberLoginContainer"),$(".LoginFormValidatorSummary").closest("table").addClass("userLoginValidationContainer")),$('tr[id$="trSignInBody"]').length&&$('tr[id$="trSignInBody"]').closest("table").addClass("userLoginPart"),$(".signOn .LoginFormTable").length&&($('a[id*="lbtnForgotPwdUserName"]').insertBefore('input[id*="btnLogin"].LoginFormSubmitButton'),$('input[id*="txtUsername"]').attr("placeholder","Username"),$('input[id*="txtPassword"]').attr("placeholder","Password"),$('input[id*="txtForgotPWDUserNameEmail"]').attr("placeholder","Email"))}}}}},$(document).ready(function(){BBI.JFEDBC.bbnc.pageLoad()});try{Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function(){BBI.JFEDBC.bbnc.paneRefresh()})}catch(err){console.log("Sys is probably undefined"),$(document).ready(function(){BBI.JFEDBC.bbnc.paneRefresh()})}$(window).bind("load",function(){setTimeout(function t(){$(".sidebarContent iframe").length>0?$(".sidebarContent iframe").addClass("facebookFrame"):setTimeout(t,50)},50)});