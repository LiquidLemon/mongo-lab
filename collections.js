// > use test
sh.enableSharding("test")
db.adminCommand({movePrimary: "test", to: "shard1Set"})
for (var i = 0; i < 20; i++) {
  db.a.insert({value: i});
}

db.createCollection("b")
db.b.ensureIndex({value: "hashed"})
sh.shardCollection("test.b", {value: "hashed"})
for (var i = 0; i < 20; i++) {
  db.b.insert({value: i});
}


sh.addShardToZone("shard2Set", "Zone2")
sh.addShardToZone("shard3Set", "Zone3")
db.createCollection("c")
db.c.ensureIndex({value: 1})
sh.updateZoneKeyRange("test.c", {value: MinKey}, {value: 10}, "Zone2")
sh.updateZoneKeyRange("test.c", {value: 10}, {value: MaxKey}, "Zone3")
sh.shardCollection("c", {value: 1})

for (var i = 0; i < 20; i++) {
  db.c.insert({value: i});
}
