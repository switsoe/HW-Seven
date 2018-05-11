var config = {
  apiKey: "AIzaSyDlemo3Ap0ne3LHT2A49EemTSwaC-GqDlE",
  authDomain: "homework7-2c158.firebaseapp.com",
  databaseURL: "https://homework7-2c158.firebaseio.com",
  projectId: "homework7-2c158",
  storageBucket: "homework7-2c158.appspot.com",
  messagingSenderId: "745069601647"
};
firebase.initializeApp(config);


var database = firebase.database();


$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destinationInput = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequencyInput = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrip = {
    train: trainName,
    destination: destinationInput,
    first: firstTrain,
    frequency: frequencyInput
  };

  // Uploads employee data to the database
  database.ref().push(newTrip);

  // Logs everything to console
  console.log(newTrip.train);
  console.log(newTrip.destination);
  console.log(newTrip.first);
  console.log(newTrip.frequency);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destinationInput = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequencyInput = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destinationInput);
  console.log(firstTrain);
  console.log(frequencyInput);

  // Prettify the employee start
  var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var freqMin = moment().diff(moment(firstTrain, "X"), "HH:mm");
  console.log(freqMin);

  // // Calculate the total billed rate
  var minTo = firstTrain - frequencyInput;
  console.log(minTo);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationInput + "</td><td>" +
  firstTrainPretty + "</td><td>" + freqMin + "</td><td>" + frequencyInput + "</td><td>" + minTo + "</td></tr>");

});
