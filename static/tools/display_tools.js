// Variables
var n_info_box = 0; // Number of information boxes loaded in the current page
var url = new URL(window.location.href); // URL set for parameterization
var entries = url.searchParams.entries(); // Retrieval of any content in the URL aside from the URL itself
var query = url.searchParams.get("search"); // 'search' variable retrieval from the URL

// Indicates if there is any GET variables in the current url
function is_there_GET_variables() {
   if( entries.next().value != undefined){
        return true;
    } else {
        return false;
    }
}

// Load into de webpage more information boxes through AJAX
function load_info() {
    Waypoint.disableAll();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText);

            if(this.responseText == "[]"){
                if(n_info_box > 0){
                    $('#end').html("<i>That's all, folks!</i>");
                    Waypoint.destroyAll();
                } else{
                    $('#end').html("<i>That last search had no results...<br/>Time to try again!</i>");
                    Waypoint.destroyAll();
                }
            }else{
                json_info = JSON.parse(this.responseText);
                json_info.forEach( async function(deal) {    
                    $('#main-body').append(load_info_box(deal));
                });
            }
        }
    };

    if(query == undefined){
        xhttp.open("GET", "http://127.0.0.1:5000/info?from="+n_info_box+"&to="+(n_info_box+3), true);
    } else{
        xhttp.open("GET", "http://127.0.0.1:5000/info?from="+n_info_box+"&to="+(n_info_box+3)+"&query="+query, true);
    }
    xhttp.send();

    Waypoint.enableAll();
}

// Information box creation through HTML codification
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
    } else if(deal.class == "Money Market"){
        info_box +=" class-money-market'>";
    } else if(deal.class == "ARIS"){
        info_box +=" class-aris'>";
    } else if(deal.class == "Other"){
        info_box +=" class-other'>";
    } else{
        info_box += "'>";
    }

    info_box += "<div class='info-box-name'>"+deal.name+
                    "<img class='mini-country-flag' src='static/media/flags/"+deal.region+".png' title='"+deal.region+"'alt='"+deal.region+"'/>"+
                "</div>"+
                "<div class='info-box-content'>"+
                    "<table>"+
                        "<tr>"+
                            "<th>Currency</th>"+
                            "<th>Sector</th>"+
                            "<th>Fees</th>"+
                            "<th>Region</th>"+
                            "<th>Class</th>"+
                        "</tr>"+
                        "<tr>"+
                            "<td><span class='info-box-currency'>"+deal.currency+"</span></td>";
    if(deal.sector.length <= 32){
        info_box +=         "<td><span class='info-box-sector'>"+deal.sector+"</span></td>";
    } else{
        info_box +=         "<td><span class='info-box-sector smaller_text' title='"+deal.sector+"'>"+deal.sector.substring(0, 32)+"...</span></td>";
    }
    info_box +=             "<td><span class='info-box-fees'>"+deal.fees+"</span></td>"+
                            "<td><span class='info-box-region'>"+deal.region+"</span></td>"+
                            "<td><span class='info-box-class'>"+deal.class+"</span></td>"+
                        "</tr>"+
                    "</table>"+
                    "<span class='info-box-region'>"+
                        "<img class='country-flag' src='static/media/flags/"+deal.region+".png' title='"+deal.region+"'alt='"+deal.region+"'/>"+
                    " </span>"+
                "</div>"+                             
                "</div>";
    
    return info_box;
}

// Waypoint to load more content
var load_more_waypoint;
function load_waypoint(){
    $("#investment-search-bar").val(query);
    load_more_waypoint = new Waypoint({
        element: document.getElementById("end"),
        handler: load_info,
        offset: '98%'
    });
}

// Actions to be taken after an scroll
function scroll_actions(){
    // Checks if the logo has to be "resized". Big for intro, small if elsewhere.
    if($(this).scrollTop() > $(window).height()){
        $('#header-logo-big').toggleClass('active-logo', false);
        $('#header-logo-small').toggleClass('active-logo', true);
        $('#back-to-top').css('display', 'inline');
    }else{
        $('#header-logo-big').toggleClass('active-logo', true);
        $('#header-logo-small').toggleClass('active-logo', false);
        $('#back-to-top').css('display', 'none');
    }

    // Refresh the waypoints
    Waypoint.refreshAll(); 
};

// Scrolls to after the intro
function scroll_top(){
    $("html, body").animate({ scrollTop: window.innerHeight }, 600); 
}