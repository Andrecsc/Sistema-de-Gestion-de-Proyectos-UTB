require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./database/config');
const app = express();
const path = require("path");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc"); 

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:"Gestion de proyectos API",
            version: "1.0.0",
        },
        servers:[
            {
                url:"https://gestiondeproyectosswagger.herokuapp.com"
            }
        ]
    },
    apis:[`${path.join(__dirname,"./routes/*.js")}`],
};

dbConnection();

app.use(express.json());

app.use('/api',require('./routes/project'));
app.use('/api',require('./routes/staff'));
app.use('/api',require('./routes/role'));

app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})