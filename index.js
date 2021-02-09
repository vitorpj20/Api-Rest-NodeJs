const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var DB = {
    games:[

        {
            id:23,
            title:'Jogo 1',
            year:2019,
            price:60
        },
        {
            id:65,
            title:'Jogo 2',
            year:2018,
            price:40
        },
        {
            id:2,
            title:'Jogo 3',
            year:2012,
            price:20
        }
    ]
}

//READ
app.get('/games',(req,res)=>{
    res.statusCode = 200
    res.json(DB.games)
})

//READ ESPECIFICO
app.get('/games/:id',(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)
        
        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})


//CREATE
app.post('/game',(req,res)=>{

    var {title, price, year} = req.body

    DB.games.push({
        id:34,
        title,
        price,
        year
    })

    res.sendStatus(200)
})


//DELETE
app.delete('/game/:id',(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g=> g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }
    }
})


//UPDATE
app.put('/game/:id',(req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)
        
        if(game != undefined){
            var {title, price, year} = req.body

            if(title != undefined){
                game.title = title
            }

            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }
})
app.listen(8081,()=>{
    console.log('Server criado.')
})