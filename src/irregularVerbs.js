export const verbs = {
    pretéritoIndefinido: {
        rule: {
            ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
            er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
            ir: ["í", "iste", "ió", "imos", "isteis", "ieron"]
        },
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
            const o = verbs.pretéritoIndefinido
            if (o[verb].length !== 6) {
                const endings = ["e", "iste", "o", "imos", "isteis", "ieron"]
                const root = o[verb]
                return o.loseI.includes(verb) ? endings.map((e, i) => i < 5 ? root + e : root + e.slice(1)) : endings.map(e => root + e)
            } else { return o[verb] }
        }
    },
    presenteIndicativo: {
        rule: {
            ar: ["o", "as", "a", "amos", "áis", "an"],
            er: ["o", "es", "e", "emos", "éis", "en"],
            ir: ["o", "es", "e", "imos", "ís", "en"]
        },
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

        check(root, newWord, type, word, rule) {
            const obj = {
                "ár": rule.ar,
                "ar": rule.ar,
                "er": rule.er,
                "ér": rule.er,
                "ir": rule.ir,
                "ír": rule.ir,
            }
            function conjugate(endings, newRoot) { endings.forEach((e, i) => (i === 3 || i === 4) ? newWord.push(root + e) : newWord.push(newRoot + e)) }
            // vocal + -cer/cir [escept for hacer, mecer, cocer] >>DONE<<
            if (word !== "hacer" && word !== "mecer" && word !== "cocer") {
                if (newWord.length === 0 && /[aoeiuáóéíú](cer)\b/.test(word)) {
                    rule.er.forEach((e, i) => i === 0 ? newWord.push(word.replace(/[aoeiuáóéíú](cer)\b/, "zc") + e) : newWord.push(root + e))
                }
                else if (newWord.length === 0 && /[aoeiuáóéíú](cir)\b/.test(word)) {
                    rule.ir.forEach((e, i) => i === 0 ? newWord.push(word.replace(/[aoeiuáóéíú](cir)\b/, "zc") + e) : newWord.push(root + e))
                }
            }
            if (type === "ir" || type === "ír") {
                if (newWord.length === 0 && /(ent)\b/.test(root)) {
                    conjugate(rule.ir, root.replace(/(ent)\b/, "ient"))
                }
                if (newWord.length === 0 && /(er)\b/.test(root)) {
                    conjugate(rule.ir, root.replace(/(er)\b/, "ier"))
                }
                if (newWord.length === 0 && /e(?=[^ e]*\b)/.test(root)) {
                    conjugate(rule.ir, root.replace(/e(?=[^e]*\b)/, "i"))
                }
            }
            if (newWord.length === 0 && verbs.presenteIndicativo.e_ie.includes(word)) {
                obj[type] && conjugate(obj[type], root.replace(/e(?=[^e]*\b)/, "ie"))
            }
            if (newWord.length === 0 && verbs.presenteIndicativo.o_ue.includes(word)) {

                obj[type] && conjugate(obj[type], root.replace(/o(?=[^o]*\b)/, "ue"))
            }
            //     => -uir >>DONE<<
            if (newWord.length === 0 && /(uir)\b/.test(word)) {
                rule.ir.forEach((e, i) => i === 3 || i === 4 ? newWord.push(root + e) : newWord.push(`${root}y${e}`))
            }
        },
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

        seguir: ["sigo", "sigues", "sigue", "seguimos", "seguís", "siguen"],
        coger: ["cojo", "coges", "coge", "cogemos", "cogéis", "cogen"],
        elegir: ["elijo", "eliges", "elige", "elegimos", "elegís", "eligen"],

        mecer: ["mezo"],
        distinguir: ["distingo"],
        delinquir: ["delinco"],
        conPresIndi(verb, newWord, type, root, rule) {
            const o = verbs.presenteIndicativo
            if (o[verb].length !== 6) {
                const newRoot = o[verb]
                const obj = {
                    "ar": rule.ar,
                    "ár": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                    "ir": rule.ir,
                    "ír": rule.ir
                }
                return obj[type].map((e, i) => i === 0 ? newRoot[0] : root + e)
            } else {
                return o[verb]
            }
        }
    },
    preteritoPerfecto: {
        rule: {
            ar: ["ado"],
            er: ["ido"],
            ir: ["ido"]
        },
        encubrir: [" encubierto"],
        descubrir: [" descubierto"],
        componer: [" compuesto"],
        posponer: [" pospuesto"],
        proponer: [" propuesto"],
        revolver: [" revuelto"],
        resolver: [" resuelto"],
        devolver: [" devuelto"],
        deshacer: [" deshecho"],
        prever: [" previsto"],
        abrir: ["abierto"],
        decir: ["dicho"],
        escribir: ["escrito"],
        hacer: ["hecho"],
        freír: ["frito"],
        imprimir: ["impreso"],
        morir: ["muerto"],
        poner: ["puesto"],
        proveer: ["provisto"],
        romper: ["roto"],
        suscribir: ["suscrito"],
        ver: ["visto"],
        volver: ["vuelto"],
        cubrir: [" cubierto"],
    },
    preteritoImperfecto: {
        rule: {
            ar: ["aba", "abas", "aba", "abamos", "abais", "aban"],
            er: ["ía", "ías", "ía", "íamos", "íais", "ían"],
            ir: ["ía", "ías", "ía", "íamos", "íais", "ían"]
        },
        ir: ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
        ser: ["era", "eras", "era", "éramos", "erais", "eran"],
        ver: ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
        conPretImper(verb) { return verbs.preteritoImperfecto[verb] }
    },
    futuroImperfecto: {
        rule: {
            ár: ["é", "ás", "á", "emos", "éis", "án"],
            ar: ["é", "ás", "á", "emos", "éis", "án"],
            er: ["é", "ás", "á", "emos", "éis", "án"],
            ér: ["é", "ás", "á", "emos", "éis", "án"],
            ir: ["é", "ás", "á", "emos", "éis", "án"],
            ír: ["é", "ás", "á", "emos", "éis", "án"]
        },
        check(root, newWord, type, word, rule) {
            const obj = {
                "ár": rule.ar,
                "ar": rule.ar,
                "er": rule.er,
                "ér": rule.er,
                "ir": rule.ir,
                "ír": rule.ir,
            }
            obj[type].forEach(e => newWord.push(word + e))
        },
        poner: ["pondr"],
        salir: ["salir"],
        tener: ["tendr"],
        valer: ["valdr"],
        venir: ["vendr"],
        caber: ["cabr"],
        haber: ["habr"],
        poder: ["podr"],
        querer: ["querr"],
        saber: ["sabr"],
        decir: ["dir"],
        hacer: ["har"],
        predecir: ["predir"],
        anteponer: ["antepondr"],
        deshacer: ["deshar"],
        conIndiFutu(verb, newWord, type, root, rule) {
            return rule[type].map(e => verbs.futuroImperfecto[verb] + e)
        }
    },
    subjuntivoPresente: {
        rule: {
            ár: ["e", "es", "e", "emos", "éis", "en"],
            ar: ["e", "es", "e", "emos", "éis", "en"],
            er: ["a", "as", "a", "amos", "áis", "an"],
            ér: ["a", "as", "a", "amos", "áis", "an"],
            ir: ["a", "as", "a", "amos", "áis", "an"],
            ír: ["a", "as", "a", "amos", "áis", "an"]
        },

        // Verbos irregulares
        caber: ["quepa", "quepas", "quepa", "quepamos", "quepáis", "quepan"],
        dar: ["dé", "des", "dé", "demos", "deis", "den"],
        estar: ["esté", "estés", "esté", "estemos", "estéis", "estén"],
        haber: ["haya", "hayas", "haya", "hayamos", "hayáis", "hayan"],
        ir: ["vaya", "vayas", "vaya", "vayamos", "vayáis", "vayan"],
        oler: ["huela", "huelas", "huela", "olamos", "oláis", "huelan"],
        saber: ["sepa", "sepas", "sepa", "sepamos", "sepáis", "sepan"],
        ser: ["sea", "seas", "sea", "seamos", "seáis", "sean"],
        ver: ["vea", "veas", "vea", "veamos", "veáis", "vean"],

        // Verbos que ganan una tilde
        actuar: ["actúe", "actúes", "actúe", "actuemos", "actuéis", "actúen"],
        prohibir: ["prohíba", "prohíbas", "prohíba", "prohibamos", "prohibáis", "prohíban"],
        reunirse: ["me reúna", "te reúnas", "se reúna", "nos reunamos", "os reunáis", "se reúnan"],

        // Verbos que añaden una z
        conocer: ["conozca", "conozcas", "conozca", "conozcamos", "conozcáis", "conozcan"],
        reconocer: ["reconozca", "reconozcas", "reconozca", "reconozcamos", "reconozcáis", "reconozcan"],
        conducir: ["conduzca", "conduzcas", "conduzca", "conduzcamos", "conduzcáis", "conduzcan"],
        obedecer: ["obedezca", "obedezcas", "obedezca", "obedezcamos", "obedezcáis", "obedezcan"],
        desobedecer: ["desobedezca", "desobedezcas", "desobedezca", "desobedezcamos", "desobedezcáis", "desobedezcan"],
        padecer: ["padezca", "padezcas", "padezca", "padezcamos", "padezcáis", "padezcan"],
        parecer: ["parezca", "parezcas", "parezca", "parezcamos", "parezcáis", "parezcan"],
        traducir: ["traduzca", "traduzcas", "traduzca", "traduzcamos", "traduzcáis", "traduzcan"],

        // Verbos que añaden una g
        caer: ["caiga", "caigas", "caiga", "caigamos", "caigáis", "caigan"],
        decir: ["diga", "digas", "diga", "digamos", "digáis", "digan"],
        hacer: ["haga", "hagas", "haga", "hagamos", "hagáis", "hagan"],
        oír: ["oiga", "oigas", "oiga", "oigamos", "oigáis", "oigan"],
        poner: ["ponga", "pongas", "ponga", "pongamos", "pongáis", "pongan"],
        salir: ["salga", "salgas", "salga", "salgamos", "salgáis", "salgan"],
        tener: ["tenga", "tengas", "tenga", "tengamos", "tengáis", "tengan"],
        traer: ["traiga", "traigas", "traiga", "traigamos", "traigáis", "traigan"],
        valer: ["valga", "valgas", "valga", "valgamos", "valgáis", "valgan"],
        venir: ["venga", "vengas", "venga", "vengamos", "vengáis", "vengan"],
        conSubjuntivoPresente(verb, type, root, rule, newWord) { return verbs.subjuntivoPresente[verb] },

        // Verbos con cambio vocálico
        e_i: ["conseguir", "corregir", "elegir", "pedir", "perseguir", "reír", "sonreír", "seguir", "servir"],
        o_ue_u: ["dormir", "morir"],
        e_ie_e: ["calentar", "cerrar", "encender", "entender", "empezar", "querer", "pensar", "perder", "regar"],
        e_ie_i: ["divertir", "mentir", "preferir", "sentir"],
        o_ue_o: ["cocer", "contar", "costar", "doler", "encontrar", "llover", "mover", "morir", "oler", "poder", "recordar", "sonar", "soñar", "volar", "volver"],
        u_ue_u: ["jugar"],
        // Verbos con cambio de consonante
        cambiosDeConsonantes: {
            c_qu: {
                verbos: ["aparcar", "provocar", "sacar"],
                cambioDeConsonante(root) { return root.replace(/c(?=[^c]*\b)/, "qu").slice(0, root.length - 1) },
            },
            c_z: {
                verbos: ["cocer", "vencer"],
                cambioDeConsonante(root) { return root.replace(/c(?=[^c]*\b)/, "z").slice(0, root.length - 2) }
            },
            g_gu: {
                verbos: ["investigar", "jugar", "llegar", "regar", "pagar"],
                cambioDeConsonante(root) { return root.replace(/g(?=[^g]*\b)/, "gu").slice(0, root.length - 1) }
            },
            gu_g: {
                verbos: ["conseguir", "distinguir", "perseguir", "seguir"],
                cambioDeConsonante(root) { return root.replace(/gu(?=[^gu]*\b)/, "g").slice(0, root.length - 3) },
            },
            g_j: {
                verbos: ["coger", "corregir", "elegir"],
                cambioDeConsonante(root) { return root.replace(/g(?=[^g]*\b)/, "j").slice(0, root.length - 2) }
            },
            z_c: {
                verbos: ["comenzar", "cazar", "empezar", "organizar"],
                cambioDeConsonante(root) { return root.replace(/z(?=[^z]*\b)/, "c").slice(0, root.length - 2) },
            },
        },
        check(root, newWord, type, word, rule) {

            function conjugate(endings, a, y, z) {
                endings.forEach((e, i) => (i === 3 || i === 4)
                    ? newWord.push(createNewRoot().replace(a, z) + e)
                    : newWord.push(createNewRoot().replace(a, y) + e))
            }
            const obj = {
                "ár": rule.ar,
                "ar": rule.ar,
                "er": rule.er,
                "ér": rule.er,
                "ir": rule.ir,
                "ír": rule.ir
            }
            function createNewRoot() {
                const o = verbs.subjuntivoPresente.cambiosDeConsonantes
                Object.keys(o).forEach(e => { if (o[e].verbos.includes(word)) { root = o[e].cambioDeConsonante(word) } })
                return root
            }

            // e → i [ conseguir, corregir, elegir, pedir, perseguir, reír, sonreír, seguir, servir]
            if (verbs.subjuntivoPresente.e_i.includes(word)) { obj[type].forEach(e => newWord.push(createNewRoot().replace(/e(?=[^e]*\b)/, "i") + e)) }

            //o → ue/u [dormir, morir]
            if (verbs.subjuntivoPresente.o_ue_u.includes(word)) { conjugate(obj[type], /o(?=[^o]*\b)/, "ue", "u") }

            // e → ie/e [calentar, cerrar, encender, entender, empezar,querer, pensar, perder, regar]
            if (verbs.subjuntivoPresente.e_ie_e.includes(word)) { conjugate(obj[type], /e(?=[^e]*\b)/, "ie", "e") }

            // e → ie/i [divertir,  mentir, preferir,sentir]
            if (verbs.subjuntivoPresente.e_ie_i.includes(word)) { conjugate(obj[type], /e(?=[^e]*\b)/, "ie", "i") }

            // o → ue/o [cocer, contar, costar, doler, encontrar, llover, mover, morir, oler, poder, recordar, sonar, soñar, volar, volver]
            if (verbs.subjuntivoPresente.o_ue_o.includes(word)) { conjugate(obj[type], /o(?=[^o]*\b)/, "ue", "o") }

            // u → ue/u [jugar]
            if (verbs.subjuntivoPresente.u_ue_u.includes(word)) { conjugate(obj[type], /u(?=[^u]*\b)/, "ue", "u") }

            if (newWord.length === 0) { obj[type] && obj[type].forEach(e => newWord.push(createNewRoot() + e)) }
        }
    },
    subjuntivoPretéritoImperfecto: {
        rule: {
            ar: ["ara", "aras", "ara", "áramos", "arais", "aran"],
            er: ["iera", "ieras", "iera", "iéramos", "ierais", "ieran"],
            ir: ["iera", "ieras", "iera", "iéramos", "ierais", "ieran"],
        },

        ser: ["fuera", "fueras", "fuera", "fuéramos", "fuerais", "fueran"],
        ir: ["fuera", "fueras", "fuera", "fuéramos", "fuerais", "fueran"],
        conSubjuntivoPretéritoImperfecto(verb, newWord, type, root, rule) { return verbs.subjuntivoPretéritoImperfecto[verb] },
        a_i: ["hacer"],
        e_i: ["conseguir", "elegir", "pedir", "perseguir", "repetir", "seguir", "sentir", "venir"],
        a_u: ["haber"],
        o_u: ["dormir", "morir", "poder"],
        raizIrregular: {
            rule: ["iera", "ieras", "iera", "iéramos", "ierais", "ieran"],
            andar: ["anduv"],
            caber: ["cup"],
            dar: ["d"],
            estar: ["estuv"],
            poner: ["pus"],
            querer: ["quis"],
            saber: ["sup"],
            tener: ["tuv"],
        },
        irregulareres: {
            rule: ["era", "eras", "era", "éramos", "erais", "eran"],
            traducir: ["traduj"],
            traer: ["traj"],
            decir: ["dij"],
            caer: ["cay"],
            leer: ["ley"],
            oír: ["oy"],
            huir: ["huy"]
        },
        check(root, newWord, type, word, rule) {

            const obj = {
                "ár": rule.ar,
                "ar": rule.ar,
                "er": rule.er,
                "ér": rule.er,
                "ir": rule.ir,
                "ír": rule.ir
            }
            // Verbos con cambio vocálico
            const sPI = verbs.subjuntivoPretéritoImperfecto
            //Verbos con cambio vocálico a_i: ["hacer"],
            if (sPI.a_i.includes(word)) { obj[type].forEach(e => newWord.push(root.replace(/a(?=[^a]*\b)/, "i") + e)) }
            // Verbos con cambio vocálico e_i: ["conseguir", "elegir", "pedir", "perseguir", "repetir", "seguir", "sentir", "venir"],
            if (sPI.e_i.includes(word)) { obj[type].forEach(e => newWord.push(root.replace(/e(?=[^e]*\b)/, "i") + e)) }
            // Verbos con cambio vocálico a_u: ["haber"],
            if (sPI.a_u.includes(word)) { obj[type].forEach(e => newWord.push(root.replace(/a(?=[^a]*\b)/, "u") + e)) }
            // Verbos con cambio vocálico o_u: ["dormir", "morir", "poder"],
            if (sPI.o_u.includes(word)) { obj[type].forEach(e => newWord.push(root.replace(/o(?=[^o]*\b)/, "u") + e)) }

            // Verbos con la raíz irregular
            if (Object.keys(sPI.raizIrregular).includes(word)) { sPI.raizIrregular.rule.forEach(e => newWord.push(sPI.raizIrregular[word] + e)) }

            // Verbos que añaden j o y
            if (Object.keys(sPI.irregulareres).includes(word)) { sPI.irregulareres.rule.forEach(e => newWord.push(sPI.irregulareres[word] + e)) }

            if (newWord.length === 0) { obj[type] && obj[type].forEach(e => newWord.push(root + e)) }
        }
    },
    imperativo: {
        rule: {
            ar: ["-", 2, 2, 3, "ad", 5],
            er: ["-", 2, 2, 3, "ed", 5],
            ir: ["-", 2, 2, 3, "id", 5]
        },

        conImperativo(verb, type, root, rule, newWord) { return newWord = verbs.imperativo[verb] },
        check(root, newWord, type, word, rule) {
            function conIndi(word) {
                const type = word.slice(-2)
                const root = word.slice(0, word.length - 2)
                const newWord = []
                const rule = verbs.presenteIndicativo.rule

                if (!Object.keys(verbs.presenteIndicativo).includes(word)) {

                    verbs.presenteIndicativo.check(root, newWord, type, word, rule)
                    if (newWord.length > 0) { return newWord } else {
                        const obj = {
                            "ar": rule.ar,
                            "ár": rule.ar,
                            "er": rule.er,
                            "ér": rule.er,
                            "ir": rule.ir,
                            "ír": rule.ir,
                        }
                        console.log(typeof obj[type])
                        return obj[type] ? obj[type].map(e => root + e) : ""
                    }
                } else { return verbs.presenteIndicativo.conPresIndi(word, type, root, rule, newWord) }
            }

            function conSub(word) {
                const type = word.slice(-2)
                const root = word.slice(0, word.length - 2)
                const newWord = []
                const rule = verbs.subjuntivoPresente.rule
                if (!Object.keys(verbs.subjuntivoPresente).includes(word)) {
                    verbs.subjuntivoPresente.check(root, newWord, type, word, rule)
                    return newWord
                } else { return verbs.subjuntivoPresente.conSubjuntivoPresente(word, type, root, rule, newWord) }

            }
            const exceptions = {
                decir: "di",
                hacer: "haz",
                ir: "ve",
                poner: "pon",
                salir: "sal",
                ser: "sé",
                tener: "ten",
                venir: "ven",
            }
            const obj = {
                "ár": rule.ar,
                "ar": rule.ar,
                "er": rule.er,
                "ér": rule.er,
                "ir": rule.ir,
                "ír": rule.ir,
            }
            obj[type] && obj[type].forEach((e, i) => {
                switch (i) {
                    case 0:
                        newWord.push("---")
                        break;
                    case 1:
                        Object.keys(exceptions).includes(word) ? newWord.push(exceptions[word]) : newWord.push(conIndi(word)[e])
                        break;
                    case 2:
                        newWord.push(conSub(word)[e])
                        break;
                    case 3:
                        newWord.push(conSub(word)[e])
                        break;
                    case 4:
                        newWord.push(root + e)
                        break;
                    case 5:
                        newWord.push(conSub(word)[e])
                        break;
                }
            })
        },
    }
}
