const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // No puede ser nulo, no permito que este vacio
    },

    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    season: {
        type: DataTypes.ENUM('Primavera', 'Verano', 'Otoño', 'Invierno'),
        allowNull: false,
    },

  });
};
