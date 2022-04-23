class AccError extends Error {
	constructor(message) {
	    super(message);
		this.name = "AccoconutError";
	}
}

var singup = require('./user/singup.js')
var login = require('./user/login.js')

module.exports = (dirname) => {
	var exp = {
		user: {
		    login: function(json) {
				return login(dirname+"/databases/users.json", AccError, json)
			},
			singup: function(json) {
				return singup(dirname+"/databases/users.json", AccError, json)
			}
		}
	}
	
	console.log(
		exp.user.singup({
			pass: "senha", 
			email: "henriquefranchesco50num2@gmail.com", 
			tell: undefined,//"00 (00) 00000-0000", 
			name: "henrique", 
			lName: "franchesco de almeida do rosario", 
			birth: "17/06/2009",
			username: "henrique-o-dev"
		})
	)

	console.log(
		exp.user.login({
			pass: "senha", 
			ind: "henriquefranchesco50num2@gmail.com",
			exi: [
				"birth",
				"email",
				"name"
			]
		})
	)
}
	
