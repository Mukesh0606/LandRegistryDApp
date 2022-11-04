// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    // Model the candidate
    struct Candidate {
        uint id;
        string name;
        uint votecount;
    }
    // Store accounts that have voted
    mapping(address => bool) public voters;

    // store Candidates
    mapping (uint => Candidate) public candidates;

    // fetch Candidates

    // Candidates count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    // Store candidate
    // Read candidate
    //string public candidate;
    // Constructor
    constructor() {
        addCandidates("Candidate 1");
        addCandidates("Candidate 2");        
    }

    function addCandidates (string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        // record that voter has voted
        voters[msg.sender] = true;
        // update candidate vote Count
        candidates[_candidateId].votecount++;

        // trigger voted event
        // votedEvent(_candidateId);
        // emit votedEvent(_candidateId);
    }

}