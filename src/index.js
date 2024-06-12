const idols = [
    {name:"Choi Aim", link:"./images/choi_aim.jpg"}, 
    {name:"Hwang Seyoung", link: "./images/hwang_seyoung.jpg"},
    {name:"Son Yeongseo", link:"./images/son_yeongseo.jpg"},
    {name:"Jung Yuri", link: "./images/jung_yuri.jpg"},
    {name: "Reta", link: "./images/reta.jpg"},
    {name: "Kang Yunjeong", link: "./images/kang_yunjeong.jpg"},
    {name: "Lee Arumsoul", link: "./images/lee_arumsoul.jpg"},
    {name: "Khan Amina", link: "./images/khan_amina.jpg"},
    {name: "Yoon Minseo", link: "./images/yoon_minseo.jpg"}
];
const finalIdols = [];

const yourPicks = document.querySelector("form").insertBefore(document.createElement("div"), document.querySelector("form").lastElementChild);//query selector and child to navigate elements
yourPicks.id = "yourPicks";
yourPicks.style.width = "900px";
yourPicks.classList.add("row", "mx-auto", "d-flex", "justify-content-center");

function createIdolTemplate (name, link){
    //Create Document Fragment
    const frag = document.createDocumentFragment();

    const card = frag.appendChild(document.createElement("div"));
    card.classList.add("card", "col-4");

    //Append Profile Picture
    const profilePic = card.appendChild(document.createElement("img"));
    profilePic.setAttribute("src", link);
    profilePic.classList.add("card-img-top");
    const title = card.appendChild(document.createElement("div"));
    title.classList.add("card-body", "text-center");
    title.textContent = name; //Modify text content

    return frag;

}

function createPicksTemplate (link){
    const frag = document.createDocumentFragment();
    const pic = document.createElement("img");
    pic.setAttribute("src", link);
    pic.classList.add("col-2", "object-fit-cover", "rounded", "addedPick");

    frag.appendChild(pic);
    
    return frag;
}

const rows = document.getElementById("contestantsBox").appendChild(document.createElement("div"));
rows.classList.add("row");

idols.forEach((idol) => {
    const idolDiv = createIdolTemplate(idol["name"], idol["link"]);
    rows.appendChild(idolDiv);
    
});

document.getElementById("contestantsBox").classList.add("mb-3");

//Add event listener; when you click on card, it's highlighted

const contestants = document.getElementById("contestantsBox").firstChild.childNodes;
document.getElementById("contestantsBox").addEventListener("click", handleContestantClick); //First event listener

function handleContestantClick(e){
    let idolName = "";

    //If the element clicked isn't a card then return immediately
    if (!(e.target.classList.contains("card-body") || e.target.classList.contains("card-img-top"))){
        return;
    }

    //Get the name of the contestant
    if (e.target.classList.contains("card-body")){
        idolName = e.target.textContent;
    }else {
        idolName = e.target.nextSibling.textContent;
    }
    
    //Add or remove from the final list collection
    if (finalIdols.includes(idolName)){
        e.target.parentNode.classList.remove("border-dark"); //parentNode to navigate element
        finalIdols.splice(finalIdols.indexOf(idolName), 1);
        yourPicks.childNodes.forEach((pick)=>{ //Iterate over collection of elements
            if (e.target.src === pick.src){
                yourPicks.removeChild(pick);
            }
        });
        e.target.parentNode.style.backgroundColor = "rgb(255,255,255)";
    }else {
        if (finalIdols.length === 5){
            return;
        }

        //Add border to card
        e.target.parentNode.classList.add("border-dark"); //classes and style are both attributes so I'm counting them for both here
        e.target.parentNode.style.backgroundColor = "rgb(238, 238, 238)";

        finalIdols.push(idolName);
        console.log(e.target);
        yourPicks.appendChild(createPicksTemplate(e.target.src));
        e.target.classList.add("addedPick");
    }
}

//SUBMISSION VALIDATION

const form = document.getElementById("form-container");
form.addEventListener("submit", checkSelection); //Second Event Listener
const ggName = form.elements["groupName"];

function checkSelection(e){ //Form validation based on DOM event
    const regex = /^(?!.*\W).*/;

    console.log(regex.test(ggName));
    if (!regex.test(ggName.value)){
        e.preventDefault();
        window.alert("Your name cannot have any special characters.");
        return false;
    }

    if (finalIdols.length < 5){
        e.preventDefault();
        window.alert("You need to pick exactly five people in order to create a complete group."); //BOM Method 1
        return;
    }

    //BOM Method 2
    const ready = window.confirm("Are you sure you're okay with " + finalIdols[0] + ", " + finalIdols[1] + ", " + finalIdols[2] + ", " +finalIdols[3] + ", and " + finalIdols[4] + " as your picks for " + ggName.value + "?");

    if (!ready){
        e.preventDefault();
    }
}
