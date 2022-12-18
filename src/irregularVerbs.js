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
                    endings.map((e, i) => i < 5 ? newWord.push(root + e) : newWord.push(root + e.slice(1)))
                }
                endings.map((e) => newWord.push(root + e))
                return newWord
            } else {
                return o[verb]
            }

        }
    },
    presenteIndicativo: {
        ser: ["soy", "eres", "es", "somos", "sois", "son"],
        estar: ["estoy", "estás", "está", "estamos", "estáis", "están"],
        ir: ["voy", "vas", "va", "vamos", "vais", "van"],
        oír: ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
        oler: ["huelo", "hueles", "huele", "olemos", "oléis", "huelen"],
        // -uir => "y" before the ending, not in 1 and 2 p. plural 
        sustituir: ["sustituyo", "sustituyes", "sustituye", "sustituimos", "sustituís", "sustituyen"],
        espiar: ["espío", "espías", "espía", "espiamos", "espiáis", "espían"],
        actuar: ["actúo", "actúas", "actúa", "actuamos", "actuáis", "actúan"],
        prohibir: ["prohíbo", "prohíbes", "prohíbe", "prohibimos", "prohibís", "prohíben"],
        reunir: ["reúno", "reúnes", "reúne", "reunimos", "reunís", "reúnen"],
        asir: ["asgo"],
        Caber: ["quepo"],
        caer: ["caigo"],
        dar: ["doy"],
        decir: ["digo"],
        hacer: ["hago"],
        poner: ["pongo"],
        saber: ["sé"],
        salir: ["salgo"],
        tener: ["tengo"],
        traer: ["traigo"],
        valer: ["valgo"],
        venir: ["vengo"],
        ver: ["veo"],
        mecer: ["mezo"],
        coger: ["cojo"],
        distinguir: ["distingo"],
        delinquir: ["delinco"],
        // -vocal + -cer o -ducir [escept for hacer, mecer, cocer]
        // con(verb) {
        //     if (verb.slice(-3) === "cir" || "cer" && verb.slice(-4, -3) === "a" || "o" || "e" || "u" || "i") {
        //         verb.slice(0, -3) + "zco"
        //     }
        // },
        // 
        conocer: ["conozco"],
        traducir: ["traduzco"],

        // conPresIndi(verb) {
        //     let o = verbs.presenteIndicativo
        //     if (o[verb].length !== 6) {
        //         let newWord = []
        //         let endings = ["e", "iste", "o", "imos", "isteis", "ieron"]
        //         let root = o[verb]
        //         if (o.loseI.includes(verb)) {
        //             console.log("looseI")
        //             endings.map((e, i) => { i < 5 ? newWord.push(root + e) : newWord.push(root + e.slice(1)) })
        //         }
        //         endings.map((e) => newWord.push(root + e))
        //         return newWord
        //     } else {
        //         return o[verb]
        //     }

        // }
    }
}