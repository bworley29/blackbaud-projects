function initConfirmation () {
    var PostURL = 'https://www.savethechildren.org.au/sponsor-a-child/?data=';
    var ackTitle = $('#ackTitle').text(),
        ackFirstName = $('#ackFirstName').text(),
        ackLastName = $('#ackLastName').text(),
        childDataObject = sessvars.childdata,
        JSONstr;
    
    var userJSONstr = '"user": {"title" : "'+ackTitle+'","first_name" : "' +ackFirstName+  '","last_name" : "' +ackLastName+ '"},';
    var sponsorshipJSONstr = '"children" : [';
    
    $.each(childDataObject.children, function(i, data) {
        sponsorshipJSONstr = sponsorshipJSONstr + '{"image_url" : "'+data.image_url+'","name" : "'+data.name+'","Location" : "'+data.location+'","Gender" : "'+data.gender+'","Age" : "'+data.age+'"}';
        if (i !== childDataObject.children.length-1) {
            //add a comma for each except the last item
            sponsorshipJSONstr = sponsorshipJSONstr + ',';
        }
    });

  
    JSONstr = '{' + userJSONstr + sponsorshipJSONstr + ']}';
    PostURL = PostURL + Base64.encode(JSONstr);
	window.location = PostURL;
}

function storeChildSessionVariable (name, image, location, gender, age) {
    var childDataObject,
        childDataEntry = {};
    if (sessvars.childdata != null) {
        childDataObject = sessvars.childdata;
    } else {
        childDataObject = {
            "children"  : []
        };
    }
    childDataEntry = {
        "image_url" : image,
        "name" : name,
        "location" : location,
        "gender" : gender,
        "age" : age

    };
    childDataObject.children.push(childDataEntry);
    sessvars.childdata = childDataObject;
}
