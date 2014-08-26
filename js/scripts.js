$(document).ready(function()
{
	loadPage();

	window.onhashchange = loadPage;

});

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
	$('#content').load('../pages/' + page + '.html', function (response, status, xhr)
	{
	    if (page == "staff" && status == "success")
	        populateStaffPage();
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

// TODO: handle case where numProfs causes bleed to next line
function populateProfessorRow()
{
    var professorsDef = getProfessors(),
        numProfs = professorsDef.length,
        staffRow = $("#professor-row"),
        columnWidths = {};


    // determine column widths
    for (var attr in MAX_STAFF_IN_ROW)
    {
        var maxInRow = MAX_STAFF_IN_ROW[attr];
        if (maxInRow >= numProfs)
            columnWidths[attr] = NUM_COLMNS / numProfs;
        else
            columnWidths[attr] = NUM_COLMNS / maxInRow;
    }

    var professorRow = $("#professor-row");
    for (var i in professorsDef)
    {
        var professor = professorsDef[i],
            staffMemberElement = createElement("div").addClass("staff-member"),
            imgWrapper = createElement("div").addClass("img-wrapper"),
            img = createElement("img").addClass("img-responsive").attr("src", professor.getImagePath()),
            staffName = createElement("p").addClass("staff-member-name");
     
        // place column width classes on staff-member element
        for (var attr in columnWidths)
            staffMemberElement.addClass("col-" + attr + "-" + columnWidths[attr]);


        // append children
        staffMemberElement.append(imgWrapper.append(img));
        staffMemberElement.append(staffName.text(professor.getInstructorName()));


        // append to container
        professorRow.append(staffMemberElement);
    }
}
function populateStaffPage()
{
    populateProfessorRow();
}