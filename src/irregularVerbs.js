export const verbs = {
    pretéritoIndefinido: {
        ser: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
        ir: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
        hacer: ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
        dar: ["di", "diste", "dio", "dimos", "disteis", "dieron"],
        loseI: ["decir", "traer", "conducir", "producir"],
        estar: ["estuv"],
        tener: ["tuv"],
        andar: ["anduv"],
        venir: ["vin"],
        poder: ["pud"],
        poner: ["pus"],
        querer: ["quis"],
        saber: ["sup"],
        decir: ["dij"],
        traer: ["traj"],
        conducir: ["conduj"],
        producir: ["produj"],
        exceptions: ["estar", "tener", "andar", "venir", "poder", "poner", "querer", "saber", "decir", "traer", "conducir", "producir"],
        conPretIndef(verb) {
            let o = verbs.pretéritoIndefinido
            if (o[verb].length !== 6) {
                let newWord = []
                let endings = ["e", "iste", "o", "imos", "isteis", "ieron"]
                let root = o[verb]
                if (o.loseI.includes(verb)) {
                    console.log("looseI")
                    endings.map((e, i) => { i < 5 ? newWord.push(root + e) : newWord.push(root + e.slice(1)) })
                }
                endings.map((e) => newWord.push(root + e))
                return newWord
            } else {
                return o[verb]
            }

        }
    }
}