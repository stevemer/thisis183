$(document).ready(function()
{
	loadPage();

	$("#sidebar-wrapper li").click(function() {
    	target = $('> a', this).attr("href");
    	if (target[0] == '#')
    	{
	    	document.location.hash = target;
	    	loadPage();
    	}
        
    });
});

function loadPage()
{
	var page = window.location.hash.substring(1);
	
	// TODO: dynamically figure out which pages are available 
	var validPages = ['home', 'calendar', 'syllabus', 'resources', 'lectures', 'gradebook'];
	
	if ($.inArray(page, validPages) === -1)
	{
		page = 'home';
	}
	
	$("#sidebar-wrapper li").removeClass("active");
	$("#" + page + "-button").addClass("active");
	$('#content').load('/pages/' + page + '.html');
}
