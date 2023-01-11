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
        // ----------------------------------------------------------------------------------------
        // cambio vocalico (MENOS NOSOTROS Y VOSOTROS) : >>DONE<<
        //         e-ie [pensar, entender, cerrar, despertar, merendar, calentar, querer, perder, entender, encender]
        // e(?=[^e]*(er|ar)\b)
        //         o-ue [mover, contar, soñar, recordar, volar, poder, volver, dormir, morir]
        // o(?=[^o]*(er|ar|ir)\b)
        //         e-i: 
        //    
        e_ie: ["pensar", "entender", "cerrar", "despertar", "merendar", "calentar", "querer", "perder", "entender"],
        o_ue: ["mover", "contar", "soñar", "recordar", "volar", "poder", "volver", "dormir", "morir"],
        exceptions: ["pensar", "entender", "cerrar", "despertar", "merendar", "calentar", "querer", "perder", "entender", "encender", "mover", "contar", "soñar", "recordar", "volar", "poder", "volver", "dormir", "morir"],
        check(root, newWord, type, word, rule) {
            function conjugate(endings, newRoot) { endings.forEach((e, i) => (i === 3 || i === 4) ? newWord.push(root + e) : newWord.push(newRoot + e)) }
            // vocal + -cer/cir [escept for hacer, mecer, cocer] >>DONE<<
            if (word !== "hacer" && word !== "mecer" && word !== "cocer") {
                if (/[aoeiuáóéíú](cer)\b/.test(word)) {
                    rule.er.forEach((e, i) => i === 0 ? newWord.push(word.replace(/[aoeiuáóéíú](cer)\b/, "zc") + e) : newWord.push(root + e))
                }
                else if (/[aoeiuáóéíú](cir)\b/.test(word)) {
                    rule.ir.forEach((e, i) => i === 0 ? newWord.push(word.replace(/[aoeiuáóéíú](cir)\b/, "zc") + e) : newWord.push(root + e))
                }
            }
            if (type === "ir" || type === "ír") {
                if (/(ent)\b/.test(root)) { conjugate(rule.ir, root.replace(/(ent)\b/, "ient")) }
                if ((/(er)\b/).test(root)) { conjugate(rule.ir, root.replace(/(er)\b/, "ier")) }
                if ((/e(?=[^ e]*\b)/).test(root)) { conjugate(rule.ir, root.replace(/e(?=[^e]*\b)/, "i")) }
            }
            if (verbs.presenteIndicativo.e_ie.includes(word)) {
                const obj = {
                    "ár": rule.ar,
                    "ar": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                }
                conjugate(obj[type], root.replace(/e(?=[^e]*\b)/, "ie"))
            }
            if (verbs.presenteIndicativo.o_ue.includes(word)) {
                const obj = {
                    "ár": rule.ar,
                    "ar": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                    "ir": rule.ir,
                    "ír": rule.ir,
                }
                conjugate(obj[type], root.replace(/o(?=[^o]*\b)/, "ue"))
            }
            //     => -uir >>DONE<<
            if (/(uir)\b/.test(word)) {
                rule.ir.forEach((e, i) => i === 3 || i === 4 ? newWord.push(root + e) : newWord.push(`${root}y${e}`))
            }
        },
        //
        // ----------------------------------------------------------------------------------------
        // irregulares en la primera persona 
        //
        //----------------------------------------------------------------------------------------
        // cambio ortografico [elejir, seguir, coger]
        //----------------------------------------------------------------------------------------
        // doble irregularidad (irregular en 1 y cambio vocalico) [decir, tener, venir] >>DONE<<
        decir: ["digo", "dices", "dice", "decimos", "decís", "deicen"],
        venir: ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
        tener: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienn"],
        //----------------------------------------------------------------------------------------
        // completamente irregulares [ser, ir, haber] >>DONE<<
        ser: ["soy", "eres", "es", "somos", "sois", "son"],
        ir: ["voy", "vas", "va", "vamos", "vais", "van"],
        haber: ["he", "has", "ha", "hemos", "habéis", "han"],
        //----------------------------------------------------------------------------------------
        estar: ["estoy", "estás", "está", "estamos", "estáis", "están"],
        oír: ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
        oler: ["huelo", "hueles", "huele", "olemos", "oléis", "huelen"],
        espiar: ["espío", "espías", "espía", "espiamos", "espiáis", "espían"],
        actuar: ["actúo", "actúas", "actúa", "actuamos", "actuáis", "actúan"],
        prohibir: ["prohíbo", "prohíbes", "prohíbe", "prohibimos", "prohibís", "prohíben"],
        reunir: ["reúno", "reúnes", "reúne", "reunimos", "reunís", "reúnen"],
        cocer: ["cuezo", "cueces", "cuece", "cocemos", "cocéis", "cuecen"],
        asir: ["asgo"],
        // ------------------------------------------------------------------------------------------------
        //  VERBOS IRREGULARES en la PRIMERA PERSONA >>DONE<<
        caber: ["quepo"],
        caer: ["caigo"],
        dar: ["doy"],
        hacer: ["hago"],
        poner: ["pongo"],
        saber: ["sé"],
        salir: ["salgo"],
        traer: ["traigo"],
        valer: ["valgo"],
        ver: ["veo"],

        seguir: ["sigo"],
        coger: ["cojo"],
        elegir: ["elijo"],

        mecer: ["mezo"],
        distinguir: ["distingo"],
        delinquir: ["delinco"],
        conPresIndi(verb, type, root, rule, newWord) {
            let o = verbs.presenteIndicativo
            if (o[verb].length !== 6) {
                function conjugate(endings, newRoot) {
                    endings.forEach((e, i) => i === 0 ? newWord.push(newRoot[0]) : newWord.push(root + e))
                }
                let newRoot = o[verb]
                const obj = {
                    "ar": rule.ar,
                    "ár": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                    "ir": rule.ir,
                    "ír": rule.ir
                }
                conjugate(obj[type], newRoot)
                return newWord
            } else {
                return o[verb]
            }
        }
    }
}
