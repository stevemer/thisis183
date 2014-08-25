var _discussionSections = [
	{
		sectionNumber: 1,
		days: ["Tuesday",],
		startTime: "00:09:00",
		endTime: "10:00:00",
		room: "1046 Dana",
	},
];

var _lectureSections = [
	{
		sectionNumber: 1,
		days: ["Monday",],
		startTime: "13:00:00",
		endTime: "14:30:00",
		room: "116 Lorch"
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
    var nameString = this.firstName + " " + this.lastName + ", ";
    if (this.degree)
        nameString += this.degree;
    else
        nameString += this.graduation;

    return nameString;
};
Instructor.prototype.getImagePath = function() {
    return _relativeImagePath + this.imageName;
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

    professors: [,
        Instructor("Mary-Lou", "Dorf", "", [], [], "", "", "", "", [], []),
        Instructor("Jermey", "Gibson", "", [], [], "", "", "", "", [], []),
        Instructor("Bill", "Arthur", "", [], [], "", "", "", "", [], []),
    ],


    GSIs: [
        Instructor("Adam", "Schnitzer", "", [], [], "", "", "", "", [], []),
        Instructor("Anna", "Wasewicz", "", [], [], "", "", "", "", [], []),
        Instructor("Billy", "Wolfington", "", [], [], "", "", "", "", [], []),
        Instructor("Carolyn", "Vlach", "", [], [], "", "", "", "", [], []),
        Instructor("David", "Bonnen", "", [], [], "", "", "", "", [], []),
        Instructor("Diana", "Slaba", "", [], [], "", "", "", "", [], []),
        Instructor("Grace", "Kendall", "", [], [], "", "", "", "", [], []),
        Instructor("Jessica", "Wu", "", [], [], "", "", "", "", [], []),
        Instructor("Lisa", "Dion", "", [], [], "", "", "", "", [], []),
        Instructor("Madeline", "Enders", "", [], [], "", "", "", "", [], []),
        Instructor("Maxim", "Aleksa", "", [], [], "", "", "", "", [], []),
        Instructor("Michael", "Vianueva", "", [], [], "", "", "", "", [], []),
        Instructor("Reed", "Coke", "", [], [], "", "", "", "", [], []),
        Instructor("Ryan", "Cesiel", "", [], [], "", "", "", "", [], []),
        Instructor("Shibamouli", "Lahiri", "", [], [], "", "", "", "", [], []),
        Instructor("Steve", "Merritt", "", [], [], "", "", "", "", [], []),
        Instructor("Tim", "Wurman", "", [], [], "", "", "", "", [], []),
        Instructor("Timothy", "Lewis", "", [], [], "", "", "", "", [], []),
    ]
};