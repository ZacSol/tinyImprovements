// // variables
const complimentsDump=$("#complimentsDump");
const newName=$("#newName");


// // functions
// gets data from server
function getData(type) {
    $.get(`/api/${type}`)
        .then(function (response) {
            // console.log(response);
            if(type==="posts"){
                render(response);
            };
        });
};
// renders compliments
function render(arrayOfObjects){
    // console.log(arrayOfObjects)
    arrayOfObjects.forEach(function(item){
        console.log(item);
    });
};
// sends data to server
function postData(type,newObject){
    $.post(`/api/${type}`,newObject,function(res){
        // console.log(res);
        if(res.error){
            alert("There was a problem sending the data.");
        };
    });
};


// // event handlers
$("#postNameBtn").click(function (e) {
    e.preventDefault();
    if (newName.val().trim() === "") {
        alert("Please enter a name.");
    } else {
        // console.log($("#newName").val().trim());
        let newUser = { name: newName.val().trim() }
        // console.log(newUser);
        postData("users", newUser);
        $(".modal").modal("hide");
    };
});
$("#postComplimentBtn").click(function(e){
    e.preventDefault();
    // console.log("Posting Compliment");
});

// // autoRun
getData('users');
getData('posts');