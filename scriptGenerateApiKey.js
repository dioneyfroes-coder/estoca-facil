import sequelize from './server/config/dbconfig.js';
import Device from './server/models/deviceModel.js';
import { generateApiKey } from './server/utils/generateApiKey.js';

const setupDeviceTable = async () => {
  try {
    // Sincroniza o modelo com o banco de dados (cria a tabela se não existir)
    await sequelize.sync();

    // Gera a chave de API
    const apiKey = generateApiKey();
    console.log(apiKey); // Exibe a chave de API gerada

    // Insere os dados da conexão atual
    const device = await Device.create({
      nome: 'PC Estoque Produção',
      apiKey,
      dominio: 'http://localhost:5173',
      pcUser: 'estoque-pc',
      ativo: true,
      dataExpiracao: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 ano a partir de hoje
    });

    console.log('Dispositivo registrado com sucesso:', device.toJSON());
  } catch (error) {
    console.error('Erro ao configurar a tabela Device:', error.message);
  } finally {
    process.exit(); // Encerra o script
  }
};

setupDeviceTable();