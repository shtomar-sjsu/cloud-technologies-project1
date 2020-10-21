
(function() {
    var user_name = sessionStorage.getItem('username');
    $(function(){
        $("#welcome").text(`Welcome ${user_name}`);
        // $("#logout").click(() => {
        //     console.log('logout');
        //     axios.get('/logout');
        // });
    });        
    
    axios.get(`/geturls?user_name=${user_name}`).then((response) => {
        console.log(`response ${JSON.stringify(response)}`);
    },
    (error) => {
        console.log(`error ${error}`);
    });



    // var addUrls = (dataArr) => {

    // };
})();