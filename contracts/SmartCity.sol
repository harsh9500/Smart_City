pragma solidity ^0.4.17;

contract SmartCity
{
    struct Person
    {
        address personId;
        string person_name;
        uint balance;
        string[] rc_ids;
    }
    
    struct rc
    {
        address ownerId;
        string owner_name;
        uint ownership;
        string car_registration_number;
        string maker_model;
        string datetoday;
        string chassis_number;
    }
    
    mapping (uint => rc) public rc_arr;
    uint public noofcars;

    event cars (
        uint indexed price
    );

    Person public buyer;
    Person public seller;
    
    
    struct globalVehicles
    {
        string rc_id;
        uint selling_price;
        address buyer_id;
        address seller_id;
    }
    
    globalVehicles[] public vehicle_Arr;
    
    function SmartCity() public
    {
        seller.personId=msg.sender;
        seller.balance=500000;
        seller.person_name="xyz";
        buyer.personId=0x397B77A261B9480235A46D92b5D57db35cF069ef;
        buyer.balance=5000000;
        buyer.person_name="abc";
    
        rc memory Vehicle1;
        rc memory Vehicle;
        Vehicle1.ownerId=msg.sender;
        Vehicle1.owner_name="xyz";
        Vehicle1.ownership=1;
        Vehicle1.car_registration_number="MH 01 CP 7196";
        Vehicle1.maker_model="Hyundai Elite i20";
        Vehicle1.datetoday="12/10/2018";
        Vehicle1.chassis_number="ABCD1234";
        rc_arr[0]=Vehicle1;
        seller.rc_ids.push("ABCD1234");
        Vehicle.ownerId=msg.sender;
        Vehicle.owner_name="xyz";
        Vehicle.ownership=1;
        Vehicle.car_registration_number="MH 01 CP 7907";
        Vehicle.maker_model="Hyundai Eon";
        Vehicle.datetoday="12/10/2018";
        Vehicle.chassis_number="PQRS1234";
        rc_arr[1]=Vehicle;
        seller.rc_ids.push("PQRS1234");
        noofcars=2;
    }
    
    function sell(string rc_id, uint selling_price, address buyer_id ) public payable
    {
        bool flag=false;
        if(seller.personId!=msg.sender)
        {
            revert();
        }
        else
        {
        for(uint i=0;i<seller.rc_ids.length;i++)
        {
            if(keccak256(seller.rc_ids[i])==keccak256(rc_id))
            {
                flag=true;
                break;
            }
        }
        if(flag==true)
        {
         globalVehicles memory g;
         g.rc_id=rc_id;
         g.selling_price=selling_price;
         g.buyer_id=buyer_id;
         g.seller_id=msg.sender;
         vehicle_Arr.push(g);
        
                 }
        else
        {
            revert();
        }
    }
}
    
    function buy(string rc_id, address seller_id, uint price) public payable
    {
        uint n;
        bool flag=true;
        for(uint i=0;i<vehicle_Arr.length;i++)
        {
            if((keccak256(rc_id)==keccak256(vehicle_Arr[i].rc_id)) 
            && (seller_id==vehicle_Arr[i].seller_id)
            && (msg.sender==vehicle_Arr[i].buyer_id)
            && (price==vehicle_Arr[i].selling_price))
            {
                
                flag=false;
                n=i;
                break;
            }
        }
        if (flag==false)
        {
            
            buyer.balance-=price;
            
            uint j;
            for ( j=0;j<seller.rc_ids.length;j++)
            {
                if(keccak256(seller.rc_ids[j])==keccak256(rc_id))
                {
                seller.rc_ids[j] = seller.rc_ids[seller.rc_ids.length-1];
                seller.rc_ids.length--;
                break;
                }
            
            }
            //
            uint k=0;
            buyer.rc_ids.push(rc_id);
            seller.balance+=price;
            for(k=0;k<noofcars;k++)
            {
                if(keccak256(rc_arr[k].chassis_number)==keccak256(rc_id))
                {
                    break;
                }
            }
            rc_arr[k].ownerId=msg.sender;
            rc_arr[k].owner_name="abc";
            rc_arr[k].ownership+=1;
            vehicle_Arr[n] = vehicle_Arr[vehicle_Arr.length - 1];
            vehicle_Arr.length--;
            // cars(price);
        }
        else
        {
            revert();
        }
    }
    
}