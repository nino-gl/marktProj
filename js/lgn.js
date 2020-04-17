window.onload = () => {
	Products();
	
	const headerRegisterBtn = document.querySelector('#headerRegisterBtn');
	const closeBtn = document.querySelector('.close-btn');
	const formRegisterBtn = document.querySelector('#registrationBtn')
	const guestButtons = document.querySelector('#guestButtons')
	const userButtons = document.querySelector('#userButtons')
	const userName = document.querySelector('#userName')
	const submitBtn = document.querySelector('#submitBtn')
	const headerSignInBtn = document.querySelector('#headerSignInBtn');
	const closeSign = document.querySelector('.close-sign');
	
	const email = "admin@demo.ge";
	const password = "010101";
	const signinBtn = document.querySelector("#signinBtn");
	const emailInput = document.querySelector("#email");
	const passwordInput = document.querySelector("#password");

	const active = JSON.parse(localStorage.getItem('active'));


	//SIGN IN FORM show/hide
	let authorization = document.querySelector('.authorization');

	headerSignInBtn.addEventListener('click', (event) => {
		authorization.classList.add('active');
	});
	closeSign.addEventListener('click', (event) => {
		authorization.classList.remove('active');
	})


	//REGISTRATION FORM show/hide
	let registration = document.querySelector('.registration');

	headerRegisterBtn.addEventListener('click', (event) => {
		registration.classList.add('active');
	});
	closeBtn.addEventListener('click', (event) => {
		registration.classList.remove('active');
	})

	submitBtn.addEventListener('click', (event) => {
		let fname = document.querySelector('#fname')
		let lname = document.querySelector('#lname')
		let balance = document.querySelector('#balance')
		let idnumber = document.querySelector('#personalNumber')
		let password = document.querySelector('#reg-password')
		let email = document.querySelector('#reg-email')
		let errors = []
		if (fname.value == '' || fname.value.trim() == '') {
			errors.push('shecdoma saxelshi')
		}
		if (lname.value == '' || lname.value.trim() == '') {
			errors.push('shecdoma gvarshi')
		}
		if (password.value == '' || password.value.trim() == "") {
			errors.push('shecdoma parolshi')
		}

		if (errors.length) {
			let alert = document.querySelector('.alert.alert-warning')
			let errorsOl = alert.querySelector('.errors')
			alert.classList.remove('hidden')
			for (let i = 0; i < errors.length; i++) {
				errorsOl.innerHTML += `<li class="error--item" >${errors[i]}</li>`
			}
		}
		else {
			let newUser = User(fname.value, lname.value, balance.value, idnumber.value, password.value, email.value)
			let users = JSON.parse(localStorage.getItem('users'))
			if (!users) {
				users = []
			}
			users.push(newUser)
			localStorage.setItem('users', JSON.stringify(users))
			localStorage.setItem('active.User',newUser.idnumber)
			registration.classList.remove('active');
			checkUser();
		}

	})

	signinBtn.addEventListener('click', (event) => {
		let email = document.querySelector('#email')
		let password = document.querySelector('#password')
		let users = JSON.parse(localStorage.getItem('users'))
		let user = users.find((u) => {
			return (u.password == password.value && u.email == email.value)
		})
		if (!user) {
			alert('gtxovT scadoT Tavidan')
		}
		else {
			localStorage.setItem('active.User', user.idnumber)
			checkUser();
		}
		password.value = ''
		email.value = ''
	})
	function checkUser() {
		let idNumber = localStorage.getItem('active.User')
		if (idNumber || idNumber != '') {

			let user = findUserById(idNumber);
			
			userName.textContent = `${user.fname} ${user.lname}`
			guestButtons.classList.add('hidden')
			userButtons.classList.remove('hidden')
			authorization.classList.remove('active')
			let logout = document.querySelector('#logout')
			logout.addEventListener('click', function logoutFunc(event) {
				logout.removeEventListener('click', logoutFunc)
				localStorage.setItem('active.User', '')
				location.reload()
			})
		}
	}

	checkUser();
	function findUserById(idNumber) {
		let users = JSON.parse(localStorage.getItem('users'))
		let user = users.find((u) => {
			return (u.idnumber === idNumber)
		})
		return user;
	}

	function User(fname, lname, balance, idnumber, password, email) {
		return {
			fname,
			lname,
			balance,
			idnumber,
			password,
			email,
		}
	}
}