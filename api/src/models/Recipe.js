const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
       type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
     /*  type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true */
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     nivel: {
      type: DataTypes.INTEGER,
      
    },
     pasos: {
      type: DataTypes.STRING,
     
    },
    imagen: {
      type: DataTypes.STRING,
     
    },
  });
};
