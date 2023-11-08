const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/multimarcas-frontend/dist/multimarcas-frontend'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/multimarcas-frontend/dist/multimarcas-frontend/index.html')
});


app.listen(PORT, () => {
    console.log(__dirname)
    console.log("Servidor rodando na porta " + PORT);
})

