// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

// 1. Creating a new land contract
contract Land_Contract{

    // 2. Declaring our smart contract state variables
    string public landSurvey;
    string public landOwner;
    string public landArea;
    string public landLocation;
    string public landJuris;

    // 3. Creating a set land function
   function setLand( 
       string memory newLandSurvey, 
       string memory newLandOwner, 
       string memory newLandArea,
       string memory newLandLocation,
       string memory newLandJuris
    ) public {
        landSurvey = newLandSurvey;
        landOwner = newLandOwner;
        landArea = newLandArea;
        landLocation = newLandLocation;
        landJuris = newLandJuris;
    }

    // 4. Creating a fetch land function
    function getLand() public view returns (
        string memory, 
        string memory, 
        string memory, 
        string memory,
        string memory
    ){
        return (landSurvey, landOwner, landArea, landLocation, landJuris);
    }
}