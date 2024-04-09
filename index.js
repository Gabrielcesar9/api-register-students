const express = require('express')
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors({
    origin:'*',
    methods:['GET','PUT', 'POST','DELETE']
}))


app.get('/check',jsonParser, (req, res)=>{
    const uri = "mongodb+srv://212083:ForIonia@achilles.ckale.mongodb.net/";
    const client = new MongoClient(uri);
    async function run() {
    try {
        await client.connect();
        const database = client.db('flyenglish');
        const registries = database.collection('prematricula');
        const dbquery = {cpf: req.query.payload};
        const result = await registries.findOne(dbquery)
        if (result){
            res.send({message:'registered'})
        } else{
            res.send({message:'not-registered'})
        }
    } finally {
        await client.close();
        }
    }
    run().catch(console.dir);
});

app.post('/matriculate',jsonParser, (req,res)=>{
    const values = req.body.values
    const uri = "mongodb+srv://212083:ForIonia@achilles.ckale.mongodb.net/";
    const client = new MongoClient(uri);
    async function run() {
    try {
        const database = client.db('flyenglish');
        const premat = database.collection('prematricula');
        const doc = {
            unidade:values.unidade,
            nome:values.nome,
            cpf:values.cpf,
            datadenascimento:values.datadenascimento,
            endereco:values.endereco,
            telefonedoaluno:values.telefonedoaluno,
            emaildoaluno:values.emaildoaluno,
            serie:values.serie,
            periodo:values.periodo,
            responsavel:values.responsavel,
            cpf2:values.cpf2,
            datadenascimento2:values.datadenascimento2,
            endereco2:values.endereco2,
            telefone2:values.telefone2,
            email2:values.email2,
            profissao:values.profissao,
            ocontato:values.ocontato,
        }
        await premat.insertOne(doc).then(result=>{console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
            
         );}).then(
            res.send({message:'success'})
        )
    } finally {
        await client.close();
    }}
    run();
    res.send('Hello, World!')
})

app.post('/managerlogin', jsonParser, (req,res)=>{
    const login = req.body.login
    const senha = req.body.senha
    if(login=='analia09' && senha =='1234'){
        res.send({status:200})
    }
})

app.get('/base', jsonParser, (req,res)=>{
    const uri = "mongodb+srv://212083:ForIonia@achilles.ckale.mongodb.net/";
    const client = new MongoClient(uri);
    let registers = []
    async function run() {
    try {
        await client.connect();
        const database = client.db('flyenglish');
        const registries = database.collection('prematricula');
        await registries.find({}).forEach(doc=>{
            registers.push(doc)
        });
    } finally {
        await client.close();
        console.log('registers',registers)
        res.send({body:registers})
        }
    }
    run().catch(console.dir);

})

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`)
})