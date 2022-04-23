var DB = require("simple-ultra-db")
var sc = require('supremcript')

function trateExi(exi = []) {
	exi.forEach((v, i) => {
		if (
			v == "pass"
		) {
			exi.splice(i, 1)
		}	
	})
	
	return exi
}

module.exports = (database, AccError, json) => {
	var db = new DB(database)
	var login = new AccError("email/senha não existente")

	var {  ind, pass, exi  } = json
	
	exi = trateExi(exi)

	if (!ind || !pass) return new AccError("ind/senha not provided")

	if (!JSON.stringify(db.data).includes(ind)) return new AccError("ind not existent")


	Object.keys(db.data).forEach(v => {
		var d = db.data[v]

		if (
			d.email == ind ||
			d.tell == ind
		) {
			if (sc.SUPREM.decrypt(d.pass, pass, database.length, 1) == pass) {
				Object.keys(d).forEach(v2 => {
					if (
						v2 == "email" || 
						v2 == "tell" || 
						v2 == "confirmed"
					) return;

					if (v2 == "name") {
						d.name.firt = sc.SUPREM.decrypt(d.name.firt, pass, database.length, 1)
						d.name.last = sc.SUPREM.decrypt(d.name.last, pass, database.length, 1)
					} else d[v2] = sc.SUPREM.decrypt(d[v2], pass, database.length, 1)
				})

				login = {}
				
				exi.forEach((v) => {
					login[v] = d[v]
				})

				return login
			}		
		}
	})

	return login;
}