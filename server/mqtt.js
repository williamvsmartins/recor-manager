const mqtt = require('mqtt')
  , request = require('request-promise')
  , config = require('./config/config');
const { user } = require('./config/mysql');


const client = mqtt.connect(`mqtt://${config.broker.host}`);

const rfidPingTopic = 'ping';
const rfidPongTopic = 'pong';

client.on('connect', () => {
  console.log(`Connection successfully to ${config.broker.host}`);
  client.subscribe(rfidPingTopic);
});


client.on('message', (topic, message) => {
  if (rfidPingTopic !== topic) return;

  const tag = message.toString();

  authorizeRfid(topic, tag);
});


const authorizeRfid = (topic, tag) => {
  request(`${config.api.endpoints.aluno}tag/${tag}`)
    .then((data) => JSON.parse(data))
    .then((result) => formatPayload(result))
    .then((payload) => createLog(payload))
    .then((status) => sendPong(status))
    .catch((err) => console.log(err));

};
const formatPayload = (result) => {
  const payload = {
    'data': result,
    'status': 0,
  };

  if (!result.tag || result.state === 0) {
    return payload;
  }
  payload.status = 1;
  return payload;
};

//PEGAR DATA ATUAL

var data = new Date();
var dia = String(data.getDate()).padStart(2, "0");
var mes = String(data.getMonth() + 1).padStart(2, "0");
var ano = data.getFullYear();
dataAtual = ano + "-" + mes + "-" + dia;





const createLog = (payload) => {
  if (!payload.data.tag) return payload.status;

  const log = {
    name: payload.data.name,
    data: dataAtual,
    id_user: payload.data.id_user,
    id_aluno: payload.data.id,
    id_disciplina: payload.data.id_disciplina,
    status: payload.status
  };


  const options = {
    method: 'POST',
    uri: config.api.endpoints.chamada,
    body: log,
    json: true
  };

  request(options)
    .then((res) => console.log(res))
    .catch((err) => console.log('err'));

  return payload.status;
};

const sendPong = (state) => {
  client.publish(rfidPongTopic, state.toString());
};
