console.log("Extension works")

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, sendResponse) {
  // console.log(message.text)
  if (message.text === "player-search") {
    // let parag = document.getElementsByTagName('p');
    // for (elt of parag) {
    //   elt.style['background-color'] = '#96aed6';
    // }

    let name = $(".text-lg a").toArray().map(a => a.innerHTML )
    let yellow_floor = $("div.text-center:nth-of-type(1) [data-tip='Floor price'] p").toArray().map(a => a.innerHTML )
    let red_floor = $("div.text-center:nth-of-type(2) [data-tip='Floor price'] p").toArray().map(a => a.innerHTML )
    let age_pos_status = $("p.font-medium").toArray().map(a => a.innerHTML )
    let team_league = $("p.text-sm.font-semibold").toArray().map(a => a.innerHTML )
    let so5 = $("[data-tip='Average SO5 points (DNPs excluded) over the past 5 games'] p").toArray().map(a => a.innerHTML )
    let so15 = $("[data-tip='Average SO5 points (DNPs excluded) over the past 15 games'] p").toArray().map(a => a.innerHTML )
    let so40 = $("[data-tip='Average SO5 points (DNPs excluded) over the past 40 games'] p").toArray().map(a => a.innerHTML )
    let play5 = $("div.flex-col:nth-of-type(1) .flex p.text-textGrey3").toArray().map(a => a.innerHTML )
    let play15 = $("div.flex-col:nth-of-type(2) .flex p.text-textGrey3").toArray().map(a => a.innerHTML )
    let play40 = $("div.flex-col:nth-of-type(3) .flex p.text-textGrey3").toArray().map(a => a.innerHTML )

    //console.log(name,yellow_floor,red_floor,age_pos_status,team_league,so5,so15,so40)
    // console.log(name[0],yellow_floor[0],red_floor[0],age_pos_status[0],team_league[0],so5[0],so15[0],so40[0])
    
    let age_pos_status_array = []
    let team_league_array = []
    let obj = []
    var dt = new Date();

    let csvContent = "\uFEFF" + 'Date;Name;Yellow Floor;Red Floor;Age;Pos;Status;Team;League;SO5;SO15;SO40;Play5;Play15;Play40\n';

    for(let i = 0; i < name.length ; i++) {
      obj = [...obj, {name: name[i], yellow_floor: yellow_floor[i], red_floor: red_floor[i], age_pos_status: age_pos_status[i], team_league: team_league[i], so5: so5[i], so15: so15[i], so40: so40[i], play5: play5[i], play15: play15[i], play40: play40[i] }]
      age_pos_status_array = age_pos_status[i].split(" - ")
      team_league_array = team_league[i].split(" (")

      csvContent += dt.getDate() + '/' + (dt.getMonth() + 1) + ';' +
                    name[i] + ';' + 
                    yellow_floor[i].substring(0, yellow_floor[i].length - 2) + ';' + 
                    red_floor[i].substring(0, red_floor[i].length - 2) + ';' + 
                    age_pos_status_array[0] + ';' +
                    age_pos_status_array[1] + ';' + 
                    age_pos_status_array[2].replace('<span>','').replace('</span>','') + ';' + 
                    team_league_array[0] + ';' + 
                    team_league_array[1].slice(0, -1) + ';' + 
                    so5[i] + ';' + 
                    so15[i] + ';' + 
                    so40[i] + ';' +
                    play5[i] + ';' + 
                    play15[i] + ';' + 
                    play40[i] + '\n'
    }

    var pom = document.createElement('a');
    var blob = new Blob([csvContent],{type: 'text/csv;charset=utf-8;'});
    var url = URL.createObjectURL(blob);
    pom.href = url;
    pom.setAttribute('download', 'my_data.csv');
    pom.click();
  }
}