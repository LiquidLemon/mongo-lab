rs.initiate({_id: "shard1Set", members: [{_id: 0, host: "mongo-sh1-replica:27017"}]})
rs.addArb("mongo-sh1-arbiter:27017")
