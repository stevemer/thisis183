var _relativeImagePath = "../img/staff/",
    _useDefaultImage = true,
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
            room: "ARR"
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
    ];

// Instrcutor ctor
function Instructor(inFirstName, inLastName, inImageName, inMajors, inMinors,
					inGradInfo, inDegree, inEmail, inWebsite, inLectures, inDiscussions) {
	this.firstName = inFirstName;
	this.lastName = inLastName;
	this.imageName = inImageName;

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
    var image = this.imageName;
    if (!image)
        image = "default-photo.png";
    return _relativeImagePath + image;
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
        new Instructor("Mary-Lou", "Dorf", "mdorf.jpg", [], [], "", "Ph.D.", "mdorf@umich.edu", "http://www.eecs.umich.edu/eecs/etc/fac/facsearchform.cgi?mdorf+", [1, 2], []),
        new Instructor("Jermey", "Gibson", "", [], [], "", "", "", "", [0], []),
        new Instructor("Bill", "Arthur", "", [], [], "", "", "", "", [3], []),
    ],


    GSIs: [
        new Instructor("Adam", "Schnitzer", "", [], [], "", "", "", "", [], []),
        new Instructor("Anna", "Wasewicz", "", [], [], "", "", "", "", [], []),
        new Instructor("Billy", "Wolfington", "", ["Computer Science"], [], "W'14", "", "willwolf@umich.edu", "", [], []),
        new Instructor("Carolyn", "Vlach", "", [], [], "W'14", "", "", "", [], []),
        new Instructor("David", "Bonnen", "", [], [], "", "", "", "", [], []),
        new Instructor("Diana", "Slaba", "", [], [], "", "", "", "", [], []),
        new Instructor("Grace", "Kendall", "", [], [], "W'15", "", "", "", [], []),
        new Instructor("Jessica", "Wu", "", [], [], "W'15", "", "", "", [], []),
        new Instructor("Lisa", "Dion", "", [], [], "", "", "", "", [], []),
        new Instructor("Madeline", "Enders", "", [], [], "", "", "", "", [], []),
        new Instructor("Maxim", "Aleksa", "", [], [], "", "", "", "", [], []),
        new Instructor("Michael", "Vianueva", "", [], [], "", "", "", "", [], []),
        new Instructor("Reed", "Coke", "", [], [], "", "", "", "", [], []),
        new Instructor("Ryan", "Cesiel", "", [], [], "", "", "", "", [], []),
        new Instructor("Shibamouli", "Lahiri", "", [], [], "", "", "", "", [], []),
        new Instructor("Steve", "Merritt", "", [], [], "W'14", "", "", "", [], []),
        new Instructor("Tim", "Wurman", "", [], [], "W'14", "", "", "", [], []),
        new Instructor("Timothy", "Lewis", "", [], [], "", "", "", "", [], []),
    ],
};