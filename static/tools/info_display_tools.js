var n_info_box = 0;


function load_info() {
    Waypoint.disableAll();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            json_info = JSON.parse(this.responseText);
            json_info.forEach( async function(deal) {    
                $('#main-body').append(load_info_box(deal));
            });
        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/info?from="+n_info_box+"&to="+(n_info_box+5), true);
    xhttp.send();

    Waypoint.refreshAll();
    Waypoint.enableAll();
}


function load_info_box(deal) {
    info_box = "<div class='info-box";

    if(n_info_box % 2){
        info_box += " slidein_left";
        n_info_box++;
    } else{
        info_box += " slidein_right";
        n_info_box++;
    }

    if(deal.class == "Equity"){
        info_box += " class-equity'>";
    } else if(deal.class == "Multi-Asset"){
        info_box += " class-multi-asset'>";
    } else if(deal.class == "Bond"){
        info_box +=" class-bond'>";
    }else{
        info_box += "'>";
    }

    info_box += "<span class='info-box-name'>"+deal.name+"</span><br/>"+
                "<div class='info-box-content'>"+
                    "<table>"+
                        "<tr>"+
                            "<td><span class='info-box-currency'><b>Currency</b>  "+deal.currency+" </span></td>"+
                            "<td><span class='info-box-sector'><b>Sector</b> "+deal.sector+" </span></td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td><span class='info-box-fees'><b>Fees</b>  "+deal.fees+" </span></td>"+
                            "<td><span class='info-box-class'><b>Investment Class</b>  "+deal.class+" </span></td>"+
                        "</tr>"+
                    "</table>"+
                    "<span class='info-box-region'>"+
                        "<img class='country-flag' src='static/media/flags/"+deal.region+".png' title='"+deal.region+"'alt='"+deal.region+"'/>"+
                    " </span>"+
                "</div>"+                             
                "</div>";
    
    return info_box;
}

// This exists just to handle to handle a weird bug that made
// the waypoint dissapear after window being resized
function ready_resize_solution(){
    load_more_waypoint = new Waypoint({
    element: document.getElementById("end"),
    handler: load_info,
    offset: '98%'
    });
}