var playerArray = new Array();
match.on('end', function() {
  var players = match.getPlayers();
  for (var i = 0; i < players.length; i++) {
    if (players[i].getTeam() == null) {
      continue;
    }
    var player = players[i];
    playerArray.push({
      name: player.getName(),
      kills: player.getKills()
    });
    players[i].playSound("LEVEL_UP", 1, 1);
  }

  sort(playerArray, "kills", "DESC");
  for (var i = 0; i < 5; i++) {
    var rank = i + 1;
    var code = 6 - i;
    match.broadcast("`" + code + "`l" + getRank(rank) + " `r[ `2" + playerArray[i]["name"] + "`r: `d`l" + playerArray[i]["kills"] + " kills `r]");
  }
});

function getRank(rank) {
    var no = (rank + '').substr(-1);
    if (no == '1') {
       return rank + 'st'
    } else if (no == '2') {
       return rank + 'nd';
    } else if (no == '3') {
       return rank + 'rd';
    } else {
       return rank + 'th';
    }
}

function sort(ary, key, order) {
  var reverse = 1;
  if (order && order.toLowerCase() == "desc")
    reverse = -1;
  ary.sort(
    function(a, b) {
      if (a[key] < b[key])
        return -1 * reverse;
      else if (a[key] == b[key])
        return 0;
      else
        return 1 * reverse;
    });
}
