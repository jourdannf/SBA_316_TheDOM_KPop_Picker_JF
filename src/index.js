const idols = [
    {name:"Choi Aim", link:"./images/choi_aim.jpg"}, 
    {name:"Hwang Seyoung", link: ""},
    {name:"Son Yeongseo", link:""},
    {name:"Jung Yuri", link: ""},
    {name: "Reta", link: ""}
];
const finalIdols = [];

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

    //Ask what kind of position (Main/Lead Dancer/Vocalist/Rapper) they want the person to have
    //Add border to card
    e.target.parentNode.classList.toggle("border-dark"); //This should count for changing the class and attribute since classes are technically attributes

    //Get the name of the contestant
    if (e.target.classList.contains("card-body")){
        idolName = e.target.textContent;
    }else {
        idolName = e.target.nextSibling.textContent;
    }
    
    //Add or remove from the final list collection
    if (finalIdols.includes(idolName)){
        finalIdols.splice(finalIdols.indexOf(idolName), 1);
    }else {
        finalIdols.push(idolName);
    }
    //You confirm that final list with window.confirm when they hit submit.
}

//For each contestant you're gonna check if they have a dark border and if they do, they'll be added to the list