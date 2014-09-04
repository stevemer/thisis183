var _relativeImagePath = "img/staff/",
    _defaultImageName = "default-photo.png",
    _imageExtension = ".jpg",
    _lectureSections = [
        {
            sectionNumber: "001",
            days: ["Monday", "Wednesday"],
            startTime: "08:30:00",
            endTime: "10:00:00",
            room: "1360 EH",
        },
        {
            sectionNumber: "002",
            days: ["Monday", "Wednesday"],
            startTime: "10:30:00",
            endTime: "12:00:00",
            room: "STAMPS",
        },
        {
            sectionNumber: "003",
            days: ["Monday", "Wednesday"],
            startTime: "14:30:00",
            endTime: "16:00:00",
            room: "UMMA AUD",
        },
        {
            sectionNumber: "004",
            days: ["Monday", "Wednesday"],
            startTime: "16:00:00",
            endTime: "17:30:00",
            room: "170 DENN",
        },
    ],
    _discussionSections = [     
        {
            sectionNumber: "011",
            days: ["Tuesday", ],
            startTime: "09:00:00",
            endTime: "10:00:00",
            room: "1046 DANA"
        },
        {
            sectionNumber: "012",
            days: ["Tuesday", ],
            startTime: "12:00:00",
            endTime: "13:00:00",
            room: "506 BMT"
        },
        {
            sectionNumber: "013",
            days: ["Friday", ],
            startTime: "14:00:00",
            endTime: "15:00:00",
            room: "B844 EH"
        },
        {
            sectionNumber: "014",
            days: ["Thursday", ],
            startTime: "12:00:00",
            endTime: "13:00:00",
            room: "2024 DANA"
        },
        {
            sectionNumber: "015",
            days: ["Friday", ],
            startTime: "13:00:00",
            endTime: "14:00:00",
            room: "1028 DANA"
        },
        {
            sectionNumber: "016",
            days: ["Monday", ],
            startTime: "16:00:00",
            endTime: "17:00:00",
            room: "G550 DENT"
        },
        {
            sectionNumber: "017",
            days: ["Wednesday", ],
            startTime: "16:00:00",
            endTime: "17:00:00",
            room: "G550 DENT"
        },
        {
            sectionNumber: "018",
            days: ["Thursday", ],
            startTime: "13:00:00",
            endTime: "14:00:00",
            room: "R0220 BUS"
        },
        {
            sectionNumber: "019",
            days: ["Tuesday", ],
            startTime: "15:00:00",
            endTime: "16:00:00",
            room: "1300 CHEM"
        },
        {
            sectionNumber: "020",
            days: ["Tuesday", ],
            startTime: "16:00:00",
            endTime: "17:00:00",
            room: "G550 DENT"
        },
        {
            sectionNumber: "021",
            days: ["Tuesday", ],
            startTime: "11:00:00",
            endTime: "12:00:00",
            room: "G550 DENT"
        },
        {
            sectionNumber: "022",
            days: ["Tuesday", ],
            startTime: "14:00:00",
            endTime: "15:00:00",
            room: "1024 DANA"
        },
        {
            sectionNumber: "023",
            days: ["Thursday", ],
            startTime: "14:00:00",
            endTime: "15:00:00",
            room: "2548 CCL"
        },
        {
            sectionNumber: "024",
            days: ["Thursday", ],
            startTime: "15:00:00",
            endTime: "16:00:00",
            room: "2330 MH"
        },
        {
            sectionNumber: "025",
            days: ["Friday", ],
            startTime: "10:00:00",
            endTime: "11:00:00",
            room: "B844 EH"
        },
        {
            sectionNumber: "026",
            days: ["Friday", ],
            startTime: "11:00:00",
            endTime: "12:00:00",
            room: "G390 DENT"
        },
        {
            sectionNumber: "027",
            days: ["Wednesday", ],
            startTime: "15:00:00",
            endTime: "16:00:00",
            room: "2255 NQ"
        },
        {
            sectionNumber: "028",
            days: ["Monday", ],
            startTime: "12:00:00",
            endTime: "13:00:00",
            room: "1230 USB"
        },
        {
            sectionNumber: "029",
            days: ["Monday", ],
            startTime: "13:00:00",
            endTime: "14:00:00",
            room: "2009 RUTHVEN"
        },
    ];

// Instrcutor ctor
function Instructor(inFirstName, inLastName, inHasImage, inMajors, inMinors,
					inGradInfo, inDegree, inEmail, inWebsite, inLectures, inDiscussions) {
	this.firstName = inFirstName;
	this.lastName = inLastName;
	this.hasImage = inHasImage;

	this.concentration = {};
	this.concentration.majors = inMajors;
	this.concentration.minors = inMinors;
	this.graduation = inGradInfo;
	this.degree = inDegree;

	this.email = inEmail;
	this.website = inWebsite;

	this.lectures = inLectures;
	this.discussions = inDiscussions;
}

// Adding member functions
Instructor.prototype.getInstructorName = function ()
{
    var nameString = this.firstName + " " + this.lastName;
    if (this.degree)
        nameString += ", " + this.degree;
    else if (this.graduation)
        nameString += ", " + this.graduation;

    return nameString;
};
Instructor.prototype.getImagePath = function ()
{
    if (this.hasImage)
        return _relativeImagePath + this.firstName.toLowerCase().replace(/ /g, "") + "_" + this.lastName.toLowerCase().replace(/ /g, "") + _imageExtension;
    else
        return _relativeImagePath + "default-photo.png";
};
Instructor.prototype.getLectureSections = function ()
{
    var lectures = [];
    for (var i in this.lectures)
    {
        var lectureIndex = this.lectures[i];
        lectures.push(_lectureSections[lectureIndex]);
    }

    // using slice creates a copy preventing modification of
    // original _lectureSections objects
    return lectures.slice(0);
};
Instructor.prototype.getDiscussionSections = function ()
{
    var discussions = [];
    for (var i in this.discussions)
    {
        var discussionIndex = this.discussions[i];
        discussions.push(_discussionSections[discussionIndex]);
    }

    // using slice creates a copy preventing modification of
    // original _discussionSections objects
    return discussions.slice(0);
};


var _instructors = {

    professors: [
        new Instructor("Mary Lou", "Dorf", false, [], [], "", "Ph.D.", "mdorf@umich.edu", "", [1, 2], []),
        new Instructor("Jermey", "Gibson", false, [], [], "", "M.E.T.", "gameprof@umich.edu", "", [0], []),
        new Instructor("Bill", "Arthur", false, [], [], "", "Ph.D. Candidate", "warthur@umich.edu", "", [3], []),
    ],


    GSIs: [
        new Instructor("Adam", "Schnitzer", false, ["Computer Science"], [], "W'15", "", "adamschn@umich.edu", "https://adamschnitzer.com", [], []),
        new Instructor("Anna", "Wasewicz", false, ["Computer Science"], [], "W'16", "", "wasewicz@umich.edu", "", [], [16]),
        new Instructor("Billy", "Wolfington", false, ["Computer Science"], [], "W'15", "", "willwolf@umich.edu", "", [], [0]),
        new Instructor("Carolyn", "Vlach", false, ["Computer Science", "Discrete and Algorithmic Methods", "Spanish"], [], "W'15", "", "vlachcj@umich.edu", "", [], [11]),
        new Instructor("David", "Bonnen", false, ["Computer Science", "Statistics", ], [], "W'15", "", "dbonnen@umich.edu", "", [], [1]),
        new Instructor("Diana", "Slaba", false, ["Computer Science"], [], "W'16", "", "dkslaba@umich.edu", "", [], [6]),
        new Instructor("Grace", "Kendall", false, ["Computer Science"], ["Music"], "W'16", "", "grackend@umich.edu", "", [], [5]),
        new Instructor("Jessica", "Wu", false, ["Computer Science"], ["Japanese", "Physics"], "W'16", "", "jesswu@umich.edu", "", [], [13]),
        new Instructor("Lisa", "Dion", false, ["Computer Science"], [], "2nd year Ph.D.", "", "lisadion@umich.edu", "", [], [2]),
        new Instructor("Madeline", "Andrew", false, ["Computer Science"], [], "W'16", "", "madclare@umich.edu", "https://github.com/madclare", [], [15]),
        new Instructor("Madeline", "Enders", false, ["Computer Science", "Cello Performance"], [], "W'17", "", "endremad@umich.edu", "", [], [10]),
        new Instructor("Maxim", "Aleksa", false, ["Computer Science", "Romance Languages and Literatures",], [], "W'17", "", "maximal@umich.edu", "http://umich.edu/~maximal", [], [7]),
        new Instructor("Mike", "Vianueva", false, ["Computer Science", "History"], ["German"], "W'15", "", "vianuevm@umich.edu", "https://github.com/vianuevm", [], [12]),
        new Instructor("Reed", "Coke", false, ["Computer Science", "Linguistics"], [], "2nd year Ph.D.", "", "reedcoke@umich.edu", "", [], [3]),
        new Instructor("Ryan", "Cesiel", false, ["Computer Science", "BBA",], [], "W'16", "", "ryances@umich.edu", "", [], [14]),
        new Instructor("Shibamouli", "Lahiri", false, ["Computer Science"], [], "1st year Ph.D.", "", "lahiri@umich.edu", "", [], [4, 9]),
        new Instructor("Steve", "Merritt", false, ["Computer Science"], [], "W'15", "", "stevemer@umich.edu", "https://github.com/stevemer", [], []),
        new Instructor("Tim", "Wurman", false, ["Computer Science"], [], "W'15", "", "twurman@umich.edu", "", [], [18]),
        new Instructor("Tim", "Lewis", false, ["Computer Science"], [], "1st year Ph.D.", "", "timlewis@umich.edu", "", [], [17, 8]),
    ],
};


// keep instructors in sorted order for the page
_instructors.GSIs.sort(function(a, b)
{
    if (a.firstName > b.firstName)
        return 1;
    else if (a.firstName < b.firstName)
        return -1;
    else
    {
        if (a.lastName > b.lastName)
            return 1;
        else
            return -1;
    }
});



