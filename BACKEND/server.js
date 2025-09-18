const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'your-secret-key';

app.post('/api/gerar-link-publico', (req, res) => {
    const {nome} = req.body;

    if (!nome) {
        return res.status(400).json({success: false, error: 'O nome é obrigatório'});
    }
    const payload = { nome: nome };
    const options = { expiresIn: '24h' };
    const token = jwt.sign(payload, JWT_SECRET, options);
 
    const frontendUrl = 'http://127.0.0.1:5500';
    
    const linkFinal = `${frontendUrl}/frontend/aniversario.html?token=${token}`;
    
   
    res.json({ success: true, link: linkFinal });
    

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});
