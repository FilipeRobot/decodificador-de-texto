/**
 * Criptografa texto informado
 */
function criptografar() {
	let entradaTexto = getEntradaTexto();

	if (entradaTexto) {
		let entradaTextoValue = entradaTexto.value;
		let expressao = /a|e|i|o|u/gi;

		let textoCriptografado = entradaTextoValue
			.trim()
			.replace(expressao, (match) => {
				switch (match) {
					case 'a':
						match = 'ai';
						break;
					case 'e':
						match = 'enter';
						break;
					case 'i':
						match = 'imes';
						break;
					case 'o':
						match = 'ober';
						break;
					case 'u':
						match = 'ufat';
						break;
				}

				return match;
			});

		mostrarResultado(textoCriptografado);
	} else {
		limparResposta();
	}
}

/**
 * Descriptografa texto informado
 */
function descriptografar() {
	let entradaTexto = getEntradaTexto();

	if (entradaTexto) {
		let entradaTextoValue = entradaTexto.value;
		var expressao = /ai|enter|imes|ober|ufat/gi;

		var textoDescriptografado = entradaTextoValue
			.trim()
			.replace(expressao, (match) => {
				switch (match) {
					case 'ai':
						match = 'a';
						break;
					case 'enter':
						match = 'e';
						break;
					case 'imes':
						match = 'i';
						break;
					case 'ober':
						match = 'o';
						break;
					case 'ufat':
						match = 'u';
						break;
				}

				return match;
			});

		mostrarResultado(textoDescriptografado);
	}

	var texto = document.querySelector('#texto');

	if (validarTexto(texto, texto.value.trim())) {
		var expressao = /ai|enter|imes|ober|ufat/gi;

		var textoDescriptografado = texto.value.replace(expressao, (match) => {
			switch (match) {
				case 'ai':
					match = 'a';
					break;
				case 'enter':
					match = 'e';
					break;
				case 'imes':
					match = 'i';
					break;
				case 'ober':
					match = 'o';
					break;
				case 'ufat':
					match = 'u';
					break;
			}

			return match;
		});

		mostrarResultado(textoDescriptografado);
	} else {
		document.querySelector('#texto-criptografado').style.display = 'none';
		document.querySelector('#texto-criptografado').innerHTML = '';
		document.querySelector('#padrao').style.display = 'block';
	}
}

/**
 *
 * @param {*} texto Texto que será mostrado para o usuário, seja ele criptografado ou descriptografado
 */
function mostrarResultado(texto) {
	const respostaPadrao = getElementById('resposta-padrao');
	const respostaResultado = getElementById('resposta-resultado');
	const respostaTexto = getElementById('resposta-texto');

	respostaPadrao.classList.add('ocultar');
	respostaResultado.classList.remove('ocultar');

	respostaTexto.textContent = texto;

	const btnCopiar = getElementById('btn-copiar');

	btnCopiar.addEventListener('click', copiar);
}

/**
 *
 * @param {*} input Elemento html que será validado
 * @param {*} value Valor, texto que será validado
 * @returns FALSO caso o texto seja inválido, VERDADEIRO caso o texto seja valido
 */
function validarTexto(input, value) {
	if (value == '') {
		inserirAviso('Por favor, informe algum texto');
		input.focus();
		return false;
	}
	if (/[A-Z-À-Ú-à-ú]|[0-9]|[;´`^~@!#$%^&*()/\\-_\[\]\{\}ºª+§]/.test(value)) {
		// /[A-Z-À-Ú-à-ú]|[0-9]|[;´`^~@!#$%^&*()/\\-_\[\]\{\}ºª+§]/ -> Expressão regular (RegExp) para os caracteres não aceitos pelo decodificador
		// .test(value) -> Testa/Compara o valor (string) da variável "value" com a RegExp e caso exista um caractere inválido na string verificada informa
		// o usuário
		inserirAviso('Por favor, informe um texto válido');
		input.focus();
		return false; //caso em que o texto é invalido
	}
	limparAviso();
	return true; //caso em que o texto é valido
}

/**
 * Copia o texto da resposta
 */
async function copiar() {
	let respostaTexto = getElementById('resposta-texto').textContent;

	await navigator.clipboard.writeText(respostaTexto);
	print('Texto copiado com sucesso!');

	limparResposta();
	limparEntrada();
}

/**
 * Reseta a tela de respostas
 */
function limparResposta() {
	const respostaPadrao = getElementById('resposta-padrao');
	const respostaResultado = getElementById('resposta-resultado');
	const respostaTexto = getElementById('resposta-texto');
	const btnCopiar = getElementById('btn-copiar');

	respostaTexto.textContent = '';

	btnCopiar.removeEventListener('click', copiar);

	respostaResultado.classList.add('ocultar');
	respostaPadrao.classList.remove('ocultar');
}

/**
 * Apaga os avisos da tela
 */
function limparAviso() {
	const aviso = getElementById('informacoes-aviso');
	aviso.textContent = '';
	aviso.classList.remove('mostrar');
}

/**
 * Resetar a entrada
 */
function limparEntrada() {
	const entradaTexto = getElementById('entrada-texto');
	entradaTexto.value = '';
	entradaTexto.focus();
}

/**
 *
 * @param {*} msg Mensagem que será mostrada no aviso
 */
function inserirAviso(msg) {
	const aviso = getElementById('informacoes-aviso');
	if (msg) {
		aviso.textContent = msg;
		aviso.classList.add('mostrar');
	}
}


/**
 *
 * @returns retorna o elemento html de entrada de texto
 */
function getEntradaTexto() {
	const entradaTexto = getElementById('entrada-texto');

	if (validarTexto(entradaTexto, entradaTexto.value)) {
		return entradaTexto;
	}
}

/**
 * Essa função simplifica a chamada do comando
 *
 * document.getElementById('string com o id')
 * 
 * @param {*} id informar o ID do elemento HTML que deve ser retornado
 * @returns Elemento HTML ou Null caso não exista um elemento com a ID informada
 */
function getElementById(id) {
	return document.getElementById(id);
}

function print(params) {
	alert(params);
	//console.log(params);
}

const btnCriptografar = getElementById('btn-criptografar'); //document.querySelector('#btn-criptografar');

const btnDescriptografar = getElementById('btn-descriptografar'); //document.querySelector('#btn-descriptografar');

const informacoesAviso = getElementById('informacoes-aviso');

btnCriptografar.addEventListener('click', criptografar);

btnDescriptografar.addEventListener('click', descriptografar);

informacoesAviso.addEventListener('click', limparAviso);
informacoesAviso.addEventListener('click', limparResposta);
