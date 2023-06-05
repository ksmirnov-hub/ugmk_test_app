const SERVER_URL = 'http://localhost:3001/products';
const data = {};

export const userExist = ({login, exist = true}) => {
	return new Promise((resolve, reject) => {
		let result = data.find((item) => item.login === login);
		if (result) {
			if (exist) {
				reject('Пользователь с таким логином уже зарегистрирован');
			} else {
				resolve();
			}

		} else {
			if (exist) {
				resolve()
			} else {
				reject('Такого пользователя не существует');
			}

		}
	})
}

export const getData = async () => {
	let response = await fetch(SERVER_URL);
	return await response.json();
}

