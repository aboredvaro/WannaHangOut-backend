import log from './log.js'

/**
 * @description Comprueba si el valor introducido es un número
 * @param {*} valor 
 * @returns Devuelve -1 en caso de error o el número en caso contrario
 */
export function getNumber(valor){
	var numero = parseInt(valor)
	if (isNaN(numero) || (typeof valor) === 'undefined'){
		return -1
	}
	return numero
}

/**
 * @description Comprueba si el parámetro introducido está sin definir o vacío
 * @param {*} valor 
 * @returns Devuelve False si contiene datos y True en caso contrario
 */
export function isEmpty(valor){
	if ((typeof valor) !== 'undefined' && JSON.stringify(valor) != '""') {
		return false
	}
	return true
}