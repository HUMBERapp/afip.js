const AfipWebService = require('./AfipWebService');

/**
 * SDK for AFIP Register Scope Five (ws_sr_padron_a5)
 * 
 * @link http://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf WS Specification
 **/
module.exports = class RegisterCTG extends AfipWebService {
	constructor(afip){
		const options = {
			soapV12: false,
			WSDL: 'ws_sr_padron_a5-production.wsdl',
			URL: 'https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5',
			WSDL_TEST: 'wsctg.wsdl',
			URL_TEST: 'https://fwshomo.afip.gov.ar/wsctg/services/CTGService_v4.0',
			afip
		}

		super(options);
	}
	/**
	 * Asks to web service for servers status {@see WS 
	 * Specification item 3.1}
	 *
	 * @return object { appserver : Web Service status, 
	 * dbserver : Database status, authserver : Autentication 
	 * server status}
	 **/
	async getServerStatus() {
		return this.executeRequest('dummy');
	}

	async getCosechas() {
		let { token, sign } = await this.afip.GetServiceTA('wsctg');
		console.log("token", token);
		console.log("sign", sign);
		const headers = {
			token, sign, cuitRepresentado: this.afip.CUIT
		}
		const params = {
			request: { auth: headers },
		}
		return this.executeRequest('consultarCosechas', params);
	}

	/**
	 * Send request to AFIP servers
	 * 
	 * @param operation SOAP operation to execute 
	 * @param params Parameters to send
	 *
	 * @return mixed Operation results 
	 **/
	async executeRequest(operation, params = {})
	{
		let results = await super.executeRequest(operation, params);

		return results;
	}
}

