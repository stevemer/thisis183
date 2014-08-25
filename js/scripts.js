$(document).ready(function()
{
	loadPage();

    window.onhashchange = loadPage;
});

function loadPage()
{
	var page = window.location.hash.substring(1);
	
	// TODO: dynamically figure out which pages are available 
	var validPages = ['home', 'calendar', 'syllabus', 'resources', 'lectures', 'gradebook', 'autograder', 'staff', 'style'];
	
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
	$('#content').load('../pages/' + page + '.html');
	
	
}

function removeProgressWheel()
{
	$('.progress-wheel').remove();
}
