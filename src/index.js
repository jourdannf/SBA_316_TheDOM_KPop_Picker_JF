const idols = [
    {name:"Choi Aim", link:"./images/choi_aim.jpg"}, 
    {name:"Hwang Seyoung", link: "./images/hwangseyoung.jpeg"},
    {name:"Son Yeongseo", link:"./images/choi_aim.jpg"},
    {name:"Jung Yuri", link: "./images/choi_aim.jpg"},
    {name: "Reta", link: "./images/choi_aim.jpg"},
    {name: "Kang Yunjeong", link: "./images/choi_aim.jpg"}
];
const finalIdols = [];

const yourPicks = document.querySelector("form").appendChild(document.createElement("div"));
yourPicks.id = "yourPicks";
yourPicks.style.width = "900px";
yourPicks.classList.add("row", "mx-auto");

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
    title.classList.add("card-body");
    title.textContent = name;

    return frag;

}

function createPicksTemplate (link){
    const frag = document.createDocumentFragment();
    const pic = document.createElement("img");
    pic.setAttribute("src", link);
    pic.classList.add("col-2", "object-fit-cover", "rounded", "addedPick", "mx-auto");

    frag.appendChild(pic);
    
    return frag;
}

const rows = document.getElementById("contestantsBox").appendChild(document.createElement("div"));
rows.classList.add("row");

idols.forEach((idol) => {
    const idolDiv = createIdolTemplate(idol["name"], idol["link"]);
    rows.appendChild(idolDiv);
    
});

//Add event listener; when you click on card, it's highlighted

const contestants = document.getElementById("contestantsBox").firstChild.childNodes;
document.getElementById("contestantsBox").addEventListener("click", handleContestantClick);

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
        e.target.parentNode.classList.remove("border-dark");
        finalIdols.splice(finalIdols.indexOf(idolName), 1);
        yourPicks.childNodes.forEach((pick)=>{
            if (e.target.src === pick.src){
                yourPicks.removeChild(pick);
            }
        });
    }else {
        if (finalIdols.length === 5){
            return;
        }

        //Add border to card
        e.target.parentNode.classList.add("border-dark"); //This should count for changing the class and attribute since classes are technically attributes

        finalIdols.push(idolName);
        console.log(e.target);
        yourPicks.appendChild(createPicksTemplate(e.target.src));
        e.target.classList.add("addedPick");
    }

    //You confirm that final list with window.confirm when they hit submit.
}

//SUBMISSION VALIDATION

const form = document.getElementById("form-container");
form.addEventListener("submit", checkSelection);
const ggName = form.elements["groupName"];

function checkSelection(e){ //This is the form validation based on DOM event
    const regex = /^(?!.*\W).*/;

    console.log(regex.test(ggName));
    if (!regex.test(ggName.value)){
        e.preventDefault();
        window.alert("Your name cannot have any special characters.");
        return false;
    }

    if (finalIdols.length < 5){
        e.preventDefault();
        window.alert("You need to pick exactly five people in order to create a complete group.");
        return;
    }

    const ready = window.confirm("Are you sure you're okay with " + finalIdols[0] + ", " + finalIdols[1] + ", " + finalIdols[2] + ", " +finalIdols[3] + ", and " + finalIdols[4] + " as your picks for " + ggName.value + "?");

    if (!ready){
        e.preventDefault();
    }else {
        //Display sucess message
    }
}
