# NextGenHr




1 ) Go To This Path : C:\Program Files\MongoDB\Server\8.2\bin and mongod.cfg : security enable
2) server restart from service 
3) on mongosh terminal 1) use admin command and create new user as admin 


db.createUser(
  {
    user: "admin",
    pwd: "admin123", // Use passwordPrompt() for security
    roles: [
      { role: "root", db: "admin" },
    ]
  }
)

db.createUser(
  {
    user: "user1",
    pwd: "user123", // Use passwordPrompt() for security
    roles: [
      { role: "read", db: "employeeDb" },
    ]
  }
)

db.employees.insertOne(
	{name : 'Jigar Shah'},
	{age : 35}
)

 db.employees.deleteOne(
 {_id: ObjectId('6902d5d502d2fd7f64cebeb7')}
 )