$(document).ready(function()
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

var LAST_LIVE_POPOVER = undefined;

function loadPage()
{
	var page = window.location.hash.substring(1);
	
	// TODO: dynamically figure out which pages are available 
	var validPages = ['home', 'calendar', 'syllabus', 'resources', 'lectures', 'gradebook', 'autograder', 'staff', 'style', 'piazza'];
	
	if (page == 'projects')
	{
		$('#projects-link').click();
	}
	
	if ($.inArray(page, validPages) === -1)
	{
		page = 'home';
	}
	
	document.title = 'EECS 183'
	if (page != 'home')
	{
		document.title += ': ' + page.charAt(0).toUpperCase() + page.substring(1);
	}
	
	$("#sidebar-wrapper li").removeClass("active");
	$("#" + page + "-button").addClass("active");
	$('#content').load('pages/' + page + '.html', function (response, status, xhr)
	{
	    if (page == "staff" && status == "success") {
	        populateStaffPage();
            
            var popoverOptions = {
                container: "#wrapper #content",
                placement: "bottom"
            };
            $(".staff-member img").click(function() {
                var currentPopover = $(this);
                if (LAST_LIVE_POPOVER)
                {
                    if (LAST_LIVE_POPOVER[0] === currentPopover[0])
                    {
                        // popover already handles toggle, don't need to do anything
                        return;
                    }
                    else
                    {
                        LAST_LIVE_POPOVER.popover("destroy");
                        LAST_LIVE_POPOVER = undefined;
                    }
                }

                popoverOptions.content = $(this).parents(".staff-member").find(".staff-info").html();
                popoverOptions.html = true;
                currentPopover.popover(popoverOptions).popover("show");
                LAST_LIVE_POPOVER = currentPopover;
            });
        }
	});	
}

function removeProgressWheel()
{
	$('.progress-wheel').remove();
}

// Returns a jQuery object that is an HTML tag of type elementType
function createElement(elementType)
{
    return $(document.createElement(elementType));
}

function getProfessors()
{
    return _instructors.professors;
}

function getGSIs()
{
    return _instructors.GSIs;
}


var NUM_COLMNS = 12,
    MAX_STAFF_IN_ROW = { // values must be multiples of NUM_COLUMNS
        md: 4,
        sm: 3,
        xs: 2,
    };


function populateInstructorRow(instructorGetter, rowSelector)
{
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
            // check if row for given size has been filled
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

        // append to container
        instructorRow.append(staffMemberElement);
    }
}
function createStaffInfo(instructorDef)
{
    if (instructorDef == undefined)
        return;

    var infoContainer = createElement("div").addClass("hidden staff-info"),
        websiteContainer = createElement("div").addClass("staff-website-wrapper"),
        emailContainer = createElement("div").addClass("staff-email-wrapper"),
        majorsContainer = createElement("div").addClass("staff-majors-wrapper"),
        label,
        content;

    if (instructorDef.website)
    {
        label = createElement("span").text("Website: ");
        content = createElement("a").attr("href", instructorDef.website).text(instructorDef.website);
        websiteContainer.append(label).append(content);
        
        infoContainer.append(websiteContainer);
    }
    if (instructorDef.email)
    {
        label = createElement("span").text("Email: ");
        content = createElement("a").attr("href", "mailto:" + instructorDef.email).text(instructorDef.email);
        emailContainer.append(label).append(content);

        infoContainer.append(emailContainer);
    }
    if (instructorDef.concentration.majors.length)
    {
        var labelText = "Major" + (instructorDef.concentration.majors.length > 1 ? "s" : "");
        content = createElement("ul");
        label = createElement("span").text(labelText);
        for (var i in instructorDef.concentration.majors)
            content.append(createElement("li").text(instructorDef.concentration.majors[i]));
        majorsContainer.append(label).append(content);

        infoContainer.append(majorsContainer);
    }

    return infoContainer;
}
function populateStaffPage()
{
    populateInstructorRow(getProfessors, "#professor-row");
    populateInstructorRow(getGSIs, "#gsi-row");
}
