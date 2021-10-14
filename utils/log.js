import process from 'process'

const log = (msg) => {
	process.env.NODE_ENV && console.log(msg)
}
export default log