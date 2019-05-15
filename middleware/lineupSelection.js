const dfsQuery = require('./dfsQuery');
const playerStatsQuery = require('./playerStatsQuery');
const teamStatsQuery = require('./teamStatsQuery');

// //   //swap players based on difference between pt/dollar prioritizing higher pt/$
// //   //repeat process until total salary is less than allowed salary cap
// //   While (total > cap)
// //   Holder = Qb
// //   If(qb_pt_per_dollar - nextQB_pt_per_dollar > rb1_pt_per_dollar - nextRB1_pt_per_dollar)
// //   If(qb_pt_per_dollar-  nextQB_pt_per_dollar > 0)
// //   Holder = rb1
// //   Repeat for all positions
// // //put holder's next highest pt per dollar into line up
// //   Swap holder with holder_next_pt_per_dollar
// //     Recalculate total
// //   loop
// //   END
//
// }
//

function loadProjections(data){
  for (let i = 0; i < data.length; i++){
    if(data[i].player !== null)
      data[i].player.projPt = getProjections(data, i);
  }
}

function getProjections(data, index){
  let i = index;
  let grossPt = 0;
  try {
    grossPt += (data[i].stats.stats.rushing.rushAverage * .1);
  }
  catch {
    console.log("Could not access field RUSHING");
  }

  try {
    grossPt += (data[i].stats.stats.passing.passAvg * .04);
    grossPt += (data[i].stats.stats.passing.passCompletions * 1);
  }
  catch {
    console.log("Could not access field PASSING");
  }

  try {
    grossPt += (data[i].stats.stats.receiving.recAverage * .1);
  }
  catch {
    console.log("Could not access field RECEIVING");
  }

  return grossPt;
}

function findMax(data, pos){
  let indexes = [];
  let max = 0;
  let holderIndex = 0;
  let holderPos = [];

  if(pos === "flex"){
    holderPos.push("RB");
    holderPos.push("WR");
    holderPos.push("TE");
  }
  else
    holderPos.push(pos);

  for(let i = 0; i < data.length; i++){
    if(data[i].player !== null) {
      for (let j = 0; j <= holderPos.length; j++) {
        if (data[i].position.localeCompare(holderPos[j]) === 0) {
          indexes.push(i);
        }
      }
    }
  }

  max = data[indexes[0]].player.projPt;

  for(let i = 1; i < indexes.length; i++){
    if(data[indexes[i]].player.projPt >= max){
      max = data[indexes[i]].player.projPt;
      holderIndex = indexes[i];
    }
  }

  holderData = data[holderIndex];
  data.splice(holderIndex,1);
  return holderData;
}

function delGSals(data, sal, pos){
  let holderPos = [];

  if(pos === "flex"){
    holderPos.push("RB");
    holderPos.push("WR");
    holderPos.push("TE");
  }
  else
    holderPos.push(pos);

  for(let i = 0; i < data.length; i++){
    if(data[i].player !== null) {
      for (let j = 0; j <= holderPos.length; j++) {
        if (data[i].position === holderPos[j]) {
          if(data[i].salary > sal)
            data.splice(i, 1);
        }
      }
    }
  }
}

async function getLineup() {
  const data = await getData();
  let line = [];
  let holder = 0;
  let holderPos;
  const json = JSON.stringify(data);

  const cap = 40000;
  loadProjections(data)

  qb = findMax(data, "QB");
  line.push(qb);
  rb1 = findMax(data, "RB");
  line.push(rb1);
  rb2 = findMax(data, "RB");
  line.push(rb2);
  wr1 = findMax(data, "WR");
  line.push(wr1);
  wr2 = findMax(data, "WR");
  line.push(wr2);
  wr3 = findMax(data, "WR");
  line.push(wr3);
  te = findMax(data, "TE");
  line.push(te);
  flex = findMax(data, "flex");
  line.push(flex);

  let total = qb.salary + rb1.salary + rb2.salary + wr1.salary + wr2.salary + wr3.salary + te.salary + flex.salary;

  while(total > cap) {
    delGSals(data, qb.salary, "QB");
    delGSals(data, rb1.salary, "RB");
    delGSals(data, rb2.salary, "RB");
    delGSals(data, wr1.salary, "WR");
    delGSals(data, wr2.salary, "WR");
    delGSals(data, wr3.salary, "WR");
    delGSals(data, te.salary, "TE");
    delGSals(data, flex.salary, "flex");

    if((line[0].player.projPt / line[0].salary) < (line[1].player.projPt / line[1].salary)){
      holderPos = 0;
      holder = (line[0].player.projPt / line[0].salary);
    }
    else{
      holderPos = 1;
      holder = (line[1].player.projPt / line[1].salary);
    }

    for(let i = 1; i < line.length; i++){
      if((line[i].player.projPt / line[i].salary) < holder){
        holderPos = i;
        holder = (line[i].player.projPt / line[i].salary);
      }
    }

    switch(holderPos) {
      case 0:
        qb = findMax(data, line[holderPos].position);
        line[holderPos] = qb;
        break;
      case 1:
        rb1 = findMax(data, line[holderPos].position);
        line[holderPos] = rb1;
        break;
      case 2:
        rb2 = findMax(data, line[holderPos].position);
        line[holderPos] = rb2;
        break;
      case 3:
        wr1 = findMax(data, line[holderPos].position);
        line[holderPos] = wr1;
        break;
      case 4:
        wr2 = findMax(data, line[holderPos].position);
        line[holderPos] = wr2;
        break;
      case 5:
        wr3 = findMax(data, line[holderPos].position);
        line[holderPos] = wr3;
        break;
      case 6:
        te = findMax(data, line[holderPos].position);
        line[holderPos] = te;
        break;
      case 7:
        flex = findMax(data, line[holderPos].position);
        line[holderPos] = flex;
        break;
    }

    total = qb.salary + rb1.salary + rb2.salary + wr1.salary + wr2.salary + wr3.salary + te.salary + flex.salary;
  }

  return JSON.stringify(line);
}

async function getData() {
  const dfsEntries = await dfsQuery(null, null);
  if(dfsEntries.length === 0) {
    return null
  }

  const promises = [];
  dfsEntries.forEach(function(dfsEntry) {
    if(dfsEntry.player) {
      promises.push(playerStatsQuery(dfsEntry.player.id))
    }
    else {
      promises.push(teamStatsQuery(dfsEntry.team.id))
    }
  });
  const stats = await Promise.all(promises);

  for(let i = 0; i < dfsEntries.length; i++) {
    dfsEntries[i].stats = stats[i]
  }

  return dfsEntries
}

module.exports = getLineup;