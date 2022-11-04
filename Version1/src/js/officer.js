// 1. Declare global variable to store the web3 instance
let LandContract;

// 2. Set contract address and ABI
const Land_Contract_Address = "0xa66507d1af50b238c114E466FD243Eefbf303BF0";
const Land_Contract_ABI = [
    {
        "inputs": [],
        "name": "landArea",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "landJuris",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "landLocation",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "landOwner",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "landSurvey",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "newLandSurvey",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "newLandOwner",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "newLandArea",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "newLandLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "newLandJuris",
            "type": "string"
          }
        ],
        "name": "setLand",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getLand",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
];

/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum);
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of land smart contract */
    LandContract = new ethers.Contract(
      Land_Contract_Address,
      Land_Contract_ABI,
      signer
    );
  });
});

// 4. Creating variables for reusable dom elements
const landFormSection = document.querySelector(".land-form-section");
const showLandFormBtn = document.querySelector(".show-land-form-btn");
const landSection = document.querySelector(".land-detail-section");
const setLandButton = document.querySelector("#set-new-land");
const refreshBtn = document.querySelector(".refresh-land-details-btn");

/* 5. Function to set land details */
const setNewLand = () => {
  // update button value
  setLandButton.value = "Setting Land...";

  /* 5.1 Get inputs from land form */
  const landSurveyInput = document.querySelector("#survey-number");
  const landOwnerInput = document.querySelector("#owner-name");
  const landAreaInput = document.querySelector("#area-sq-ft");
  const landLocationInput = document.querySelector("#location");
  const landJurisInput = document.querySelector("#jurisdiction");
  // 5.2 Getting values from the inputs
  landSurvey = landSurveyInput.value;
  landOwner = landOwnerInput.value;
  landArea = landAreaInput.value;
  landLocation = landLocationInput.value;
  landJuris = landJurisInput.value;

  /* 5.3 Set land details in smart contract */
  LandContract.setLand(landSurvey, landOwner, landArea, landLocation, landJuris)
    .then(() => {
      // update button value
      setLandButton.value = "Land Set...";

      /* 5.4 Reset form */
      landSurveyInput.value = "";
      landOwnerInput.value = "";
      landAreaInput.value = "";
      landLocationInput.value = "";
      landJurisInput.value = "";

      // update button value
      setLandButton.value = "Set Land";

      /* 5.5 Get Land details from smart contract */
      getCurrentLand();
    })
    .catch((err) => {
      // If error occurs, display error message
      setLandButton.value = "Set Land";
      alert("Error setting land details" + err.message);
    });
};

/* Function to set land details on click of button */
setLandButton.addEventListener("click", setNewLand);

/* 6. Function to get land details */
const getCurrentLand = async () => {
    setLandButton.value = "Getting Land...";

    /* 6.1 Get land details from smart contract */
    LandContract.getLand().then( land => {
    
        /* 6.2 Display the land details section
        6.2.1 Hide the land form in DOM */
        landSection.style.display = "block";
        landFormSection.style.display = "none";
    
        /* 6.3 Land is an array of 3 strings [landSurvey, landOwner, landArea, landLocation, landJuris] */
        const landSurvey = land[0];
        const landOwner = land[1];
        const landArea = land[2];
        const landLocation = land[3];
        const landJuris = land[4];
        
        /* 6.4 Display land details in DOM */
        document.querySelector(".land-detail-survey").innerText = landSurvey;
        document.querySelector(".land-detail-owner").innerText = landOwner;
        document.querySelector(".land-detail-area").innerText = landArea;
        document.querySelector(".land-detail-location").innerText = landLocation;
        document.querySelector(".land-detail-jurisdiction").innerText = landJuris;
        })
    // /* 6.1 Get land details from smart contract */
    // const land = await LandContract.getLand();
    // console.log(land)
    // /* 6.2 Display the land details section
  
    //  6.2.1 Hide the land form in DOM */
    // landSection.style.display = "block";
    // landFormSection.style.display = "none";
  
    // /* 6.3 Land is an array of 3 strings [landSurvey, landOwner, landArea, landLocation, landJuris] */
    // const landSurvey = land[0];
    // const landOwner = land[1];
    // const landArea = land[2];
    // const landLocation = land[3];
    // const landJuris = land[4];
    
    // /* 6.4 Display land details in DOM */
    // document.querySelector(".land-detail-survey").innerText = landSurvey;
    // document.querySelector(".land-detail-owner").innerText = landOwner;
    // document.querySelector(".land-detail-area").innerText = landArea;
    // document.querySelector(".land-detail-location").innerText = landLocation;
    // document.querySelector(".land-detail-jurisdiction").innerText = landJuris;
  };

  /* 7. Function to show the land form on click of button */
showLandFormBtn.addEventListener("click", () => {
    landSection.style.display = "none";
    landFormSection.style.display = "block";
    setLandButton.value = "Submit";
  });
  
  /* 8. Function to refresh land details */
  refreshBtn.addEventListener("click", (e) => {
    e.target.innerText = "Refreshing...";
    getCurrentLand().then(() => {
      e.target.innerText = "Refreshed";
      setTimeout(() => {
        e.target.innerText = "Refresh";
      }, 2000);
    });
  });


  function openSection(sectionName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    // Show the specific tab content
    document.getElementById(sectionName).style.display = "block";
  
    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();


  var subjectObject = {
    "Front-end": {
      "HTML": ["Links", "Images", "Tables", "Lists"],
      "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
      "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Back-end": {
      "PHP": ["Variables", "Strings", "Arrays"],
      "SQL": ["SELECT", "UPDATE", "DELETE"]
    }
  }
  window.onload = function() {
    var areaSel = document.getElementById("area-sq-ft");
    var locationSel = document.getElementById("location");
    var jurisSel = document.getElementById("jurisdiction");
    for (var x in subjectObject) {
      areaSel.options[areaSel.options.length] = new Option(x, x);
    }
    areaSel.onchange = function() {
      //empty location- and jurisdiction- dropdowns
      locationSel.length = 1;
      jurisSel.length = 1;
      //display correct values
      for (var y in subjectObject[this.value]) {
        jurisSel.options[jurisSel.options.length] = new Option(y, y);
      }
    }
    jurisSel.onchange = function() {
      //empty location dropdown
      locationSel.length = 1;
      //display correct values
      var z = subjectObject[areaSel.value][this.value];
      for (var i = 0; i < z.length; i++) {
        locationSel.options[locationSel.options.length] = new Option(z[i], z[i]);
      }
    }
  } 

