// Returns a jQuery object that is an HTML tag of type elementType
function createElement(elementType)
{
    return $(document.createElement(elementType));
}

$(document).ready(function ()
{
	loadPage();

	$("#sidebar-wrapper li").click(function()
	{
		target = $('> a', this).attr("href");
		if ($(this).hasClass('active') && target[0] == '#')
		{
			changePage();
		}
	});

	window.onhashchange = changePage;
});

function changePage()
{
	loadPage();
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-54268018-1', 'auto');
	ga('send', 'pageview', {
		'page': location.pathname + location.search + location.hash
	});
}

// repositions visible popover during resize
$(window).resize(function ()
{
    if (LAST_LIVE_POPOVER)
        LAST_LIVE_POPOVER.popover("show");
    
})

function loadPage()
{
    LAST_LIVE_POPOVER = undefined; // reset upon page change
    IS_MOUSE_IN_POPOVER = false;
	var page = window.location.hash.substring(1);
	
	// TODO: dynamically figure out which pages are available 
	var validPages = {
		'home': '',
		'calendar': 'Calendar',
		'syllabus': 'Syllabus',
		'resources': 'Resources',
		'lectures': 'Lectures',
		'gradebook': 'Gradebook',
		'autograder': 'Autograder',
		'staff': 'Staff',
		'183style': '183style',
		'piazza': 'Piazza',
		'oh': 'Office Hours',
		'logout': 'Log Out'
	};
	
	if (page == 'projects')
	{
		$('#projects-link').click();
	}
	
	if ((page == 'style' || page == '183style') && $('#style-link').hasClass('collapsed'))
	{
		$('#style-link').click();
	}
	
	if (!(page in validPages))
	{
		page = 'home';
	}
	
	document.title = 'EECS 183'
	if (page != 'home')
	{
		document.title += ': ' + validPages[page];
	}
	
	$("#sidebar-wrapper li").removeClass("active");
	$("#" + page + "-button").addClass("active");
	$('#content').load('pages/' + page + '.html', function (response, status, xhr)
	{
	    if (page == "staff" && status == "success")
	    {
	        populateStaffPage();
            
            var popoverOptions = {
                placement: "bottom",
                trigger: "manual",
                delay: {"show": 0, "hide":1},
                title: function() {
                    return $(this).parents(".staff-member").find(".staff-member-name").html()
                },
                content: function() {
                    return $(this).parents(".staff-member").find(".staff-info").html()
                },
                html: true,
                viewport: "body",
            };

            // create popover elements attached to img-wrapper
            $(".staff-member").each(function()
            {
                popoverOptions.container = $(this);
                $(".img-wrapper", this).popover(popoverOptions)
            });

            // manually display popover on mouseover
            $(".staff-member").hover(function()
            {
                $(".img-wrapper", this).popover("show");
            })
            .mouseleave(function()
            {
                $(".img-wrapper", this).popover("hide");
            });
        }
	});	
}

function removeProgressWheel()
{
	$('.progress-wheel').remove();
}




/**************** POPULATING STAFF PAGE *****************/

var NUM_COLMNS = 12,
    MAX_STAFF_IN_ROW = { // values must be multiples of NUM_COLUMNS
        md: 4,
        sm: 3,
        xs: 2,
    };
function getProfessors()
{
    return _instructors.professors;
}
function getGSIs()
{
    return _instructors.GSIs;
}


function createStaffInfo(instructorDef)
{
    if (instructorDef == undefined)
    {
        console.log("createStaffInfo::instructorDef is undefined");
        return;
    }

    var infoContainer = createElement("div").addClass("hidden staff-info"),
        content;


    // append classes
    var classInfo = createElement("div").addClass("staff-info-category");
    if (instructorDef.lectures.length)
    {
        var lectureContainer = createElement("div").addClass("staff-lecture-wrapper");
        appendClasses("Lecture", instructorDef.getLectureSections(), lectureContainer);
        classInfo.append(lectureContainer);
    }
    if (instructorDef.discussions.length)
    {
        var discussionContainer = createElement("div").addClass("staff-dicussion-wrapper");
        appendClasses("Discussion", instructorDef.getDiscussionSections(), discussionContainer);
        classInfo.append(discussionContainer);
    }
    if (classInfo.children().length)
        infoContainer.append(classInfo);


    // append contact info
    var contactInfo = createElement("div").addClass("staff-info-category");
    if (instructorDef.email)
    {
        var emailContainer = createElement("div").addClass("staff-email-wrapper");
        content = createElement("a").attr("href", "mailto:" + instructorDef.email).text(instructorDef.email);
        emailContainer.append(content);

        contactInfo.append(emailContainer);
    }
    if (instructorDef.website)
    {
        var websiteContainer = createElement("div").addClass("staff-website-wrapper");
        content = createElement("a").attr("href", "http://" + instructorDef.website).text(instructorDef.website);
        websiteContainer.append(content);

        contactInfo.append(websiteContainer);
    }
    if (contactInfo.children().length)
        infoContainer.append(contactInfo);


    // append concentration
    var concentrationInfo = createElement("div").addClass("staff-info-category");
    if (instructorDef.concentration.majors.length)
    {
        var majorsContainer = createElement("div").addClass("staff-majors-wrapper");
        appendConcentration("", instructorDef.concentration.majors, majorsContainer);
        concentrationInfo.append(majorsContainer);
    }
    if (instructorDef.concentration.minors.length)
    {
        var label = "Minor in ",
            minorsContainer = createElement("div").addClass("staff-minors-wrapper");
        if (instructorDef.concentration.minors.length > 1)
            label = "Minors in "
        appendConcentration(label, instructorDef.concentration.minors, minorsContainer);
        concentrationInfo.append(minorsContainer);
    }
    if (concentrationInfo.children().length)
        infoContainer.append(concentrationInfo);


    return infoContainer;
}


// Requires: timestamp is a string in the format hh:mm[:ss]
function formatTimeStamp(timestamp)
{
    timestamp = timestamp.split(":");
    timestamp[0] = parseInt(timestamp[0]);

    var daytimeLabel = "am";
    if (timestamp[0] >= 12)
        daytimeLabel = "pm";
    if (timestamp[0] > 12) // convert from 24 hr to 12 hr
        timestamp[0] -= 12;

    return timestamp[0] + ":" + timestamp[1] + daytimeLabel;
}
function formatClassTime(section)
{
    var dayAbbrev = section.days[0][0],
        formattedTime;


    // append days of the week
    formattedTime = dayAbbrev
    if (dayAbbrev == "T" && section.days[0][1] == "h")
        formattedTime += "h";
    for (var i = 1; i < section.days.length; i++)
    {
        dayAbbrev = section.days[i][0];
        if (dayAbbrev == "T" && section.days[i][1] == "h")
            dayAbbrev += "h";
        formattedTime += ", " + dayAbbrev;
    }


    // append start and end times
    var startTime = formatTimeStamp(section.startTime),
        endTime = formatTimeStamp(section.endTime);
    formattedTime += " " + startTime + "-" + endTime + " " + section.room;

    return formattedTime;
}
function appendClasses(classType, classArray, container)
{
    var labelText = classType + (classArray.length > 1 ? "s" : ""),
        label = createElement("span").text(labelText),
        content = createElement("ul");

    for (var i in classArray)
    {
        content.append(createElement("li").text(formatClassTime(classArray[i])));
    }

    container.append(label).append(content);
}

function appendConcentration(concentrationTitle, concentrationArray, container)
{
    if (concentrationTitle == undefined || concentrationArray == undefined ||
        container == undefined)
        return;

    var labelText = concentrationTitle,
        content = createElement("span"),
        label = createElement("span").text(labelText);

    content.append(createElement("span").text(concentrationArray[0]))
    for (var i = 1; i < concentrationArray.length; i++)
    {
        var textVal = concentrationArray[i];
        if (i == concentrationArray.length - 1) // append and for last in list
            textVal = ", and " + textVal;
        else
            textVal = ", " + textVal;
        content.append(createElement("span").text(textVal));
    }

    container.append(label).append(content);
}


function populateInstructorRow(instructorGetter, rowSelector)
{
    if (typeof instructorGetter != "function")
    {
        console.log("populateInstructorRow::instructorGetter isn't a function");
        return;
    }
    if (typeof rowSelector == undefined)
    {
        console.log("populateInstructorRow::rowSelector is undefined");
        return;
    }

    var instructorDef = instructorGetter(),
        numInstructors = instructorDef.length,
        columnWidths = {};

    var instructorRow = $(rowSelector);
    for (var i = 0; i < numInstructors; i++)
    {
        var instructor = instructorDef[i],
            staffMemberElement = createElement("div").addClass("staff-member"),
            imgWrapper = createElement("div").addClass("img-wrapper"),
            img = createElement("img").addClass("img-responsive").attr("src", instructor.getImagePath()),
            staffName = createElement("p").addClass("staff-member-name");

        // determine column widths
        for (var attr in MAX_STAFF_IN_ROW)
        {
            var maxInRow = MAX_STAFF_IN_ROW[attr];
            // check if grid row for given size has been filled
            if (i % maxInRow == 0)
            {
                // update row
                if (maxInRow >= numInstructors - i)
                    columnWidths[attr] = NUM_COLMNS / (numInstructors - i);
                else
                    columnWidths[attr] = NUM_COLMNS / maxInRow;
            }
        }

        // place column width classes on staff-member element
        for (var attr in columnWidths)
            staffMemberElement.addClass("col-" + attr + "-" + columnWidths[attr]);


        // append children
        staffMemberElement.append(imgWrapper.append(img));
        staffMemberElement.append(staffName.text(instructor.getInstructorName()));
        staffMemberElement.append(createStaffInfo(instructor));

        // append to row
        instructorRow.append(staffMemberElement);
    }
}
function populateStaffPage()
{
    populateInstructorRow(getProfessors, "#professor-row");
    populateInstructorRow(getGSIs, "#gsi-row");
}
