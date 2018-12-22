pragma solidity ^0.4.17;
contract Auction {
    
    
    struct Item {
        uint itemId; 
        
        uint currentbid; 
        uint baseprice;
        uint[] itemTokens;  
    }
    
    struct Person {
        uint remainingTokens;
        uint personId;
        address addr;
        bool registered;
    }
    uint public flag=0;
    mapping(address => Person) tokenDetails;
    Person [4] bidders;
    
    Item [3] public items;
    address[3] public winners;
    address public beneficiary;
    
    uint public bidderCount=0;

    event win (
        uint indexed id
        );

    function Auction() public payable{    
        beneficiary=msg.sender;

        uint[] memory emptyArray;
        items[0] = Item(0,0,3500,emptyArray);
        items[1] = Item(1,0,8100,emptyArray);
        items[2] = Item(2,0,6900,emptyArray);
    }
    

    function register() public payable{
        
        bidders[bidderCount].personId = bidderCount;
        
        bidders[bidderCount].addr=msg.sender;
        
        bidders[bidderCount].remainingTokens = 50000; 
        tokenDetails[msg.sender]=bidders[bidderCount];
        bidderCount++;

    }
    
    function bid(uint _itemId, uint _count) public payable{
         uint i;
        // for(i=0;i<4;i++){
        //     if(msg.sender==bidders[i].addr)
        //         break;
        //     }
        // if(i==4){
        //     register();
        // }


        if(flag==1 || tokenDetails[msg.sender].remainingTokens == 0 || tokenDetails[msg.sender].remainingTokens < _count || _itemId > 2 || _count<items[_itemId].currentbid || _count<items[_itemId].baseprice || beneficiary==msg.sender)
        {
            revert();
        }
        
        uint balance=tokenDetails[msg.sender].remainingTokens - _count;
        
        items[_itemId].currentbid=_count;
        tokenDetails[msg.sender].remainingTokens=balance;
        bidders[tokenDetails[msg.sender].personId].remainingTokens=balance;//updating the same balance in bidders map.
        
        Item storage bidItem = items[_itemId];
        for( i=0; i<_count;i++) {
            bidItem.itemTokens.push(tokenDetails[msg.sender].personId);    
        }
    }


    modifier onlyOwner {
        require(beneficiary == msg.sender);
        _;
    }
    
    
    function revealWinners() public onlyOwner{
        
        
        for (uint id = 0; id < 3; id++) {
            Item storage currentItem=items[id];

            if(currentItem.itemTokens.length != 0){

            uint randomIndex = (block.number / currentItem.itemTokens.length)% currentItem.itemTokens.length; 
            uint winnerId = currentItem.itemTokens[randomIndex];
            winners[id]=bidders[winnerId].addr;
                
            }
        }
        flag=1;
        win(flag);
    } 

}
