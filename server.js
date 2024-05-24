const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/sellingpage-frontend/dist/sellingpage-frontend'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/sellingpage-frontend/dist/sellingpage-frontend/index.html')
});


app.listen(PORT, () => {
    console.log(__dirname)
    console.log("Servidor rodando na porta " + PORT);
})

