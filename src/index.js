const idols = [
    {name:"Choi Aim", link:"./images/choi_aim.jpg"}, 
    {name:"Hwang Seyoung", link: ""},
    {name:"Son Yeongseo", link:""},
    {name:"Jung Yuri", link: ""},
    {name: "Reta", link: ""}
];

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