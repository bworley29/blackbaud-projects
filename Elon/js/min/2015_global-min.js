var BBI=BBI||{Config:{version:1,updated:"mm/dd/yyyy hh:mm",isEditView:!!window.location.href.match("pagedesign")},Defaults:{rootpath:BLACKBAUD.api.pageInformation.rootPath,pageId:BLACKBAUD.api.pageInformation.pageId},Methods:{pageInit:function(){Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function(){BBI.Methods.pageRefresh()}),$(document).ready(function(){BBI.Methods.pageLoad()})},pageRefresh:function(){BBI.Methods.moveHeader(),BBI.Methods.addClassToRequiredInputs(),BBI.Methods.addClassToTextareaLabel(),BBI.Methods.addClassToEmptyTableCells(),BBI.Methods.parts.donationForm(),BBI.Methods.responsiveDonationForm(),BBI.Methods.responsiveUserEmailPreferences(),BBI.Methods.responsiveEventRegistrationNew(),BBI.Methods.responsivePaymentPart(),BBI.Methods.responsiveUserLogin(),BBI.Methods.responsiveSurvey()},pageLoad:function(){BBI.Methods.getHeaderAndFooter(),BBI.Methods.fixedSidebar(),BBI.Methods.dynamicBreadcrumb(),BBI.Methods.mobileSidebarToggle(),BBI.Methods.checkWindowInitialSize(),$(window).resize(BBI.Methods.windowResizeFunctions),$(window).scroll(BBI.Methods.scrollFunctions)},parts:{donationForm:function(){$("table.DonationFormTable").length&&$('tr[id*="trCart"] > td.emptyTD:hidden')&&$('tr[id*="trCart"] > td.emptyTD').next().attr("colspan","2"),0===$('table[id$="tblAmount"] input[name$="givingLevels"]').length&&$('[id*="TB_pnlDonation"]').addClass("onlyOtherAmtShown")}},getHeaderAndFooter:function(){$(".supportSite").length?$.ajax({url:"//www.elon.edu/globalheaderapi/api/main/",type:"GET",dataType:"jsonp",crossDomain:!0,jsonpCallback:"myCustomCallbackName",success:function(e){$("head").append($(e.HeaderAndFooterStyles)),$("body").prepend($(e.HeaderHTML)),$("body").append($(e.FooterHTML)),$("head").append($(e.HeaderScripts))},error:function(e,t,n){}}):$(".lawSite").length&&$.ajax({url:"//www.elon.edu/globalheaderapi/api/law/",type:"GET",dataType:"jsonp",crossDomain:!0,jsonpCallback:"myCustomCallbackName",success:function(e){$("body").prepend($(e.HeaderHTML)),$("body").append($(e.FooterHTML)),$("head").append($(e.HeaderAndFooterStyles)),$("head").append($(e.HeaderScripts))},error:function(e,t,n){}})},moveHeader:function(){$("#homepage-header").length&&$('[id*="bbBetaAdminMenuDiv"]').length&&$("#homepage-header").insertAfter('[id*="bbBetaAdminMenuDiv"]')},mobileSidebarToggle:function(){$(".wrapContent .mobileSidebarToggle").click(function(){$(this).next("ul").slideToggle(),$(this).toggleClass("active")})},dynamicBreadcrumb:function(){$("li.currentPage a").html("");var e=$("h1.BBDynamicPageTitle").clone();""===$("li.currentPage a").html()&&e.prependTo("li.currentPage a")},fixedSidebar:function(){var e=$("#secondary-nav").offset().top+120,t=$("#secondary-nav").offset().left,n=$("#secondary-nav"),o=!1;$(window).scroll(function(){e<$(window).scrollTop()&&!o&&(n.addClass("fixeSidebar").css("left",t),o=!0),e>$(window).scrollTop()&&o&&(n.removeClass("fixeSidebar").css("left","auto"),o=!1)})},getUrlVars:function(){var e={},t=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(t,n,o){e[n]=unescape(o.replace(/\+/g," "))});return e},returnQueryValueByName:function(e){BLACKBAUD.api.querystring.getQueryStringValue(e)},fixPositioning:function(){$('div[id*="_panelPopup"]').appendTo("body"),$('div[id*="_designPaneCloak"]').css({top:"0px",left:"0px"}),$(".DesignPane").css("position","relative")},checkWindowInitialSize:function(){(-1==navigator.userAgent.indexOf("Safari")||-1!=navigator.userAgent.indexOf("Chrome"))&&(BBI.Methods.params.scrollBarWidth=window.innerWidth-$("body").width()),$(window).width()<BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth&&$(window).width()>=BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth?(BBI.Methods.goTabletOnce(),BBI.Methods.goTabletAlways()):$(window).width()<BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth?(BBI.Methods.goPhoneOnce(),BBI.Methods.goPhoneAlways()):(BBI.Methods.goDesktopOnce(),BBI.Methods.goDesktopAlways()),BBI.Methods.params.oldWidth=$(window).width()},checkWindowSize:function(){(-1==navigator.userAgent.indexOf("Safari")||-1!=navigator.userAgent.indexOf("Chrome"))&&(BBI.Methods.params.scrollBarWidth=window.innerWidth-$("body").width()),$(window).width()<BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth&&$(window).width()>=BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth&&(BBI.Methods.params.oldWidth>=BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth||BBI.Methods.params.oldWidth<BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth)?(BBI.Methods.goTabletOnce(),BBI.Methods.goTabletAlways()):$(window).width()<BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth&&$(window).width()>=BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth?BBI.Methods.goTabletAlways():$(window).width()<BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth&&BBI.Methods.params.oldWidth>=BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth?(BBI.Methods.goPhoneOnce(),BBI.Methods.goPhoneAlways()):$(window).width()<BBI.Methods.params.breakBelow2-BBI.Methods.params.scrollBarWidth?BBI.Methods.goPhoneAlways():$(window).width()>=BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth&&BBI.Methods.params.oldWidth<BBI.Methods.params.breakBelow1-BBI.Methods.params.scrollBarWidth?(BBI.Methods.goDesktopOnce(),BBI.Methods.goDesktopAlways()):BBI.Methods.goDesktopAlways(),BBI.Methods.params.oldWidth=$(window).width()},addClassToRequiredInputs:function(){($(".BBFormTable").length||$(".PaymentPart_FormContainer").length||$('div[id$="ev2wiz"]').length||$('div[id$="formWizard"]').length)&&$("input, select, textarea").each(function(){($(this).parent().next("td").hasClass("BBFormRequiredFieldMarker")&&"hidden"!=$(this).parent().next("td").css("visibility")||$(this).closest(".BBFieldControlCell").next("td").hasClass("BBFormRequiredFieldMarker")&&"hidden"!=$(this).closest(".BBFieldControlCell").next("td").css("visibility")||$(this).closest(".BBFieldControlCell").next("td").children("span:first").hasClass("BBFormRequiredFieldMarker")||$(this).next("span").hasClass("BBFormRequiredFieldMarker"))&&($(this).addClass("required"),$(this).attr("id").indexOf("cboYear")>=0||($(this).attr("id").indexOf("cboMonth")>=0?$(this).closest("table").parent().prev('td[id$="ExpiryLbl"]').children("label").eq(0).addClass("required"):$(this).prev("label").length>0?$(this).prev("label").addClass("required"):$(this).prev("div").children("label").length>0?$(this).prev("div").children("label").eq(0).addClass("required"):$(this).parent().prev("td").children("label").eq(0).addClass("required")))})},addClassToTextareaLabel:function(){$(".BBDivFieldContainer textarea").prev("label").addClass("labelForTextarea")},addClassToEmptyTableCells:function(){$("td").length&&($("td").each(function(){$(this).children().length>0?0===$(this).children(":visible").length&&$(this).addClass("emptyTD"):""===$.trim($(this).html())&&$(this).addClass("emptyTD")}),$("td > span").each(function(){""===$.trim($(this).html())&&$(this).addClass("emptyTDSpan")}))},responsiveCheckboxesChangeEvent:function(){$('input[type="checkbox"]').change(BBI.Methods.responsiveCheckboxesAddClass).next("label").addClass("checkboxLabel")},responsiveCheckboxesAddClass:function(){$('input[type="checkbox"]').each(function(){"checked"==$(this).attr("checked")?$(this).next("label").addClass("boxChecked"):$(this).next("label").removeClass("boxChecked")})},responsiveGivingAmountsChangeEvent:function(){$('table[id$="tblAmount"] input[name$="givingLevels"]').change(BBI.Methods.responsiveGivingAmountsAddClass)},responsiveGivingAmountsAddClass:function(){$('table[id$="tblAmount"] input[name$="givingLevels"]').each(function(){"checked"==$(this).attr("checked")?"rdoOther"==$(this).val()?$(this).siblings("label").eq(0).addClass("boxChecked"):$(this).closest("td").next("td").children(".radioLabel").addClass("boxChecked"):"rdoOther"==$(this).val()?$(this).siblings("label").eq(0).removeClass("boxChecked"):$(this).closest("td").next("td").children(".radioLabel").removeClass("boxChecked")})},responsiveRadioButtonChangeEvent:function(){$('input[type="radio"]').length&&$('input[type="radio"]').filter(function(){return-1===this.name.indexOf("givingLevels")}).change(BBI.Methods.responsiveRadioButtonAddClass).next("label").addClass("radioLabel")},responsiveRadioButtonAddClass:function(){$('input[type="radio"]').filter(function(){return-1===this.name.indexOf("givingLevels")}).each(function(){"checked"==$(this).attr("checked")?$(this).next("label").addClass("boxChecked"):$(this).next("label").removeClass("boxChecked")})},responsiveDonationForm:function(){$(".DonationFormTable").length&&($(".DonationFormTable").addClass("hide"),$('label[id$="lblTxtOnMonthlyQuarterly"]').parent().addClass("labelRecurrenceStartingOn"),$('input[id$="Recurrence_rdoDay"]').parent().parent().addClass("radioRecurrenceDay"),$('select[id$="Recurrence_ddlDayNumber2"]').parent().addClass("inputDayOfMonth"),$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(1)').addClass("emptyTDBelowOnLabel"),$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(2)').addClass("radioRecurrenceDayFrequency"),$('tr[id$="tr_AdvancedRecurringOptions"] > td:nth-child(3)').addClass("inputRecurrenceDayFrequency"),$('tr[id$="Recurrence_trAnnually"] > td').eq(0).addClass("annualRecurrenceTD"),$('select[id$="Recurrence_ddlPosition"]').each(function(){$(this).children("option").eq(0).html("1st"),$(this).children("option").eq(1).html("2nd"),$(this).children("option").eq(2).html("3rd"),$(this).children("option").eq(3).html("4th")}),$('select[id$="Recurrence_ddlDayOfWeek2"]').each(function(){$(this).children("option").eq(0).html("Sun"),$(this).children("option").eq(1).html("Mon"),$(this).children("option").eq(2).html("Tue"),$(this).children("option").eq(3).html("Wed"),$(this).children("option").eq(4).html("Thu"),$(this).children("option").eq(5).html("Fri"),$(this).children("option").eq(6).html("Sat")}),$('label[for$="Recurrence_ddlDayNumber2"], label[for$="Recurrence_ddlDayOfWeek2"]').each(function(){$(this).html().indexOf("of every month")>=0?$(this).html("monthly"):$(this).html().indexOf("of every three months")>=0&&$(this).html("every 3rd mo.")}),$('input[id$="chkCorporate"] + label').html("Give on behalf of a company"),$('input[id$="chkAnonymous"] + label').html("Give anonymously"),$('input[name$="givingLevels"]').length&&($('input[name$="givingLevels"]').each(function(){$(this).closest("td").addClass("givingAmountInputTD").next("td").children("span").eq(0).addClass("givingAmount radioLabel").click(function(){$(this).parent().parent().siblings('tr[id$="trOther"]').children("td").removeClass("checked"),$(this).parent().prev("td").find("label").eq(0).click(),$('input[id$="txtAmount"]').length&&$('input[id$="txtAmount"]').val("")})}),$('input[name$="givingLevels"][id$="rdoOther"]').next("label").addClass("givingAmount radioLabel")),$('input[id$="txtAmount"]').length&&$('input[id$="rdoOther"]').click(function(){$(this).parent().parent().next("td").addClass("checked")}),BBI.Methods.responsiveCheckboxesAddClass(),BBI.Methods.responsiveCheckboxesChangeEvent(),BBI.Methods.responsiveGivingAmountsAddClass(),BBI.Methods.responsiveGivingAmountsChangeEvent(),BBI.Methods.responsiveRadioButtonAddClass(),BBI.Methods.responsiveRadioButtonChangeEvent(),$('input[id$="chkMGCompany"]').length&&$('input[id$="chkMGCompany"]').parent().addClass("clearfix"),$('table[id$="tblAmount"] [id*="trOther"] .wsNowrap table tr td[id*="Td1"]').addClass("otherAmountTd"),$(".otherAmountTd").prev("td").addClass("hide"),$(".otherAmountTd").click(function(){$('table[id$="tblAmount"] [id*="trOther"] [id*="rdoOther"]').trigger("click"),$('table[id$="tblAmount"] [id*="trOther"] [id*="txtAmount"]').focus(),$(this).addClass("boxChecked")}),$(".radioLabel").click(function(){$('table[id$="tblAmount"] [id*="trOther"] [id*="rdoOther"]').not(":checked")&&$(".otherAmountTd").removeClass("boxChecked")}),$(".DonationFormTable").removeClass("hide"))},responsiveUserEmailPreferences:function(){$(".SubscriptionFormTable").length&&(BBI.Methods.responsiveCheckboxesAddClass(),BBI.Methods.responsiveCheckboxesChangeEvent())},responsiveEventRegistrationNew:function(){$(".BBEventRegSequenceMap").length&&($("div.Ev2_PriceTypesHeader, div.Ev2_PriceTypesRow, div.Ev2_SummaryTotal, div.Ev2_RegistrantFieldCell").addClass("clearfix"),$('input[id*="txtQty"]').blur(function(){var e=$(this).parent().nextAll(".Ev2_PriceTypeValidatorColumn").children("span.Ev2_Step1QtyValidation");setTimeout(function(){"visible"==e.css("visibility")?e.parent().addClass("validationActive"):e.parent().removeClass("validationActive")},500)}))},responsiveEventRegistrationClassic:function(){$(".EventTable .EventProgressCell").length&&($('.EventTable table[id$="tblProgress"] th').each(function(e){var t=$(this).html(),n=t.split(">");$(this).html('<span class="stepIndex">'+(e+1)+'</span><span class="stepText">'+n[1]+"</span>")}),$('.EventTable table[id$="tblProgress"] th').last().addClass("last"),$("div.LoginFormCheckListContainer").parent().prev("td").addClass("checklistLabelContainer"),$("td.EventItemRegistrantControlCellName").parent().parent().parent().addClass("eventAttributeContainer"),$('.EventTable input[id*="StepNavigationTemplateContainerID"]').eq(0).closest("table").addClass("prevNextContainerTable"),$('.EventTable input[id*="StartNavigationTemplateContainerID"]').eq(0).parent().addClass("nextContainerTR"),BBI.Methods.responsiveCheckboxesAddClass(),BBI.Methods.responsiveCheckboxesChangeEvent())},responsivePaymentPart:function(){$(".PaymentPart_FormContainer").length&&(BBI.Methods.responsiveCheckboxesAddClass(),BBI.Methods.responsiveCheckboxesChangeEvent())},responsiveUserLogin:function(){$(".LoginFormTable").length&&($(".LoginFormTable .BBFieldControlCell").each(function(){$(this).prev("td").addClass("BBFieldCaption")}),$('label[for$="cbRememberLogin"]').parent().addClass("rememberLoginContainer"),$(".LoginFormValidatorSummary").closest("table").addClass("userLoginValidationContainer")),$('tr[id$="trSignInBody"]').length&&($('tr[id$="trSignInBody"]').closest("table").addClass("userLoginPart"),BBI.Methods.responsiveCheckboxesAddClass(),BBI.Methods.responsiveCheckboxesChangeEvent())},responsiveSurvey:function(){$(".SurveyQuestionTable").length>0&&$(".SurveyQuestionTable td span.BBFormRequiredFieldMarker").parent().next("td").children("span").eq(0).addClass("required")},responsiveEventCalendar:function(){$(".EventCalendarPartContainer").length&&$(".CalendarViewCalendarContainer").length?$('input[id$="ImageButtonViewList"]').click():$(".EventCalendarPartContainer").length&&$("a.ListViewEventTitle").each(function(){var e=$(this).attr("href");$(this).after('<a class="BBFormSubmitButton" href="'+e+'">View Details</a>')})},params:{oldWidth:"1000",breakBelow1:"769",breakBelow2:"481",scrollBarWidth:"0",scrolledTo:"0",previousScrolledTo:"0"},windowResizeFunctions:function(){BBI.Methods.checkWindowSize()},scrollFunctions:function(){BBI.Methods.params.previousScrolledTo=BBI.Methods.params.scrolledTo,BBI.Methods.params.scrolledTo=$(window).scrollTop()},goDesktopOnce:function(){$("body").addClass("desktopMode").removeClass("mobileMode tabletMode phoneMode")},goDesktopAlways:function(){},goTabletOnce:function(){$("body").addClass("mobileMode tabletMode").removeClass("desktopMode phoneMode")},goTabletAlways:function(){},goPhoneOnce:function(){$("body").addClass("mobileMode phoneMode").removeClass("desktopMode tabletMode"),BBI.Methods.responsiveEventCalendar()},goPhoneAlways:function(){}}};BBI.Methods.pageInit(),jQuery.expr[":"].Contains=function(e,t,n){return jQuery(e).text().toUpperCase().indexOf(n[3].toUpperCase())>=0},window.log=function(){if(log.history=log.history||[],log.history.push(arguments),this.console){arguments.callee=arguments.callee.caller;var e=[].slice.call(arguments);"object"==typeof console.log?log.apply.call(console.log,console,e):console.log.apply(console,e)}},function(e){function t(){}for(var n,o="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(",");n=o.pop();)e[n]=e[n]||t}(function(){try{return console.log(),window.console}catch(e){return window.console={}}}());