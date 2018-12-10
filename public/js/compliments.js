// // variables
const complimentsDump=$("#complimentsDump");
const newName=$("#newName");
const complimentTitle=$("#userTitle");
const complimentMessage=$("#userMessage");
const x = $("#sendToUsers");
const y = $("#sentFromUsers");

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
        // console.log(item);

        let complimentCard=
        `<div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col">To:${item.userTo}</div>
                        <div class="col"><h4 class="card-title">${item.title}</h4></div>
                        <div class="col">From:${item.userFrom}</div>
                    </div>
                </div>
                <p class="card-text">${item.body}</p>
            </div>
        </div><br>`
        
        complimentsDump.append(complimentCard);
    });
};
function addName(name){
    let newOption=document.createElement("option");
    newOption.text=`${name}`;
    newOption.value=`${name}`;
    let newOptionA=document.createElement("option");
    newOptionA.text=`${name}`;
    newOptionA.value=`${name}`;
    // console.log(newOption);
    x.append(newOption);
    y.append(newOptionA);
    newName.val("");
}
function renderUsers(userArr){
    userArr.forEach(function(user){
        // console.log(user.name);
        addName(user.name);
    });
    // console.log(x);
};
// sends data to server
function postData(type,newObject){
    $.post(`/api/${type}`,newObject,function(res){
        // console.log(res);
        if(res.error){
            alert("There was a problem sending the data.");
        }else{
            $(".modal").modal("hide");
            getData("posts");
        };
    });
};
function validateCompliment(){
    // console.log(complimentTitle.val().trim());
    // console.log(complimentMessage.val().trim());
    // checks if input boxes are empty and select boxes are selected
    if(!complimentTitle.val()||!complimentMessage.val()||!x.val()||!y.val()){
        alert("Please fill out all fields.");
    }else{
        // data in all fields
        let objectToPost={
            userTo:x.val(),
            userFrom:y.val(),
            title:complimentTitle.val().trim(),
            body:complimentMessage.val().trim()
        };
        postData('posts',objectToPost);
    }
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
        addName(newName.val().trim())
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