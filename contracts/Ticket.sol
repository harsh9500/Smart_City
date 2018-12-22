pragma solidity ^0.4.24;

contract Ticket
{
    
    //uint public ticket=0;
    //bool public ticketAvailabilty=true;
    
    struct Person
    {
        address personId;
        uint balance;
        uint noOfTicketsBooked;
        uint[] ticketArray;
    }
    Person public person1;
    uint startTime;
    mapping(uint => address) public map;
    enum Stage{Init,Reg,Book,Done}
    Stage public stage = Stage.Init;
    
    Person[2000] public persons;
    address[2000] public addrArray;
    uint public registeredPersons = 0;
    
        modifier validStage(Stage reqStage)
    { 
        require(stage == reqStage);
        _;
    }
    function Ticket() public 
    {
         person1.personId=msg.sender;
         person1.balance=0;
         person1.noOfTicketsBooked=25;
         person1.ticketArray.length=25;
         uint i=0;
         while(i<25){
             person1.ticketArray[i]=i;
		map[i]=person1.personId;
             i++;
         }
         startTime = now;
         stage = Stage.Reg;
         
    }
    
function register() public payable
    {
       uint index = 100000000;

       for(uint i = 0;i < registeredPersons;i++)
        {
            if(addrArray[i] == msg.sender)
            {
                index=i;
                break;
            }
           
        }
         if (index!=100000000)
            {
                revert();
            }
        
        if(registeredPersons<100000000)
        {
        persons[registeredPersons].personId=msg.sender;
        addrArray[registeredPersons]=msg.sender;
        persons[registeredPersons].balance=msg.sender.balance/10000000000000000;
        persons[registeredPersons].noOfTicketsBooked=0;
        registeredPersons++;
            if( now > (startTime+ 3000))
            {
                stage=Stage.Book;
                startTime=now;
            }
        }
            else
            {
                revert();
            }
        
        
    }

 

    function bookTicket(uint noOfTickets) public payable
    {
        uint index = 100000000;
        
        if((noOfTickets)<person1.ticketArray.length)
        {
        //ticketAvailabilty=true;
        
        for(uint i = 0;i < registeredPersons;i++)
        {
            if(addrArray[i] == msg.sender)
            {
                index=i;
                break;
            }
           
        }
         if (index==100000000)
            {
                revert();
            }
        
        uint amount=noOfTickets*300;
        
            if(persons[index].balance >= amount)
            {
                persons[index].balance=persons[index].balance-amount;
                person1.balance+=amount;
                persons[index].noOfTicketsBooked+=noOfTickets;
                
                //person1.noOfTicketsBooked-=noOfTickets;
                
                for(uint j=0;j<noOfTickets;j++)
                {
                map[person1.ticketArray[person1.noOfTicketsBooked-1]]=msg.sender;
                persons[index].ticketArray.push(person1.ticketArray[person1.noOfTicketsBooked-1]);
                //ticket++;
                person1.noOfTicketsBooked-=1;
                person1.ticketArray.length-=1;
                }
                /*uint count=0;
                for(uint t=0;t<person1.ticketArray.length;t++){
                    if(person1.ticketArray[t]==0){
                        person1.ticketArray[t]=1;
                        count++;
                        if(count==noOfTickets){
                        break;
                    }
                    }
                    
                   
                }*/
                
                
                
                
        }
            else
            {
                revert();
            }
        }
            
        else
        {
            //ticketAvailabilty=false;
            revert();
        }
    }
    
    function cancelTicket(uint noOfTickets) public payable
    {
        uint index = 100;
        
        for(uint i = 0;i < registeredPersons;i++)
        {
            if(addrArray[i] == msg.sender)
            {
                index=i;
                break;
            }
            
        }
         if (index==100)
            {
                revert();
            }
      
      
            if(persons[index].personId == msg.sender  && persons[index].noOfTicketsBooked>=noOfTickets)
            {
                uint amount = noOfTickets*300;
                uint cancellationFee = amount/10;
                uint finalAmount = amount-cancellationFee;
                persons[index].balance=persons[index].balance+finalAmount;
                person1.balance-=finalAmount;
                for(uint l=0;l<noOfTickets;l++)
                {
                    map[persons[index].ticketArray[persons[index].noOfTicketsBooked-1]]=person1.personId;
                    person1.ticketArray.push(persons[index].ticketArray[persons[index].noOfTicketsBooked-1]);
                    persons[index].noOfTicketsBooked-=1;
                    person1.noOfTicketsBooked+=1;
                }
                
                //ticket-=noOfTickets;
                
                
                persons[index].ticketArray.length-=noOfTickets;
                
                
                /*person1.noOfTicketsBooked+=1;
                ticketAvailabilty=true;*/
            }
             /*  uint coun=0;
                for(uint t=0;t<person1.ticketArray.length;t++)
                {
                    if(person1.ticketArray[t]==1)
                    {
                        person1.ticketArray[t]=0;
                        coun++;
                        if(coun==noOfTickets)
                        {
                        break;
                        }
                    }
                }    */
            else
            {
            revert();
            }
    
        
    }
        
    function transfer(address to , uint noOfTickets) public payable
    {
        address from = msg.sender;
        uint index1 = 100000000 ;
        uint index2 = 100000000;
        
        
        for(uint i = 0;i < registeredPersons;i++)
        {
            if(addrArray[i] == from)
            {
                index1=i;
                break;
            }
        }
        
        for(uint j = 0;j < registeredPersons;j++)
        {
            if(addrArray[j] == to)
            {
                index2=j;
                break;
            }
        }
        
        if (index1==100000000 || index2==100000000)
        {
            revert();
        }
        
        
        uint cost=noOfTickets*300;
        if(persons[index1].noOfTicketsBooked>=noOfTickets && persons[index2].balance>=cost)
        {
        for(uint l=0;l<noOfTickets;l++)
                {
                    map[persons[index1].ticketArray[persons[index1].noOfTicketsBooked-1]]=to;
                    persons[index2].ticketArray.push(persons[index1].ticketArray[persons[index1].noOfTicketsBooked-1]);
                    persons[index2].noOfTicketsBooked+=1;
                    persons[index1].noOfTicketsBooked-=1;
                }
                 persons[index1].balance+=cost;
                 persons[index2].balance-=cost;
                persons[index1].ticketArray.length-=noOfTickets;
        }
        else
        {
            revert();
        }
    }
}