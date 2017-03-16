/**
 * Created by nisha on 11/29/16.
 */

function sortByProperty(sensorGrpId) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[sensorGrpId] < b[sensorGrpId]) {
            sortStatus = -1;
        } else if (a[sensorGrpId] > b[sensorGrpId]) {
            sortStatus = 1;
        }

        return sortStatus;
    };
}

function add_sensor_group(){

    var formData = document.getElementById('sensor-grp-name').value;
    alert(formData);
    var data = {};
    $(formData ).each(function(index, obj){
        data[obj.name] = obj.value;
    });

    /*jQuery.ajax({
        url: "http://localhost:8181/virtualSensorGroup",
        type:"POST",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            alert("appended successfully");
        }
    });*/
}

function user_sensor_group() {

    jQuery.ajax({
        url:"http://localhost:8181/virtualSensorGroup",
        //url:"http://localhost:8080/sensor_service/virtualsensor?user_email=archana@sjsu.edu",
        type:"GET",
        contentType:'application/json',
        dataType:"json",
        success:function(data) {

            data.sort(sortByProperty('sensorGroupId'));
            $("#user-sensorGroup-table tbody tr").remove();
            $.each(data, function (i, item) {

                var $l=$('<button class="btn-sm btn-info btn-fill btn-right" data-id="'+item.sensorGroupId.toString()+'" data-name="'+item.sensorGroupName+'" data-list="'+item.virtualSensorId+'" toggle="modal" onclick="listSensors(event)">List Sensors</button>');
                var $d=$('<button class="btn-sm btn-info btn-fill btn-danger btn-right" data-id="'+item.sensorGroupId.toString()+'" toggle="modal" onclick="deleteGroup(event)" >Delete Group</button>');


                //$("#user-virtualsensor-table").append($('<tr/>').append($('<td/>').append(item.virtualSensorId)).append($('<td/>').append(item.sensorName)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append(item.sensorStatus)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(item.vendorName)).append($('<input type=button onclick="location.href=`edit_user.html`" value= "Delete" class="btn btn-default btn-fill btn-sm" data-toggle="modal" data-target="#edit-users"></button>')));
                $("#user-sensorGroup-table").append($('<tr/>').append($('<td/>').append(item.sensorGroupId)).append($('<td/>').append(item.sensorGroupName)).append($('<td/>').append(item.sensorGroupDescription)).append($('<td/>').append($l).append('&nbsp;&nbsp;').append($d)));

            });
        },
    });

}

function deleteGroup(event){
    var id=event.target.dataset.id;

    var delete_endpoint= "http://localhost:8181/virtualSensorGroup/"+id;
    jQuery.ajax({
        url: delete_endpoint,
        type:"DELETE",
        contentType: 'application/json',
        //data: JSON.stringify(a),
        success: function(data,textStatus,xhr){

            //alert(xhr.status);
            if(xhr.status==204){
                alert("Sensor Group deleted");
                //showDeleteDialog(1);
            }else{
                //showDeleteDialog(0);
            }

            window.onload = Refresh;
            function Refresh() {
                setTimeout("refreshPage();", 1000);
            }
            function refreshPage() {
                window.location = location.href;
            }
        }
    });


}

function virtualSensorList(){
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
            $("#create-sensor-grp-table tbody tr").remove();
            $.each(data, function (i, item) {
                var status;
                var $d=$('<input type="checkbox" data-id="'+item.virtualSensorId.toString()+'" toggle="modal">');
                //var $e=$('<button class="btn-xs btn-info btn-fill btn-edit btn-pace-left " data-id="'+item.virtualSensorId.toString()+'" data-name="'+item.virtualSensorName+'"  toggle="modal" onclick="editSensor(event)" >Edit</button>');

                if(item.sensorStatus==1){
                    status = "on";
                }
                else{
                    status="off";
                }
                //$("#user-virtualsensor-table").append($('<tr/>').append($('<td/>').append(item.virtualSensorId)).append($('<td/>').append(item.sensorName)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append(item.sensorStatus)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(item.vendorName)).append($('<input type=button onclick="location.href=`edit_user.html`" value= "Delete" class="btn btn-default btn-fill btn-sm" data-toggle="modal" data-target="#edit-users"></button>')));
                $("#create-sensor-grp-table").append($('<tr/>').append($('<td/>').append(item.virtualSensorId)).append($('<td/>').append(item.virtualSensorName)).append($('<td/>').append(item.sensorLocation)).append($('<td/>').append(status)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(item.vendorName)).append($('<td/>').append($d)));
                i++;
            });
        },
    });
}

function listSensors(event){

    var id=event.target.dataset.id;
    var name=event.target.dataset.name;
    var sensor_list=event.target.dataset.list;
    var sensorArray=sensor_list.split(',');


    $("#list-sensor-modal").find('.modal-header h4').text(name);

    jQuery.ajax({
        url: "http://localhost:8181/virtualsensor",
        //url:"http://localhost:8080/sensor_service/virtualsensor?user_email=archana@sjsu.edu",
        type: "GET",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            var status;
            $("#list-sensor-table tbody tr").remove();
            $.each(data, function (i, item) {
                for(var i=0;i<sensorArray.length;i++)
                {
                    if(item.virtualSensorId==sensorArray[i]) {

                        if(item.sensorStatus==1){
                            status = "on";
                        }
                        else{
                            status="off";
                        }

                        $("#list-sensor-table").append($('<tr/>').append($('<td/>').append(i + 1)).append($('<td/>').append(item.virtualSensorName)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(status)).append($('<td/>').append(item.sensorLocation)));
                    }
                }
            });
        },

    });

    $("#list-sensor-modal").modal('show');

}