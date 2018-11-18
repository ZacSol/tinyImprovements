// // variables
const complimentsDump=$("#complimentsDump");
const newName=$("#newName");
const toDropdown=$("#sendToDiv");
const fromDropdown=$("#sentFromDiv");
const sendTo=$("#sendTo");
const sentFrom=$("#sentFrom");


// // functions
// gets data from server
function getData(type) {
    $.get(`/api/${type}`)
        .then(function (response) {
            // console.log(response);
            if(type==="posts"){
                render(response);
            }
            else if(type==="users"){
                renderUsers(response);
            };
        });
};
// renders compliments
function render(arrayOfObjects){
    complimentsDump.empty();
    // console.log(arrayOfObjects)
    arrayOfObjects.reverse();
    arrayOfObjects.forEach(function(item){
        console.log(item);

        let complimentCard=
        `<div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-3">To:${item.userTo}</div>
                        <div class="col-6"><h4 class="card-title">${item.title}</h4></div>
                        <div class="col-3">From:${item.userFrom}</div>
                    </div>
                </div>
                <p class="card-text">${item.body}</p>
            </div>
        </div>`
        
        complimentsDump.append(complimentCard);
    });
};
function renderUsers(userArr){
    toDropdown.empty();
    fromDropdown.empty();
    let userDropdownList="";
    userArr.forEach(function(user){
        // console.log(user.name);
        userDropdownList+=
        `<option>${user.name}</option>`
    });
    userDropdownList=`<option disabled selected>Select a user</option>${userDropdownList}`;
    console.log(userDropdownList);
    toDropdown.append(`<label for="sendTo">To: </label><select id=sendTo>${userDropdownList}</select>`);
    fromDropdown.append(`<label for="sentFrom">From: </label><select id=sendTo>${userDropdownList}</select>`);
};
// sends data to server
function postData(type,newObject){
    $.post(`/api/${type}`,newObject,function(res){
        // console.log(res);
        if(res.error){
            alert("There was a problem sending the data.");
        }else{
            getData("posts");
            getData("users");
        };
    });
};
function validateCompliment(){
    console.log(sendTo.val());
}

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
    validateCompliment();
});

// // autoRun
getData('users');
getData('posts');