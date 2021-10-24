import log from './log.js'
import sjcl from 'sjcl'

/**
 * @description Comprueba si el valor introducido es un entero
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
 * @description Comprueba si el valor introducido es un Float
 * @param {*} valor 
 * @returns Devuelve -1.0 en caso de error o el número en caso contrario
 */
export function getNumberFloat(valor){
	var numero = parseFloat(valor)
	if (isNaN(numero) || (typeof valor) === 'undefined'){
		return -1.0
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

/**
 * @description Calcula la cadena sha256 de un string
 * @param {*} message 
 * @returns string
 */
export function sha256(message) {
	const myBitArray = sjcl.hash.sha256.hash(message)
	const myHash = sjcl.codec.hex.fromBits(myBitArray)
	return myHash.toUpperCase()
}