let BaseUrl = "http://localhost:3001";
const cardsGetcontainer = document.querySelector(".cards");

const getApiDataWithCallback = async (endPoint,cb) =>{
    let response = await fetch(`${BaseUrl}/${endPoint}`).then((res)=>res.json());
    cb(response);
    console.log(response)
};

const postApiDataWithCallback = async (endPoint,data) =>{
   let response = fetch(`${BaseUrl}/${endPoint}`,{
    method:"POST",
    body:JSON.stringify(data),
   })
return response;
};
const deleteApiDataWithCallback = async (endPoint, id, cb) => {
    let response = await fetch(`${BaseUrl}/${endPoint}/${id}`, {
        method: "DELETE"
    });
    cb(response);
};

const userImage = document.querySelector("#image");
const userName = document.querySelector("#name");
const userProfession = document.querySelector("#profession");
const userStatus = document.querySelector("#status")
const createBTN = document.querySelector("#create_user");



getApiDataWithCallback("data",(data)=>{
data.map((item)=>{
    cardsGetcontainer.innerHTML+=`
    <div class="card">
        <div class="card-img">
            <img
                src="${item.image}"
                alt>
        </div>
        <div class="card-text">
            <div class="status-indicator online"></div>
            <h2>${item.name}</h2>
            <span>${item.profession}</span>
        </div>
     
        <button class="delete-btn" data-id="${item.id}">Delete</button>

    </div>
    `;
})
})


createBTN&&createBTN.addEventListener("click",async(e)=>{
    e.preventDefault();
    const usData ={
        image:userImage.value,
        name:userName.value,
        profession:userProfession.value,
        status:userStatus.value

    }

    postApiDataWithCallback("data",usData)
});

const deleteCard = (id) => {
    const confirmed = confirm("are you sure you want to delete?");
    if (confirmed) {
        deleteApiDataWithCallback("data", id, (response) => {
            if (response.ok) {
                const cardRemove = document.getElementById(`card-${id}`)
                cardRemove.remove();
            }
        })
  }
}
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-btn")) {
        const cardId = e.target.dataset.id;
        deleteCard(cardId);
    }
});


