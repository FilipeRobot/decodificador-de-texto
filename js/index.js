function print(params) {
	alert(params);
}

function criptografar() {
	var texto = document.querySelector("#texto");

	if (validarTexto(texto, texto.value.trim())) {
		var expressao = /a|e|i|o|u/gi;

		var textoCriptografado = texto.value.trim().replace(expressao, (match) => {
			switch (match) {
				case "a":
					match = "ai";
					break;
				case "e":
					match = "enter";
					break;
				case "i":
					match = "imes";
					break;
				case "o":
					match = "ober";
					break;
				case "u":
					match = "ufat";
					break;
			}

			return match;
		});

		mostrarResultado(textoCriptografado);
	} else {
		document.querySelector("#texto-criptografado").style.display = "none";
		document.querySelector("#texto-criptografado").innerHTML = '';
		document.querySelector("#padrao").style.display = "block";
	}
}

function descriptografar() {
	var texto = document.querySelector("#texto");

	if (validarTexto(texto, texto.value.trim())) {
		var expressao = /ai|enter|imes|ober|ufat/gi;

		var textoDescriptografado = texto.value.replace(expressao, (match) => {
			switch (match) {
				case "ai":
					match = "a";
					break;
				case "enter":
					match = "e";
					break;
				case "imes":
					match = "i";
					break;
				case "ober":
					match = "o";
					break;
				case "ufat":
					match = "u";
					break;
			}

			return match;
		});

		mostrarResultado(textoDescriptografado);
	} else {
		document.querySelector("#texto-criptografado").style.display = "none";
		document.querySelector("#texto-criptografado").innerHTML = '';
		document.querySelector("#padrao").style.display = "block";
	}
}

function mostrarResultado(texto) {
	const padrao = document.querySelector("#padrao");
	padrao.style.display = "none";

	const textoCriptografado = document.querySelector("#texto-criptografado");

	var resposta = `<p id="texto-resposta">${texto}</p>`;

	textoCriptografado.innerHTML = resposta;

	textoCriptografado.innerHTML +=
		'<input type="button" value="Copiar" class="btn btn-principal" id="btn-copiar">';

	textoCriptografado.style.display = "block";

	const btnCopiar = document.querySelector("#btn-copiar");
	btnCopiar.onclick = copiar;
}

async function copiar() {
	let texto = document.querySelector("#texto-resposta").textContent;
	await navigator.clipboard.writeText(texto);
	print("Texto copiado com sucesso!");

	document.querySelector("#texto-criptografado").style.display = "none";
	document.querySelector("#texto-criptografado").innerHTML = '';
	document.querySelector("#padrao").style.display = "block";
}

function validarTexto(input, value) {
	if (value == '') {
		inserirAviso("Por favor, informe algum texto");
		input.focus();
		return false;
	}
	if (/[A-Z-À-Ú-à-ú]|[0-9]|[;´`^~@!#$%^&*()/\\-_\[\]\{\}ºª+§]/.test(value)) {
		inserirAviso("Por favor, informe um texto válido");
		input.focus();
        return false; //caso em que o texto é invalido
	}
	limparAviso();
    return true; //caso em que o texto é valido
}

function inserirAviso(msg) {
	const aviso = document.getElementById("aviso");
	if (msg) {
		aviso.textContent = msg;
		aviso.classList.add('active');
	}
}

function limparAviso() {
	const aviso = document.getElementById("aviso");
	aviso.classList.remove("active");
}

const btnCriptografar = document.querySelector("#btn-criptografar");

const btnDescriptografar = document.querySelector("#btn-descriptografar");

const aviso = document.getElementById("aviso");

btnCriptografar.onclick = criptografar;

btnDescriptografar.onclick = descriptografar;

aviso.addEventListener("click", limparAviso);
aviso.addEventListener("click", () => {
	var texto = document.querySelector("#texto");
	texto.value = "";
	texto.focus();
})