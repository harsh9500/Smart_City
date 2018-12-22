pragma solidity 0.4.24;

contract Bill {
    
   struct building{
        uint id;
        uint tank_capacity;
        uint balance;
        uint billamount;
    }
    
    mapping(uint=>building) public Buildings;

    uint public buildingcount;

    event calculated (
        uint indexed _id
    );

    function Bill() public {
        addBuilding(50,10000,2000);
        addBuilding(60,10000,3000);
        addBuilding(70,10000,4000);
        }

    function addBuilding (uint _capacity, uint _balance, uint _amount) private {
        buildingcount ++;
        Buildings[buildingcount] = building(buildingcount,_capacity,_balance,_amount);
    }

    function calculate (uint i, uint capacity, uint quality) public {
            uint amount=0;
            uint capfactor=(Buildings[i].tank_capacity-capacity)*20;
            uint qfactor=(400-quality)*2;
            if(capfactor>0)
            {
                amount+=capfactor;
            }
            if(qfactor>0)
            {
                amount+=qfactor;
            }
            amount=Buildings[i].billamount-amount;
            Buildings[i].balance-=amount;
    }
    function call() public {
        calculate(1,30,450);
        calculate(2,50,350);
        calculate(3,69,400);
        calculated(1);
    }

}