var DB = require("simple-ultra-db")
var sc = require('supremcript')
var nodemailer = require('nodemailer');
var remetente = nodemailer.createTransport({
	service: "gmail",
	secure: true,
	auth: {
		user: process.env['email'],
		pass: process.env['senha'] 
	}
});

module.exports = (database, AccError, json) => {
	var db = new DB(database)
	var data = JSON.stringify(db.data)
	var {tell, email, name, lName, birth, pass, username} = json
	var ind = Date.now();

	if (!tell) tell = "non"
	if (!email) email = "non"

	if (!email.includes("@")) return new AccError("email mal constituido")

	if (data.includes(tell) && tell != "non") {
   		return new AccError("esse telefone ja esta sendo usado")
	} else {
		if (data.includes(email) && email != "non") {
			return new AccError("esse email ja esta sendo usado")
		} else {
			if (data.includes(username)) {
				return new AccError("esse usuario ja esta sendo usado")
			} else {
				db.set(ind, {
					email,
					tell,
					name: {
						firt: sc.SUPREM.encrypt(name, pass, database.length, 1),
						last: sc.SUPREM.encrypt(lName, pass, database.length, 1)
					},
					birth: sc.SUPREM.encrypt(birth, pass, database.length, 1),
					pass: sc.SUPREM.encrypt(pass, pass, database.length, 1),
					username: sc.SUPREM.encrypt(username, pass, database.length, 1),
					confirmed: {
						tell: false,
						mail: false
					}
				})

				var r = ""

				r = "account crated"

				if (email != "non") {
					var emailASerEnviado = {
						from: process.env['email'],
						to: email,
						subject: 'confirmação de email',
						html: 'clique <a>aqui</a> para verificar o email',
					};
					
					remetente.sendMail(emailASerEnviado, function(error){
						if (error) {
							console.log(error)
						}
					});

					return r
				} else return r;
			}
		}
	}
}

/*
{
	pass: "senha", 
	email: "email@gmail.com", 
	tell: "00 (00) 00000-0000", 
	name: "henrique", 
	lName: "franchesco de almeida do rosario", 
	birth: "17/06/2009"
}
*/