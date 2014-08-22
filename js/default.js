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
            iframeSource: ""
        },
        {
            tabName: "Resources",
            iframeSource: ""
        },
        {
            tabName: "Staff",
            iframeSource: ""
        },
        {
            tabName: "Contact",
            iframeSource: ""
        },
    ];

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
            if (currentTab.iframeSource)
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
    function append_iFrame(iframeSource, index) {
        var iFrame = createElement("iframe").attr("frameborder", "0").addClass("pageContent row-fluid");
        iFrame.attr("tabIndex", index).attr("src", iframeSource);

        if (index != "0")
            iFrame.addClass("inactiveFrame");

        $("#iFrameContainer").append(iFrame);
    }
    createSidebarTabsAnd_iFrames();



    $("#sidebar-wrapper li").click(function() {
        var listItem = $(this),
            iFrameContainer = $("#iFrameContainer"),
            iframeIndex = listItem.attr("tabIndex");
        iFrameContainer.find("iframe").addClass("inactiveFrame").innerHeight("");
        $("#sidebar-wrapper li").removeClass("active");
        
        var selectedIframe = iFrameContainer.find("iframe[tabIndex='" + iframeIndex + "']");
        if (!selectedIframe.length) {
            selectedIframe = iFrameContainer.find("iframe[tabIndex='0']");
        }
        selectedIframe.removeClass("inactiveFrame").innerHeight($("body").innerHeight());
        listItem.addClass("active")
    });
});