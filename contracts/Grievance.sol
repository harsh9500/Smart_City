pragma solidity 0.4.24;

contract Grievance {

   struct assigned_ministry {

        address addr;
        uint fund;
    }
     
    assigned_ministry public ministry;

    struct Problem {
        uint id;
        string name;
        uint count;
        bool b;
        uint fund;
    }

    event votedEvent (
        uint indexed _nos
    );

    uint public problemCount;
    mapping(address => Problem[3]) public citizens;
    mapping(uint => Problem) public Problems;
    uint public govt_fund;


    function Grievance () public {

        addProblem("Potholes Menace");
        addProblem("Floodlights Malfunction");
        addProblem("Mosquito Problem");
        ministry.fund=50000;
        govt_fund=ministry.fund;
        
    }

    function addProblem (string _name) private {

        problemCount ++;
        Problems[problemCount] = Problem(problemCount, _name, 0,false,0);

    }

    function vote (uint _nos) public {
       
       citizens[msg.sender][_nos]=Problems[_nos];
       require(!citizens[msg.sender][_nos].b);
       require(_nos > 0 && _nos <= problemCount);
       citizens[msg.sender][_nos].b = true;
       Problems[_nos].count ++;
       if(Problems[_nos].count>=2){
            Problems[_nos].fund=govt_fund/5;
            ministry.fund-Problems[_nos].fund;
            Problems[_nos].b=true;
       
       }    
       //votedEvent(_nos);
    }
}