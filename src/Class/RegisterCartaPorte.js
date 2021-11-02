const AfipWebService = require('./AfipWebService');

/**
 * SDK for AFIP Register Scope Five (ws_sr_padron_a5)
 * 
 * @link http://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf WS Specification
 **/
module.exports = class RegisterCartaPorte extends AfipWebService {
	constructor(afip){
		const options = {
			soapV12: false,
			WSDL: 'wscpe-prod.wsdl',
			URL: 'https://serviciosjava.afip.gob.ar/wscpe/services/soap',
			WSDL_TEST: 'wscpe-homo.wsdl',
			URL_TEST: 'https://fwshomo.afip.gov.ar/wscpe/services/soap',
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

	async getProvinces() {
		let { token, sign } = await this.afip.GetServiceTA('wscpe');
		console.log("token", token);
		console.log("sign", sign);
		const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
		}
		return this.executeRequest('consultarProvincias', params);
	}

	async getCities(data) {
		let { token, sign } = await this.afip.GetServiceTA('wscpe');
		const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('consultarLocalidadesPorProvincia', params);
	}

	async getCitiesByProducer(cuitProductor) {
		let { token, sign } = await this.afip.GetServiceTA('wscpe');
		const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: {
				cuit: cuitProductor
			},
		}
		return this.executeRequest('consultarLocalidadesProductor', params);
	}

	async getGrainTypes() {
		let { token, sign } = await this.afip.GetServiceTA('wscpe');
		const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
		}
		return this.executeRequest('consultarTiposGrano', params);
	}

	async getLastOrderNumber(data) {
		let { token, sign } = await this.afip.GetServiceTA('wscpe');
		const headers = {
			token, sign, cuitRepresentada: data.cuit || this.afip.CUIT
		}
		if(data.cuit) delete data.cuit;
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('consultarUltNroOrden', params);
	}

    async createCPE(data) {
        let { token, sign } = await this.afip.GetServiceTA('wscpe');
        const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('autorizarCPEAutomotor', params);
    }

	async anularCPE(data) {
        let { token, sign } = await this.afip.GetServiceTA('wscpe');
        const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('anularCPE', params);
    }

	async consultarCPE(data) {
        let { token, sign } = await this.afip.GetServiceTA('wscpe');
        const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('consultarCPEAutomotor', params);
    }

	async consultarCPEPendientesDeResolucion(data) {
        let { token, sign } = await this.afip.GetServiceTA('wscpe');
        const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: data,
		}
		return this.executeRequest('consultarCPEPPendientesDeResolucion', params);
    }

	async consultarPlantas({ cuit }) {
        let { token, sign } = await this.afip.GetServiceTA('wscpe');
        const headers = {
			token, sign, cuitRepresentada: this.afip.CUIT
		}
		const params = {
			auth: headers,
			solicitud: {
				cuit
			},
		}
		console.log(params);
		return this.executeRequest('consultarPlantas', params);
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

