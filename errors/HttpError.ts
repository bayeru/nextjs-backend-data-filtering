export default class HttpError extends Error {

	constructor(message:string, public statusCode?:number) {
		super(message);
	}

	toJSON() {
		return {
			error: this.message,
			statusCode: this.statusCode
		}
	}
	
}