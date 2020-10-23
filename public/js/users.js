
(function() {
    var user_name = sessionStorage.getItem('username');
    $(function(){
        $("#welcome").text(`Welcome ${user_name}`);
        console.log("----read json "+ data.key);        

    });        
    
    axios.get(`/geturls?user_name=${user_name}`).then((response) => {
        console.log(`response ${JSON.stringify(response)}`);
        var data = response.data;
        for(urldata in data){
            var topDiv = $("<div class=\"navbar d-flex flex-column align-items-start navbar-light bg-light justify-content-between w-100\"></div>");
            var buttonDownload = $("<button class=\"btn margin-top-md margin-bottom-md btn-outline-primary\">Download</button>").on('click', function(){
                alert('button click');
            });;
            var buttonDelete = $("<button class=\"btn margin-top-md margin-bottom-md btn-outline-primary\">Delete</button>");
            var buttonUpdate = $("<button class=\"btn margin-top-md margin-bottom-md btn-outline-primary\">Update</button>");
            buttonDownload.cl
            var gap = $("<hr>");
            topDiv.append(buttonDownload, buttonUpdate, buttonDelete);
            $("#container").append(topDiv, gap);
        }
    },
    (error) => {
        console.log(`error ${error}`);
    });    

    const clickHandler = (type, data) => {

    };
})();