pragma solidity ^0.5.0;

/*We are creating our contract Poll Creation as outlined in our Project Proposal
*/
contract PollCreation{
//This struct represents the information we need to have for Voters in our Polling decentralized application
    struct Voter{
        bool voted; //Has this voter already voted?
        uint vote; //which poll voted on
        bool canVote; //Can this user vote on poll
    }
    
    //Creating the polls to be voted on
    struct Poll{
        bytes32 pollName; //Small Poll size names
        uint voteCount; //number of votes
    }
    
    
    //------------------------State Variables-------------------------
	//Creator of the contract. Will be used to set limits on fuction usage.
    address public pollOwner;
    uint public pollVotingStarts;
    //Amount of time the poll will be open for. Initialized in PollCreation constructor below.
    uint public timeAlottedForVoting;
    //Status of the Poll created
    string public pollStatus;
	string public pollName;
    //Checks if poll is open or not
    bool pollEnded;
    //For Voters 
    mapping(address => Voter) public voters;
    //For Polls
    mapping(uint => Poll) public polls;
    //Count the number of voters
    uint public numberofVoters;
    //Count number of Polls created
    uint public numberofPolls;
    
	
	//The modifier allows us to check for condition before executing a function
	//This modifier will only allow the Poll Creator to execute the functions
	
	modifier pollCreator()
	{
	    //Will not steal gas , more forgiving. Refunds gas.
		require(msg.sender == pollOwner);
		_; //Represents the rest of the code being ran
		
	}
	
	constructor(bytes32[] memory nameOfPolls, uint _timeAlottedForVoting) public{
	    //The owner of the poll is person who initiatied this contract
	    pollOwner = msg.sender;
	    //Give the creator the the poll the right to vote
	    voters[pollOwner].canVote = true;
	    //Begin the poll timer
	    pollVotingStarts = now;
	    //Retrieve value from the constructor
	    timeAlottedForVoting = _timeAlottedForVoting;
	    //Count number of polls created'
	    numberofPolls = nameOfPolls.length;
	    //Create poll status
	    pollStatus = "Open for Voting";
	    //Set pollEnded boolean value
	    pollEnded = false;
	    numberofVoters = 0;
	    
	    for(uint i=0; i<nameOfPolls.length; i++){
	        Poll memory p = polls[i];
	        p.pollName = nameOfPolls[i];
	        p.voteCount = 0;
	    }
	    
	}
	
	function getPollStatus() view public returns(string memory) {
		return pollStatus;
	}

	function setPollStatus(string memory _pollStatus) public {
		pollStatus = _pollStatus;
	}

	function getPollName() view public returns(string memory) {
		return pollName;
	}

	function setPollName(string memory _pollName) public {
		pollName = _pollName;
	}

	//Change address voter to an array I can pass? Maybe add a paramter to voter to classify?
	function RightToVote(address voter) public pollCreator(){
	    voters[voter].canVote = true;
	}
	
	function vote(uint poll) public{
	    //Ensure that the poll hasn't ended. Maybe add in the poll ended boolean?
	    if (now > pollVotingStarts + timeAlottedForVoting){
	        revert();
	    }
	    //Record the person who has voted
	    Voter storage userVoting = voters[msg.sender];
	    
	    if(userVoting.voted){
	        //Do not Allow double voting
	        revert();
	    }
	    userVoting.voted = true;
	    userVoting.vote = poll;
	    
	    polls[poll].voteCount+1;
	}
	
	function returnWinningPoll() view public
	    returns(uint winningPoll, bytes32 nameofPolls)
	
	{//Check voting has ended.
	if(now <= pollVotingStarts + timeAlottedForVoting) revert(); //If it hasn't throw error
	
	uint winningPollByVoteCount;
	for(uint x=0; x< numberofPolls;x++){
	    if(polls[x].voteCount> winningPollByVoteCount){
	        winningPollByVoteCount = polls[x].voteCount;
	        winningPoll = x;
	        nameofPolls = polls[x].pollName;
	    }
	}
	
	
	}
	
}
