var eventName = "";
var eventDesc = "";
var time = "10:00";
var teams = "";
var typelog;
var end;

angular.module('app.controllers', [])
  
.controller('manageEventCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.teamNumber = 1;
	$scope.teamList = [];

	var count = 1;

	$scope.submit = function () {
    end=false;
     array_username = [];
     console.log("array_username is null"+array_username.length);
     if ( array_username==null) {
      console.log("array_username is null"+array_username.length);
     }
    $scope.eventName = document.getElementById("eventName").value;
    $scope.eventDesc = document.getElementById("eventDesc").value;
     
     
      teams = "";

      
      for (var i = $scope.teamList.length - 1; i >= 0; i--) {
        teams += $scope.teamList[i]+"|";
      }
      if (!typelog||!$scope.eventName||!$scope.eventDesc||!teams)
     {
      alert("กรุณากรอกข้อมูลให้ครบ");
      console.log(typelog+" "+eventName+" "+eventDesc+" "+teams)
     }else{
      document.getElementById('manageEvent-form2').style.display = "none"; 
      document.getElementById('qr').style.display = "block";
      document.getElementById('btconfig').style.display = "block";


      microgear.publish("/client", teams+"teams");
      //  gen qr
        var element = document.getElementById("qr");
        var bodyElement = document.body;
        var face="https://goo.gl/QcJXz0";
        var phone="https://goo.gl/9mIFlS";
        if (typelog=="Facebook") {
          if(element.lastChild)
            element.replaceChild(showQRCode(face), element.lastChild);
          else
            element.appendChild(showQRCode(face));

        }else if (typelog=="Phone") {
          if(element.lastChild)
            element.replaceChild(showQRCode(phone), element.lastChild);
          else
            element.appendChild(showQRCode(phone));

        }
          //end gen qr 
        }      
    
  }; //end submit
// radio

$scope.data = {// defail data in list
    serverSide: 'not set'
  };
$scope.serverSideList = [
   { text: "FaceBook", value: "Facebook" },
   { text: "Phone number", value: "Phone" },  
  ];
     $scope.serverSideChange = function(item) {
      typelog=item.value;
    console.log("Selected Login type :", item.text, "value:", item.value);      
      };

  // end raido

  $scope.addTeam = function () {
  	var teamName = document.getElementById("teamName").value;

  	$scope.teamList.push("ทีมที่ " + count +" "+ teamName);

	document.getElementById('teamName').value = "";

  	$scope.teamNumber++;

      count++;
  };// end addteam

  $scope.config = function () {
    
    document.getElementById('manageEvent-form2').style.display = "block";
    document.getElementById('qr').style.display = "none";
    document.getElementById('btconfig').style.display = "none";

  }


}])
   
.controller('resultCtrl', ['$scope', '$stateParams', '$timeout', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $timeout, $ionicModal) {

	$scope.users = [];
	
	$scope.$on("$ionicView.afterEnter", function(event, data){
	   	$scope.eventName = eventName;
	   	$scope.eventDesc = eventDesc;
	});


	$scope.updateGraph = function(totalVotes, users) {
		var data = [];

		$scope.users = users;
		for (var team in totalVotes) {
			data.push(["ทีม "+team, totalVotes[team]]);

		};
    document.getElementById("score").innerHTML = "";
    console.log(data);
    for(var i=0;i<data.length;i++){
      document.getElementById("score").innerHTML += data[i][0]+" ได้ "+data[i][1]+" คะแนน"+"<br>";
      document.getElementById("totaluser").innerHTML= "จากผู้เข้าร่วมทั้งหมด :"+users.length+" คน";
    }
		$.plot("#placeholder", [ data ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.6,
					align: "center"
				}
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			}
		});

		// Add the Flot version string to the footer

		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
	};

	$scope.random = function(){
		alert($scope.users[Math.floor(Math.random()*$scope.users.length)]);
	}
  $scope.endvote = function(){
    document.getElementById('btran').style.display = "block";
    end=true;
    console.log("end is "+end)
  }
	
    $ionicModal.fromTemplateUrl('templates/timer.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      console.log(modal);
    });

}])

