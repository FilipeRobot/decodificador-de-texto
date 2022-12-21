function print(params) {
	alert(params);
}

function criptografar() {
	var texto = document.querySelector("#texto");

	if (texto.value == "") {
		print("Por favor, informe algum texto");
		texto.focus();
		return;
	}

	var expressao = /a|e|i|o|u/gi;

	var textoCriptografado = texto.value.replace(expressao, (match) => {
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
}

function descriptografar() {
	var texto = document.querySelector("#texto");

	if (texto.value == "") {
		print("Por favor, informe algum texto");
		texto.focus();
		return;
	}

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
}

function mostrarResultado(texto) {
	const padrao = document.querySelector("#padrao");
	padrao.style.display = "none";

	const textoCriptografado = document.querySelector("#texto-criptografado");

	var resposta = "<p>" + texto + "</p>";

	textoCriptografado.innerHTML = resposta;

	textoCriptografado.innerHTML +=
		'<button class="btn btn-segundario">Copiar</button>';

	textoCriptografado.style.display = "block";
}

const btnCriptografar = document.querySelector("#btn-criptografar");

const btnDescriptografar = document.querySelector("#btn-descriptografar");

btnCriptografar.onclick = criptografar;

btnDescriptografar.onclick = descriptografar;
