
const fs = require("fs");
const Afip = require("../src/Afip");

const date = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000
).toISOString();

console.log(date);

const prod = {
  CUIT: 30715441205,
  production: true,
  cert: "cert-prod",
  key: "key-prod",
  json: "examples/ejemploProd.json"
};

const homo = {
  CUIT: 20299012124,
  cert: "cert-test",
  key: "key-test",
  json: "examples/ejemploTest.json"
};

const afip = new Afip(homo);

const data = JSON.parse(fs.readFileSync(homo.json))

async function createCPE() {
  const { respuesta } = await afip.RegisterCartaPorte.createCPE(data);
  console.log(respuesta);
  const { errores } = respuesta;
  if (errores) {
    console.error(errores);
  }
}

async function anularCPE() {
  const data = {
    cartaPorte: {
      tipoCPE: 74,
      sucursal: 0,
      nroOrden: 12,
    },
  };
  const respuesta = await afip.RegisterCartaPorte.anularCPE(data);
  /*if (errores) {
    console.error(errores);
  } else {*/
    console.log(JSON.stringify(respuesta));
  //}
}

async function consultarCPE() {
  const data = {
    cuitSolicitante: 20111111112,
    cartaPorte: {
      tipoCPE: 74,
      sucursal: 1,
      nroOrden: 500,
    },
  };
  console.log(`ejecutando consulta para`, data);
  const { respuesta } = await afip.RegisterCartaPorte.consultarCPE(data);
  let { errores } = respuesta;
  console.log(respuesta);
  if (errores) {
    console.error(errores);
  }
}

async function getProvinces() {
  const { respuesta } = await afip.RegisterCartaPorte.getProvinces();
  for (const provincia of respuesta.provincia) {
    console.log(provincia);
  }
}

async function getCities() {
  const { respuesta } = await afip.RegisterCartaPorte.getCities({
    codProvincia: 1,
  });
  console.log(
    respuesta.localidad.find(({ descripcion }) => descripcion.includes("PEHUA"))
  );
}

async function getGrainTypes() {
  const { respuesta } = await afip.RegisterCartaPorte.getGrainTypes();
  console.log(respuesta);
}

async function getLastOrderNumber() {
  const { respuesta } = await afip.RegisterCartaPorte.getLastOrderNumber({
    sucursal: 1,
    tipoCPE: 74,
  });
  console.log(respuesta);
}

async function getPlants() {
  const { respuesta } = await afip.RegisterCartaPorte.consultarPlantas({
    cuit: 30500858628,
  });

  console.log(respuesta.errores);
}

// getProvinces();
//getCities();
//getLastOrderNumber();
 createCPE();
//anularCPE();
//consultarCPE();
//getGrainTypes();
//getPlants();
