
(function() {
    var s3;
    var user_name = sessionStorage.getItem('username');
    $(function(){
        $("#welcome").text(`Welcome ${user_name}`);        
        console.log("----read json "+ data.cloudfronturl);                
        AWS.config.update({
            region: data.bucketRegion,                            
            accessKeyId: data.id,
            secretAccessKey: data.secret
        });

        s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {Bucket: data.bucketName}
        });
        console.log('Updated AWS config');
    });        
    
    axios.get(`/geturls?user_name=${user_name}`).then((response) => {
        console.log(`response ${JSON.stringify(response)}`);
        var dataUrl = response.data;        
            dataUrl.forEach((urldata) => {
                console.log(`urldata to show ${JSON.stringify(urldata)}`);
                var topDiv = $("<div class=\"navbar d-flex flex-column align-items-start navbar-light bg-light justify-content-between w-100\"></div>");
                var heading = $(`<p class="h2">Image: ${urldata.url}</p>`);
                var userName = $(`<p class="h5">User Name: ${urldata.user_name}</p>`);            
                var firstName = $(`<p class="h5">First Name: ${urldata.first_name}</p>`);
                var lastName = $(`<p class="h5">Last Name: ${urldata.last_name}</p>`);
                var createTime = $(`<p class="h5">Create Time: ${urldata.creation_date}</p>`);
                var modifyTime = $(`<p class="h5">Modify Time: ${urldata.modify_date}</p>`);
                var description = $(`<p class="h5">Description: ${urldata.url}</p>`);
                console.log("---"+data.cloudfronturl);
                var buttonDownload = $(`<a class="h5 my-2" href="${data.cloudfronturl}/${urldata.url}" download>Download ${urldata.url}</a>`);
                var buttonDelete = $("<button class=\"btn my-2 btn-outline-primary\">Delete Image</button>").click(() => {
                    var deleteParama = {
                        Bucket: data.bucketName,
                        Delete: {
                            Objects: [
                                {
                                    Key: `"${urldata.url}"`
                                }
                            ]
                        }
                    };

                    s3.deleteObjects(deleteParama, (err, data) => {
                        if(err){
                            console.log(`error deleting ${JSON.stringify(err)}`);
                        }
                        else{
                            console.log(`success deleting ${JSON.stringify(data)}`);
                            axios.post('/deleteurl', {
                                user_name: urldata.user_name,
                                url: urldata.url
                            }).then((success) => {
                                console.log('success removing url from db '+ JSON.stringify(success));
                                location.reload();
                            }, (error) => {
                                console.log('error removing url from db '+ JSON.stringify(error));
                            });
                            
                        }
                    });
                });                                
                var buttonUpdate = $("<button class=\"btn my-2 btn-outline-primary\">Update Image</button>").click(() => {
                    console.log("uploadS3");
        var files = document.getElementById('fileupload').files;
        console.log("about to update file" + files);
        if (files) 
        {
            
            var file = files[0];
            var fileName = file.name;
            var filePath = fileName;
            var fileUrl = 'https://' +data.bucketName+"."+ "s3-"+data.bucketRegion + '.amazonaws.com/'+fileName;
            s3.upload({
                Key: filePath,
                Body: file,
                ACL: 'public-read',
                Conditions: [['content-length-range', 0, 10000000]] //Limit on file size to be 10MB.
                }, function(err, data) {
                    if(err) {
                    console.log(`error in uploading ${err}`);

                    }
                    else{
                        console.log(data.key);
                        axios.post('/updateurl', {                        
                        "url":data.key
                    }).then((response) => {
                    console.log(`added image url ${JSON.stringify(response)}`);
                    location.reload();
                    },
                (error) => {
                console.log(`error in adding image url ${JSON.stringify(error)}`);
            });
        }
        alert('Successfully Uploaded!');
        });                    
    }
                });            
                topDiv.append(heading,firstName, lastName, userName, createTime, modifyTime, description, buttonDownload, buttonUpdate, buttonDelete);
                var gap = $("<hr>");
                $("#container").append(topDiv, gap);
            });
            
        // }
    },
    (error) => {
        console.log(`error ${error}`);
    });    

    
})();