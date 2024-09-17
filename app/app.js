const express = require("express")
const app = express()
const port = 8080

app.get('/sobre-20', (req,res) => {
    res.send("<h1>titulo</h1>")
})

app.listen(port, () => {
    console.log("ESta funcionando")

})
