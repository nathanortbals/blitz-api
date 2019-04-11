const dfsQuery = require('./dfsQuery');
const playerStatsQuery = require('./playerStatsQuery');
const teamStatsQuery = require('./teamStatsQuery');

//flex can be rb, wr, te, d, or k
async function getLineup() {
  //Load all players with their projected points, positions, cost, and point per dollar into array. Also load salary cap
  // let qb = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let rb1 = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let rb2 = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let wr1 = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let wr2 = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let wr3 = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let te = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let d = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let flex = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};
  // let holder = {proPts: 0, pos: '', cost: 0, ptPerDol: proPts / cost};

  let total = 0;

  //finds all max points for each positions then removes selected player from array
  const data = await getData();

  const json = JSON.stringify(data);

  // qb = Select max(qb_proj_points);
  // Remove qb from array
  //
  // rb1 = Select max(rb_proj_points)
  // Remove rb1 from array
  //
  // rb2= Select max(rb_proj_points)
  // Remove rb2 from array
  //
  // wr1 = Select max(wr_proj_points)
  // Remove wr1 from array
  //
  // wr2= Select max(wr_proj_points)
  // Remove wr2 from array
  //
  // wr3 = select Max(k_proj_points)
  // Remove wr3 from array
  //
  // te = select Max(Te_proj_points)
  // Remove te from array
  //
  // d = select max(d_proj_points)
  // Remove D from array
  //
  // flex = select max(flex_proj_points)
  // Remove flex from array

  //take out all players with salaries greater or equal to selected players salaries
  //for all positions
//   Remove all players with selected players salary or greater in that position
//
//   Total = qb.cost + rb1.cost + rb2.cost + wr1.cost + wr2.cost + wr3.cost + d.cost + flex.cost + te.cost;
//
//   //swap players based on difference between pt/dollar prioritizing higher pt/$
//   //repeat process until total salary is less than allowed salary cap
//   While (total > cap)
//   Holder = Qb
//   If(qb_pt_per_dollar - nextQB_pt_per_dollar > rb1_pt_per_dollar - nextRB1_pt_per_dollar)
//   If(qb_pt_per_dollar-  nextQB_pt_per_dollar > 0)
//   Holder = rb1
//   Repeat for all positions
// //put holder's next highest pt per dollar into line up
//   Swap holder with holder_next_pt_per_dollar
//     Recalculate total
//   loop
//   END

}

function getProjections(posPts, defAllowedYrd){
  // Load player stats into array (max 50 stats) --> yards[]
  var j=0, total = 0,  avg = 0,  proj = 0;

  //finding the weighted average yards from the past 50 games
  while (j < yards.length) {
    total += (1.25 - .01 * j) * yards[j];
    j++;
  }

  avg = total / yards.length;

  //here we take the average yards per game plus the defenses average allowed yards divided by 2
  //then multiply these estimated yards by the position's points per yard
  proj = (Avg + defAllowedYrd / 2) * posPts;

  return proj;
}

function loadProjs(){
  //Load all player names into players[]

  var i = 0;

  while (i < players.length){
    if(player[i].team.localecompare(player[i].awayTeamAbbr) == 0)
      getProjections(players[i].position, players[i].homeTeamAbbr);
    else
      getProjections(players[i].position, players[i].awayTeamAbbr);
  }
}

async function getData() {
  const dfsEntries = await dfsQuery(null, null);
  if(dfsEntries.length == 0) {
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

module.exports = getLineup;