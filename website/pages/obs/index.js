const mainDiv = document.querySelector("#main");
const playerImg = document.querySelector("#playerImg");
const playerNameTitle = document.querySelector("#playerNameTitle");
let maplist;
let settings;

async function fetchUserData() {
    settings = await fetchFile("./settings.json");
    const file = `http://localhost:3000/profile/${settings.name}/json`;
    maplist = await fetchFile("./maplist.json");
    const fileData = await fetchFile(file);

    if (fileData.userData == null) {
        alert("Invalid Player");
        return
    }

    playerImg.src = fileData.userData.avatar;

    console.log(fileData.times.COOP.chambers.chamberOrderedByDate)

    let current_chapter = 0;

    let maps;

    let coopDeficit = 0;
    let isCoop = settings.isAdv;

    if (isCoop) {
        coopDeficit = 22
        maps = fileData.times.COOP.chambers.chamberOrderedByDate;
    } else {
        maps = fileData.times.SP.chambers.chamberOrderedByDate;
    }

    for (let key in maps) {
        let name;
        for (let entry in maplist) {
            if (maplist[entry][2] == key - coopDeficit) {
                name = maplist[entry][0];

                if (maplist[entry][1] > current_chapter) {
                    current_chapter = maplist[entry][1];
                    const chapterTitle = document.createElement("h2")

                    chapterTitle.innerText = maplist.sp[current_chapter - 1]

                    mainDiv.appendChild(chapterTitle);
                }
            }
        }
        let rank = "Rank " + maps[key].playerRank;
        if (rank == "Rank undefined") {
            rank = "No Rank"
        }
        const time = maps[key].score / 100;
        const playerName = settings.name;
        console.log(name, rank)

        const rankDiv = document.createElement("div");
        rankDiv.classList.add("rank-div");

        const rankName = document.createElement("span");
        const mapName = document.createElement("span");
        const mapTime = document.createElement("span");
        const rankNum = document.createElement("span");

        rankNum.innerText = rank;
        rankNum.style.textAlign = "left";
        mapTime.innerText = time;
        mapTime.style.textAlign = "right";
        mapName.innerText = name;
        if (isCoop) {
            mapName.innerText = "Adv. " + name;
        }
        rankName.innerText = playerName;
        playerNameTitle.innerText = playerName + "'s Ranks";

        rankDiv.appendChild(mapName);
        rankDiv.appendChild(rankNum);
        rankDiv.appendChild(mapTime);
        mainDiv.appendChild(rankDiv);
    }
}

async function fetchFile(url) {
  const response = await fetch(url);
  return await response.json();
}

fetchUserData();