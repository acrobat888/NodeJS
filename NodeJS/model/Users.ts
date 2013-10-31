//  Typescript source code

var db = require('../lib/db_test_access');

var UserSchema = new db.Schema({
    username: { type: String, unique: true }
    , password: String
})

var MyUser = db.mongoose.model('Users', UserSchema);

//
// Exports
// 
module.exports.addUser = addUser;

//
// Add a user to the db
//
function addUser(username, password, callback) {
    var instance = new MyUser();

    instance.username = username;
    instance.password = password;
    instance.save(function (error) {
        if (error) {
            callback(error);
        } else {
            callback(null, instance);
        }
    });
}