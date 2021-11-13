const {Router} = require('express');
const router = Router();
const url = 'https://pokeapi.co/api/v2';
const https = require('https');
const request = require("request-promise");

router.get('/', (req, res) =>{
    request({ uri: `${url}/pokemon`, json: true,  
    }).then(pokemons => { 
        res.json(pokemons);
    }).catch(err =>{
        res.status(400).json(err)
    })
});

router.get('/:firstPokemon/:secondPokemon', async (req, res) => {
    const [firstPokemon, secondPokemon] = await Promise.all([request({ uri: `${url}/pokemon/${req.params.firstPokemon}`, json: true,}), 
                                                             request({ uri: `${url}/pokemon/${req.params.secondPokemon}`, json: true,})])
    res.json([firstPokemon, secondPokemon]);                                                             
});

router.post('/fight', async (req, res) => {
    // tipos
    const [firstPokemonType, secondPokemonType] = await Promise.all([request({ uri: `${url}/type/${req.body.firstPokemon.id}`, json: true,}), 
                                                             request({ uri: `${url}/type/${req.body.secondPokemon.id}`, json: true,})])
                                                             

                                                     
    let pokemon1 = {
        score: 0,
        name: req.body.firstPokemon.name
    };
    let pokemon2 = {
        score: 0,
        name: req.body.secondPokemon.name
    };

    req.body.firstPokemon.types.forEach(type => {
        const damage1 = secondPokemonType.damage_relations.double_damage_to.find(t => t.name === type.type.name);
        if(damage1){
            pokemon1.score -= 70;
            pokemon2.score += 70;
        }
        const damage2 = secondPokemonType.damage_relations.half_damage_to.find(t => t.name === type.type.name)
        if(damage2){
            pokemon1.score -= 30;
            pokemon2.score += 30;
        } 
  
        
    }); 

    req.body.secondPokemon.types.forEach(type => {
        const damage1 = firstPokemonType.damage_relations.double_damage_to.find(t => t.name === type.type.name);
        if(damage1){
            pokemon2.score -= 70;
            pokemon1.score += 70;
        }

        const damage2 = firstPokemonType.damage_relations.half_damage_to.find(t => t.name === type.type.name)

        if(damage2){
            pokemon2.score -= 30;
            pokemon1.score += 30;
        }

    });            

    res.json({
        pokemon1,
        pokemon2
    });                                                             
});



module.exports = router;
