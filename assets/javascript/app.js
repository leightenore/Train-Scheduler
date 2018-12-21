var config = {
    apiKey: "AIzaSyBMSY4A3ldd0Ts-UXttIRhIXwYCO-F2Jn8",
    authDomain: "train-scheduler-cf6a8.firebaseapp.com",
    databaseURL: "https://train-scheduler-cf6a8.firebaseio.com",
    projectId: "train-scheduler-cf6a8",
    storageBucket: "train-scheduler-cf6a8.appspot.com",
    messagingSenderId: "882677479641"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
      };
    
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain)
  );

  $("tbody").append(newRow);
});