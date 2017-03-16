/**
 * Created by nisha on 11/14/16.
 */


function user() {

    jQuery.ajax({
        url: "http://localhost:8181/users",
        type: "GET",
        contentType: 'application/json',
        dataType:"json",
        success: function(resultData) {
            $("#user-table tbody tr").remove();
            $.each(resultData,function (i,item) {
                //var link=document.createElement("a");
                //link.href="users.html";
                $("#user-table").append($('<tr/>').append($('<td/>').append(i+1)).append($('<td/>').append(item.userName)).append($('<td/>').append(item.userEmail)));
            });

            $('#user-table tr').click(function () {
                var row=document.getElementById("user-table").getElementsByTagName("tr");
                var user_email=row[this.rowIndex].getElementsByTagName('td')[2].innerHTML;
                //var rowIndex=this.rowIndex;
                var url='http://localhost:8182/admin-user-sensor.html?user='+encodeURIComponent(user_email);
                document.location.href=url;

            });

        },
    });

}

function onLoadVirtualSensors(){

    var res=null, data=[],arr=[];
    location.search.substr(1).split("&")
        .forEach(function(item){
            data=item.split("=");
            res=decodeURIComponent(data[1]);
        });


    jQuery.ajax({
        url: "http://localhost:8181/virtualsensor?user_email="+res,
        type: "GET",
        contentType: 'application/json',
        dataType:"json",
        success: function(resultData) {
            $.each(resultData,function (i,item) {
                var status;
                if(item.sensorStatus)
                    status = "on";
                else
                    status="off";

                $("#user-sensor-table").append($('<tr/>').append($('<td/>').append(i+1)).append($('<td/>').append(item.sensorName)).append($('<td/>').append(item.sensorType)).append($('<td/>').append(status)).append($('<td/>').append(item.sensorLocation)));

            });
        },

    });

}