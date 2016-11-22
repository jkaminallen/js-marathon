var launchpad; //hoisting these to the top
var crewNames;
var crewMembers;
var trainCrew;
var rocket;
var fleet;

rocket = { //object literal
  fuel: 0, //adding fuel, which starts at 0 DONT FORGET COMMA
  addFuel: function(fuelAmount) { //function that accepts an integer
    this.fuel += fuelAmount;
    console.log("Our rocket has " + this.fuel + " of fuel");
  },
  fire: function() {
    if(this.fuel > 0) { //if the property is greater than or equal to zero
      this.fuel -= 1; //subtracting
      console.log("The engines have fired up!"); //if it has fuel, we can start it!
      console.log("The current fuel count is " + this.fuel); //printing the amount of fuel;
      return true; //because we have fuel
    }
    else { //if there isn't fuel
      console.log("The engines have failed to fire");
      return false;
    }
  }
}

trainCrew= function(crewList) {
  var trainedCrewList = []; //creating array
  for(var i = 0; i < crewList.length; i++) {
    trainedCrewList.push(new CrewMember(crewList[i])); //putting the crew members into the array
    trainedCrewList[i].trained = true; //making the trained attribute true
  }
  return trainedCrewList //returning our array now
}

crewNames = ["Jon", "John", "Jonah", "Akanksha"] //making an array of names here

function CrewMember(name) { //another constructor function, like below
  this.name = name;
  this.trained = false;
}

function Ship(name) {//function that is a constructor with argument (class constructor)
  this.name = name;
  this.crew = []; //our crew array, default value of empty
  this.propulsion = null; //added property
}

Ship.prototype.loadCrew = function(crewMembers) {
  for(var i = 0; i < crewMembers.length; i++) {
    this.crew.push(crewMembers[i]); //after iterating, we are now adding the members to the crew array
    console.log("Welcome " + crewMembers[i].name); //output the names
  }
}

Ship.prototype.captain = function() {
  var crewCount = this.crew.length; //total amount of people in the crew
  return this.crew[Math.floor(Math.random() * crewCount)]; //helps us randomly choose a crew member
}

Ship.prototype.mountPropulsion = function(unmountedPropulsion) {
  this.propulsion = unmountedPropulsion; //turning null to mounted
  console.log("The propulsion mounted");
}

Ship.prototype.takeoff = function() { //adding a taking function to the ships prototype
  if(this.propulsion.fire()) { //calling on fire function like if it was true
    console.log("BRRRBRMMMBRMMMMMRRRBBBRMMMM");
  }
  else { //fire function didn't work
    console.log("oh noooooooooo, failed.");
  }
}

var ourShip = new Ship("MakeCodingGreatAgain"); //using Ship constructor, we are making a new object
crewMembers = trainCrew(crewNames); //starting to create an array to load trained crew into

launchpad = function(ship, crewMembers, propulsion) { //creation of function // then adding arguments
  console.log("Prepare to launch!");
  console.log(ship.name + " is getting ready to launch!");
  ship.loadCrew(crewMembers); //lets us print the loadCrew prototype
  var captain = ourShip.captain();
  console.log("Our captain is " + captain.name); //now we can print the captain name
  ship.mountPropulsion(propulsion); //mounting the rocket
  rocket.addFuel(500);
  ship.takeoff();
}

fleet = {
  ships: [], //ships property defaulted to an empty array
  name: "Some stuff fleet", //name of my choosing
  build: function(shipNames) {
    for (var i = 0; i < shipNames.length; i++) {
      var newShip = new Ship(shipNames[i]); //taking in an array of ship names and createst new ship objects
      this.ships.push(newShip);
      console.log("Welcome to " + this.name + ", " + newShip.name)
    }
  }
}

launchpad(ourShip, crewMembers, rocket); //passing in objects that we are calling on
fleet.build(["Planet Express", "Stargate", "Millenium Falcon"]);
