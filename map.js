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
  for (var i = 0; i < 3; i++) {
    var rank = i + 1;
    var code = 6 - i;
    match.broadcast("                              `" + code + "`l" + rank + "st`r\n`2               " + playerArray[i]["name"] + "`r: `d`l" + playerArray[i]["kills"] + " kills");
  }
});

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
