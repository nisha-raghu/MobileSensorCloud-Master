/****************************************/
/*****  user virtual sesnors   **********/
/*****  Created: 11/20/2016     *********/
/****************************************/


function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }

        return sortStatus;
    };
}



function user_sensors() {

    jQuery.ajax({
        url:"http://localhost:8181/virtualsensor",
        //url:"http://localhost:8080/sensor_service/virtualsensor?user_email=archana@sjsu.edu",
        type:"GET",
        contentType:'application/json',
        dataType:"json",
        success:function(data) {
            console.log(data);
            var i=1;
            data.sort(sortByProperty('virtualSensorId'));
            $("#user-virtualsensor-table tbody tr").remove();
            $.each(data, function (i, item) {
                var status;
                var $d=$('<button class="btn-sm btn-info btn-fill btn-danger pull-right" data-id="'+item.virtualSensorId.toString()+'" toggle="modal" onclick="deleteSensor(event)">Unsubscribe</button>');
                //var $e=$('<button class="btn-xs btn-info btn-fill btn-edit btn-pace-left " data-id="'+item.virtualSensorId.toString()+'" data-name="'+item.virtualSensorName+'"  toggle="modal" onclick="editSensor(event)" >Edit</button>');

                if(item.sensorStatus==1){
                    status = "on";
                }
                else{
                    status="off";
                }
                //$("#user-virtualsensor-table").append($('<tr/>').append($('<td/>').append(item.virtualSensorId)).append($('<td/>').append(item.sensorName)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append(item.sensorStatus)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(item.vendorName)).append($('<input type=button onclick="location.href=`edit_user.html`" value= "Delete" class="btn btn-default btn-fill btn-sm" data-toggle="modal" data-target="#edit-users"></button>')));
                $("#user-virtualsensor-table").append($('<tr/>').append($('<td/>').append(item.virtualSensorId)).append($('<td/>').append(item.virtualSensorName)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append(status)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(item.vendorName)).append($('<td/>').append($d)));
                i++;
            });
        },
    });

}




function addsensorforuser() {
    jQuery.ajax({
        url:"http://localhost:8181/sensors",
        type:"GET",
        contentType:'application/json',
        dataType:"json",
        success:function(data) {
            console.log(data);
            var i=1;
            data.sort(sortByProperty('sensorId'));
            $("#user_addvirtualsensor tbody tr").remove();
            $.each(data, function (i,item) {
                var status;
                var $e=$('<button class="btn-xs btn-info btn-fill btn-edit btn-pace-left " data-id="'+item.sensorId.toString()+'" data-name="'+item.sensorName+'" data-type="'+item.sensorType+'" data-status="'+item.sensorStatus+'" data-location="'+item.sensorLocation+'"  toggle="modal" onclick="addvirtualSensor(event)">Subscribe</button>');
                //var $e=$('<button class="btn-xs btn-info btn-fill btn-edit btn-pace-left " data-id="'+item.sensorId.toString()+'" data-name="'+item.sensorName+'" data-type="'+item.sensorType+'" data-status="'+item.sensorStatus+'" data-location="'+item.sensorLocation+'"  toggle="modal" onclick="editSensor(event)">Add</button>');
                //var $e=$('<button class="btn-xs btn-info btn-fill btn-edit btn-pace-left " data-id="'+item.sensorId.toString()+'" data-name="'+item.sensorName+'" data-type="'+item.sensorType+'" data-status="'+item.sensorStatus+'" data-location="'+item.sensorLocation+'"  toggle="modal" onclick="addvirtualSensor(sensorId.value,sensorName.value)">Add</button>');

                if(item.sensorStatus==1)
                    status = "on";
                else
                    status="off";

                $("#user_addvirtualsensor").append($('<tr/>').append($('<td/>').append(item.sensorId)).append($('<td/>').append(item.sensorName)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(status)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append($e)));

                i++;

            });
        },
    });

}

function formToJSON(virsensorId,physensorId,virtualSensorName,userEmail)
{
    return JSON.stringify({
        "virtualSensorId": virsensorId,
        "virtualSensorName": virtualSensorName,
        "sensorId": physensorId,
        "userEmail": userEmail

    });
}

function addvirtualSensor(event)
{

    var physensorId =event.target.dataset.id;
    var virsensorId = 0;
    var virtualSensorName = event.target.dataset.name;
    var userEmail = "archana@gmail.com";

    jQuery.ajax({
        url: "http://localhost:8181/virtualsensor",
        type:"POST",
        contentType: 'application/json',
        data: formToJSON(virsensorId,physensorId,virtualSensorName,userEmail),
        success: function(data){
            location.reload();
            alert("New Sensor Added Successfully");
        }
    });
}




function deleteSensor(event)
{
    var a =event.target.dataset.id;
//var string= "http:/localhost:8080/sensor_service/virtualsensor/"+a;
    var string= "http://localhost:8181/virtualsensor/"+a;
    jQuery.ajax({
        url: string,
        type:"DELETE",
        contentType: 'application/json',
        data: JSON.stringify(a),
        success: function(data){
            location.reload();
            alert("Sensor Returned Successfully");
        }
    });

}
