var n_info_box = 0;


function load_info() {
    Waypoint.disableAll();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var even = 0;
            json_info = JSON.parse(this.responseText);
            json_info.forEach( async function(deal, even) {    
                $('#main-body').append(load_info_box(deal, even));
            });
        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/info?from="+n_info_box+"&to="+(n_info_box+5), true);
    xhttp.send();
    n_info_box += 5;

    Waypoint.refreshAll();
    Waypoint.enableAll();
}


function load_info_box(deal, even) {
    info_box = "<div class='info-box";

    if(even % 2){
        info_box += " slidein_left";
        even++;
    } else{
        info_box += " slidein_right";
        even++;
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
    
    info_box += "<span class='info-box-name'>"+deal.name+"</span><br/><br/>"+
                "<div class='info-box-content'><span class='info-box-currency'>"+deal.currency+" </span>"+
                "<span class='info-box-fees'>"+deal.fees+" </span>"+
                "<span class='info-box-sector'>"+deal.sector+" </span>"+
                "<span class='info-box-region'>"+deal.region+" </span>"+
                "<span class='info-box-class'>"+deal.class+" </span>"+                            
                "</div></div>";
    
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