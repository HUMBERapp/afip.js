const Afip = require("../src/Afip");

const afip = new Afip({ CUIT: 20299012124 });

async function getCosechas() {
    const respuesta= await afip.RegisterCTG.getCosechas();
    console.log(JSON.stringify(respuesta));
}

getCosechas();