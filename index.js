var instructionData = [0,1];
var trainingIteration = 1000;

// Training data
// every state can be active/inactive - so it needs to have 0 or 1 values
// we wanna train our dog to respond to three different actions, so we must
// have three different states defined
var dogInstructions = [
  {
    input: [1, 0],        // PET active, WHISTLE inactive
    output: [1, 0, 0],    // SIT active, BARK and ROLL inactive
  },
  {
    input: [0, 1],        // PET inactive, WHISTLE active
    output: [0, 1, 0],    // SIT inactive, BARK active, ROLL inactive
  },
  {
    input: [1, 1],        // PET and WHISTLE active
    output: [0, 0, 1],    // SIT and BARK inactive, ROLL active
  },
];

// Learning rate
// slow learning is very accurate and fast learning usually unpredictable
var learningRate = 0.4;

function handleInstruction(instruction) {
  document.getElementById('results').innerHTML = '';
  instructionData = instruction;
  trainingIteration = document.getElementById('iterations').value;
  activateNeuralNetwork();
}

function activateNeuralNetwork() {
  // Neural Network
  var input = new synaptic.Layer(2); // Two inputs
  var output = new synaptic.Layer(3); // Three inputs
  input.project(output); // Connect input to output

  console.log("Neural Network has been activated!")

  function train() {
    for (var i = 0; i < dogInstructions.length; i++) {
      input.activate(dogInstructions[i]["input"]);
      output.activate();
      output.propagate(learningRate, dogInstructions[i]["output"]);
    }
  }
  // We need to train more than once in order to improve accuracy
  function retrain() {
    console.log(trainingIteration)
    for(var i = 0; i < trainingIteration; i++) {
      train();
    }
  }

  retrain(); // Start the training


  input.activate(instructionData); // WHISTLE
  var result = output.activate();

  console.log("SIT Neuron: " + result[0] * 100 + "%");
  console.log("BARK Neuron: " + result[1] * 100 + "%");
  console.log("ROLL Neuron: " + result[2] * 100 + "%");

  document.getElementById('results').innerHTML +=
    "<p>SIT Neuron: " + result[0] * 100 + "%</p>" +
    "<p>BARK Neuron: " + result[1] * 100 + "%</p>" +
    "<p>ROLL Neuron: " + result[2] * 100 + "%</p>";
}
