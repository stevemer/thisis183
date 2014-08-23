$(function() {
    var _sidebarTabs = [
        {
            tabName: "EECS 183",
            iframeSource: "sample.html"
        },
        {
            tabName: "Syllabus",
            iframeSource: "http://umich.edu/~eecs183/syllabus"
        },
        {
            tabName: "Calendar",
            iframeSource: "http://umich.edu/~eecs183/calendar"
        },
        {
            tabName: "Projects",
            iframeSource: ""
        },
        {
            tabName: "Lectures",
            iframeSource: "https://ctools.umich.edu/access/basiclti/site/f89c53b6-0efc-4252-a82b-56ba1f1e878a/content:2838"
        },
        {
            tabName: "Resources",
            iframeSource: "https://ctools.umich.edu/portal/tool/f0eb6311-e389-42f4-90a7-9c8a6565717a?panel=Main"
        },
        {
            tabName: "Staff",
            iframeSource: ""
        },
        {
            tabName: "Contact",
            iframeSource: ""
        },
    ],
        _currentTab = 0;

    $("body").height(window.innerHeight);
    function handleResize() {
        $("body").height(window.innerHeight);
        $("#iFrameContainer iframe:not(.inactiveFrame)").innerHeight(window.innerHeight);
    }
    $(window).resize(handleResize)


    function createElement(elementType) {
        return $(document.createElement(elementType));
    }


    function createSidebarTabsAnd_iFrames() {
        for (var i in _sidebarTabs) {
            var currentTab = _sidebarTabs[i];
            if (currentTab.tabName)
                appendSidebarItem(currentTab.tabName, i);
            if (i == 0)
                append_iFrame(currentTab.iframeSource, i);
        }
    }
    function appendSidebarItem(sidebarName, index) {
        var listItem = createElement("li").attr("tabIndex", index);
        listItem.append(createElement("span").text(sidebarName));
        if (index == "0")
            listItem.addClass("sidebar-brand active");

        $("#sidebar-wrapper ul").append(listItem);
    }
    function append_iFrame(iframeSource, index, isInactive) {
        var iFrame = createElement("iframe").attr("frameborder", "0").addClass("pageContent row-fluid");
        iFrame.attr("tabIndex", index).attr("src", iframeSource);

        if (isInactive)
            iFrame.addClass("inactiveFrame");

        $("#iFrameContainer").append(iFrame);
    }
    createSidebarTabsAnd_iFrames();



    $("#sidebar-wrapper li").click(function() {
        var listItem = $(this),
            iFrameContainer = $("#iFrameContainer"),
            currentiFrame = iFrameContainer.find("iframe[tabIndex='" + _currentTab + "']"),
            newTabIndex = $(this).attr("tabIndex"),
            newiFrame = iFrameContainer.find("iframe[tabIndex='" + newTabIndex + "']"),
            loadingNewiFrame = false;
        
        
        // iframe not present, create a new one
        if (!newiFrame.length) {
            var newSource = _sidebarTabs[newTabIndex].iframeSource;
            loadingNewiFrame = true;
            if (!newSource)
                newSource = "sample.html";

            append_iFrame(newSource, newTabIndex, true);
            newiFrame = iFrameContainer.find("iframe[tabIndex='" + newTabIndex + "']");
        }


        // update sidebar
        _currentTab = newTabIndex;
        $("#sidebar-wrapper li").removeClass("active");
        listItem.addClass("active");
        

        
        // swap to newly selected frame
        var swapFrames = function() {
            newiFrame.removeClass("inactiveFrame");
            currentiFrame.addClass("inactiveFrame");
        }
        // delay to give a new iframe time to load
        if (loadingNewiFrame)
            setTimeout(swapFrames, 850);
        else
            swapFrames();
    });
});