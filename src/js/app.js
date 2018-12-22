App4 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App4.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      App4.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      
      App4.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App4.web3Provider);
    }
    return App4.initContract();
  },

  initContract: function() {
    $.getJSON("Auction.json", function(auction) {
      
      App4.contracts.Auction = TruffleContract(auction);
      
      App4.contracts.Auction.setProvider(App4.web3Provider);

      // App4.listenForEvents();

      return App4.render();
    });
  },

  
  listenForEvents: function() {
    App4.contracts.Auction.deployed().then(function(instance) {
      // Restart Chrome if unable to receive this event
      instance.win({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
      
        App4.render();
      });
    });
  },

  render: function() {
    var Instance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App4.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App4.contracts.Auction.deployed().then(function(instance) {
      
      var t = $("#base_price");
      var tw = $("#current_bid");
      for (var i = 0; i< 3; i++) {
        instance.items(i).then(function(it) {
          console.log(it); 
            id=it[2];
            id2=it[1];
            var Template = "<td>Base Price = " + id + "</td>";
            var Template2 = "<td>Current Bid = " + id2 + "</td>";
          
          t.append(Template);            
          tw.append(Template2);            
          console.log(tw);
          
        
        });
      
      }
      
  });

      loader.hide();
      content.show();
   },


   register:function(){

    var loader = $("#loader");
    var content = $("#content");

    App4.contracts.Auction.deployed().then(function(instance) {
      return instance.register({ from: App4.account });
    }).then(function(result) {


    // loader.show();
    // content.hide();

    }).catch(function(err) {
      console.error(err);
    });
    
   },

    biditem1:function(){
    
    var bid=$('#field1').val();
  console.log("bid 1");
  console.log(bid);

    App4.contracts.Auction.deployed().then(function(instance) {
      
      return instance.bid(0,bid,{ from: App4.account }).then(function(result) {
       // $("#content").hide();
       // $("#loader").show();

    }).catch(function(err) {
       console.error(err);
       });
     });
      
      },

biditem2:function(){
    
    var bid=$('#field2').val();
  console.log("bid 2");
  console.log(bid);

    App4.contracts.Auction.deployed().then(function(instance) {
      
      return instance.bid(1,bid,{ from: App4.account }).then(function(result) {
       $("#content").hide();
       $("#loader").show();

    }).catch(function(err) {
       console.error(err);
       });
     });
      
      },

biditem3:function(){
    
    var bid=$('#field3').val();
  console.log("bid 3");
  console.log(bid);  
  

    App4.contracts.Auction.deployed().then(function(instance) {
      
      return instance.bid(2,bid,{ from: App4.account }).then(function(result) {
       $("#content").hide();
       $("#loader").show();

    }).catch(function(err) {
       console.error(err);
       });
     });
      
      },

winners:function(){
    
    
    App4.contracts.Auction.deployed().then(function(instance) {
      
      return instance.revealWinners().then(function(result) {
       $('#field1').hide();
       $('#field2').hide();
       $('#field3').hide();
       $('#sub1').hide();
       $('#sub2').hide();
       $('#sub3').hide();
       str = '';
       for(var i=0; i<3; i++)
       {
          App4.contracts.Auction.deployed().then(function(instance) {
            instance.winners[i].then(function(k){
              str += '<h4 style="text-center"> Article ' + (i+1).toString() + ' Winner is ' + k + '</h4></br>';
            })
          });

       }
       $('#winnerSection').append(str);
       $("#content").hide();
       $("#loader").show();

    }).catch(function(err) {
       console.error(err);
       });
     });
      
      },



};//End of App4 Object

App3 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',


  init: function() {
    return App3.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      App3.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      
      App3.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App3.web3Provider);
    }
    return App3.initContract();
  },

  initContract: function() {
    $.getJSON("Bill.json", function(bill) {
      
      App3.contracts.Bill = TruffleContract(bill);
      
      App3.contracts.Bill.setProvider(App3.web3Provider);

      App3.listenForEvents();

      return App3.render();
    });
  },

  
  listenForEvents: function() {
    App3.contracts.Bill.deployed().then(function(instance) {
      // Restart Chrome if unable to receive this event
      instance.calculated({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        App3.render();
      });
    });
  },

  render: function() {
    var Instance;
    var loader = $("#loader");
    var content = $("#content");
    
    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App3.account = account;
        //$("#accountAddress").html("Your Account: " + account);
      }
    });

    App3.contracts.Bill.deployed().then(function(instance) {
      
      Instance = instance;
      
      return Instance.buildingcount();

    }).then(function(Count){
      
      var Results = $("#Results");
      Results.empty(); 

      for (var i = 1; i <= Count ; i++) {
        
          Instance.Buildings(i).then(function(result){

          var id = result[0];
          var capacity = result[1];
          var balance = result[2];
          var amount = result[3];
          
          var Template = "<tr><th>" + id + "</th><td>" + capacity + "</td><td>" + balance + "</td>"+
          "<td>" + amount + "</td></tr>"
          console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
          Results.append(Template); 

          })

          
        } 
      
      });
  
      loader.hide();
      content.show();
   },


      calculate:function(){
      
      App3.contracts.Bill.deployed().then(function(instance) {
        
      return instance.call().then(function(result) {

        $("#content").hide();
        $("#loader").show();

      }).catch(function(err) {
        console.error(err);
        });

      });
    }

};
App5 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App5.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      App5.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      
      App5.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App5.web3Provider);
    }
    return App5.initContract();
  },

  initContract: function() {
    $.getJSON("Grievance.json", function(grievance) {
      
      App5.contracts.Grievance = TruffleContract(grievance);
      
      App5.contracts.Grievance.setProvider(App5.web3Provider);

      App5.listenForEvents();

      return App5.render();
    });
  },

  
  listenForEvents: function() {
    App5.contracts.Grievance.deployed().then(function(instance) {
      // Restart Chrome if unable to receive this event
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        App5.render();
      });
    });
  },

  render: function() {
    var Instance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App5.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App5.contracts.Grievance.deployed().then(function(instance) {
      
      Instance = instance;
      return Instance.problemCount();

    }).then(function(Count) {
      var Results = $("#Results");
      Results.empty(); 

      var Select = $('#Select');
      Select.empty(); 

      for (var i = 1; i <= Count; i++) {
        Instance.Problems(i).then(function(problem) {
          
          var id = problem[0];
          var name = problem[1];
          var count = problem[2];
          var b = problem[3];
          b=(b==true)?"Yes":"No";
          var fund = problem[4];
          
          var Template = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + count + "</td>"+
          "<td>" + b + "</td>"+
          "<td>" + fund + "</td>"+
          "</tr>"
          
          Results.append(Template); 

          var Option = "<option value='" + id + "' >" + name + "</ option>"
          Select.append(Option);         
        
        });
      
      }
      
  });

      loader.hide();
      content.show();
   },


      vote:function(){
      
      var Id = $('#Select').val();
      console.log(Id);      
      App5.contracts.Grievance.deployed().then(function(instance) {
        
      return instance.vote(Id,{ from: App5.account }).then(function(result) {

        $("#content").hide();
        $("#loader").show();

      }).catch(function(err) {
        console.error(err);
        });

      });
    }

};
App1 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App1.initWeb3();
  },

  initWeb3: function() {

    if (typeof web3 !== 'undefined') {
      App1.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      
      App1.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App1.web3Provider);
    }
    return App1.initContract();
  },

  initContract: function() {
    $.getJSON("SmartCity.json", function(election) {
      
      App1.contracts.SmartCity = TruffleContract(election);
      
      App1.contracts.SmartCity.setProvider(App1.web3Provider);

      App1.listenForEvents();

      return App1.render();
    });
  },

  
  listenForEvents: function() {
    App1.contracts.SmartCity.deployed().then(function(instance) {
      // Restart Chrome if unable to receive this event
      instance.cars({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
      
        App1.render();
      });
    });
  },

  render: function() {
    var Instance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App1.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App1.contracts.SmartCity.deployed().then(function(instance) {
      
      Instance = instance;
      return Instance.noofcars();

    }).then(function(Count) {
      var Results = $("#Results");
      Results.empty();  

      for (var i = 0; i< Count; i++) {
        Instance.rc_arr(i).then(function(car) {
          
          var id = car[0];
          var name = car[1];
          var count = car[2];
          var regno = car[3];
          var mm = car[4];
          var dt = car[5];
          var chassis = car[6];

          var Template = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + count + "</td>"+
          "<td>" + regno + "</td>"+
          "<td>" + mm + "</td>"+
          "<td>" + dt + "</td>"+
          "<td>" + chassis + "</td>"+
          "</tr>"
          
          Results.append(Template);          
        
        });
      
      }
      
  });

      loader.hide();
      content.show();
   },

    sell:function(){
    var inst;
    var rcid=$('#rcnum').val();
    var buyerid=$('#buyerid').val();
    var sp=$('#sp').val();

    App1.contracts.SmartCity.deployed().then(function(instance) {
      
      return instance.sell(rcid,sp,buyerid,{ from: App1.account }).then(function(result) {
       

    }).catch(function(err) {
       console.error(err);
       });
     });
      
      },


buy:function(){
      var rcid=$('#rcnumber').val();
      var sellerid=$('#sellerid').val();
      var sp=$('#p').val();
      App1.contracts.SmartCity.deployed().then(function(instance) {
        
      return instance.buy(rcid,sellerid,sp,{ from: App1.account }).then(function(result) {

       $("#content").hide();
       $("#loader").show();

      }).catch(function(err) {
        console.error(err);
        });

      });
          }

};


App2 = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App2.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App2.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App2.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App2.web3Provider);
    }
    return App2.initContract();
  },

  initContract: function() {
    $.getJSON("Ticket.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App2.contracts.Ticket = TruffleContract(election);
      // Connect provider to interact with contract
      App2.contracts.Ticket.setProvider(App2.web3Provider);

      App2.listenForEvents();

      return App2.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App2.contracts.Ticket.deployed().then(function(instance) {
    });
  },

  render: function() {
    var ticketInstance;

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App2.account = account;
        $("#accountAddr").html("Your Account: " + account);
      }
    });
    //Load Contract Data and put it in a variable
    App2.contracts.Ticket.deployed().then(function(instance){
      
      ticketInstance=instance;
      
      return ticketInstance.registeredPersons();

    }).then(function(registeredPersons){

      $("#regPersons").html("No of registeredPersons = "+registeredPersons);

      var personTable=$("#regPersonsTable");

      //personTable.empty();


      for(var i=0;i<registeredPersons;i++)
      {
        ticketInstance.persons(i).then(function(person){
          var id=person[0];
          var noOfTickets=person[2];
          var balance=person[1];
          var personTemplate="<tr><td>"+id+"</td><td>"+noOfTickets+"</td><td>"+balance+"</td></tr>";
          personTable.append(personTemplate);
        });
      }

      }).catch(function(err){
        console.warn(err);
      });

   },


  register:function(){

    App2.contracts.Ticket.deployed().then(function(instance) {
      return instance.register({ from: App2.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
    
   },

   book:function(){
    var noOfTickets=$('#bookNoOfTickets').val();
    App2.contracts.Ticket.deployed().then(function(instance) {
      return instance.bookTicket(noOfTickets,{ from: App2.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
    
   },



   cancel:function(){
    var noOfTickets=$('#cancelNoOfTickets').val();
    App2.contracts.Ticket.deployed().then(function(instance) {
      return instance.cancelTicket(noOfTickets, { from: App2.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
    
   },

   transfer:function(){
    var addr=$('#transferAddress').val();
    var noOfTickets=$('#transferNoOfTickets').val();
    App2.contracts.Ticket.deployed().then(function(instance) {
      return instance.transfer(addr, noOfTickets, { from: App2.account });
    }).then(function(result) {
      // Wait for votes to update
    }).catch(function(err) {
      console.error(err);
    });
    
   }   

};