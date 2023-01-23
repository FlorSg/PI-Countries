const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    id: {
      type: DataTypes.STRING(3),  //aca le puse 3 porque en la API los id tienen 3 caracteres
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capital: {
      type: DataTypes.STRING,
      defaultValue: 'No capital',
      allowNull: false,
    },
    
    subregion: {
      type: DataTypes.STRING,
      defaultValue: 'No data',
    },

    area: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    population: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    

  },{
    timestamps: false,
  });
};
