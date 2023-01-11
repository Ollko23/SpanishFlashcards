import { verbs } from "../irregularVerbs"

const convert = (verb, tense, setWords) => {
    function conRegular(exceptions, word, rule, exceptionsCon, check) {
        let newWord = []
        let type = word.slice(-2)
        let root = word.slice(0, verb.length - 2)
        if (!Object.keys(exceptions).includes(word)) {

            if (check) {
                check(root, newWord, type, word, rule)
                if (newWord.length > 0) {
                    return newWord
                }
            }
            if (newWord.length === 0) {
                function con(rule) {
                    rule && rule.forEach(e => newWord.push(root + e))
                }
                const obj = {
                    "ar": rule.ar,
                    "ár": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                    "ir": rule.ir,
                    "ír": rule.ir,
                }
                con(obj[type])
                return newWord
            }
        } else { return exceptionsCon(word, type, root, rule, newWord) }
    }
    function conPerfecto(exceptions, word, rule, ruleAux) {
        let newWord = []
        if (!Object.keys(exceptions).includes(word)) {
            let type = word.slice(-2)
            let root = word.slice(0, verb.length - 2)
            switch (type) {
                case "ar":
                    for (let i = 0; i < 6; i++) {
                        newWord.push(`${ruleAux[i]} ${root}${rule.ar}`)
                    }
                    return newWord
                case "er":
                    for (let i = 0; i < 6; i++) {
                        newWord.push(`${ruleAux[i]} ${root}${rule.er}`)
                    }
                    return newWord
                case "ir":
                    for (let i = 0; i < 6; i++) {
                        newWord.push(`${ruleAux[i]} ${root}${rule.ir}`)
                    }
                    return newWord

                default: {
                    setWords(["ser"])
                    alert("wrong ending")
                    return newWord = []
                }
            }
        } else { return ruleAux.map(((e, i) => `${e[i]} ${exceptions[word]}`)) }
    }

    class PreteritoIndefinido {
        constructor(word) {
            this.word = word
            this.rule = {
                ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
                er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
                ir: ["í", "iste", "ió", "imos", "isteis", "ieron"]
            }
            // add axeceptions
            this.exceptions = verbs.pretéritoIndefinido
            this.exceptionsCon = verbs.pretéritoIndefinido.conPretIndef
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, false) }
    }
    class PresenteIndicativo {
        constructor(word) {
            this.word = word
            this.rule = {
                ar: ["o", "as", "a", "amos", "áis", "an"],
                er: ["o", "es", "e", "emos", "éis", "en"],
                ir: ["o", "es", "e", "imos", "ís", "en"]
            }
            this.exceptions = {
                tener: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
                // sentir: [],
                // pedir: [],
                // reir: [],
            }
            //add exceptions
            this.exceptions = verbs.presenteIndicativo
            this.exceptionsCon = verbs.presenteIndicativo.conPresIndi //change to look through array
            this.check = verbs.presenteIndicativo.check
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }
    class PreteritoPerfecto {
        constructor(word) {
            this.word = word
            this.rule = {
                ar: ["ado"],
                er: ["ido"],
                ir: ["ido"]
            }
            this.ruleAux = ["he", "has", "ha", "hemos", "habeis", "han"]
            // add excpetions
            this.exceptions = { tengo: ["tenido"] }
        }
        conjuagtion() { return conPerfecto(this.exceptions, this.word, this.rule, this.ruleAux) }
        // conjuagtion() {

        //     let type = this.word.slice(-2)
        //     let root = this.word.slice(0, verb.length - 2)
        //     let newWord = []
        //     switch (type) {
        //         case "ar":
        //             for (let i = 0; i < 6; i++) {
        //                 newWord.push(`${this.ruleAux[i]} ${root}${this.rule.ar}`)
        //             }
        //             return newWord
        //         case "er":
        //             for (let i = 0; i < 6; i++) {
        //                 newWord.push(`${this.ruleAux[i]} ${root}${this.rule.er}`)
        //             }
        //             return newWord
        //         case "ir":
        //             for (let i = 0; i < 6; i++) {
        //                 newWord.push(`${this.ruleAux[i]} ${root}${this.rule.ir}`)
        //             }
        //             return newWord
        //     }
        // }
    }
    class PreteritoImperfecto {
        constructor(word) {
            this.word = word
            this.rule = {
                ar: ["aba", "abas", "aba", "abamos", "abais", "aban"],
                er: ["ía", "ías", "ía", "íamos", "íais", "ían"],
                ir: ["ía", "ías", "ía", "íamos", "íais", "ían"]
            }
            //add exceptions
            this.exceptions = {
                ir: ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
                ser: ["era", "eras", "era", "éramos", "erais", "eran"],
                ver: ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
            }
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule) }
    }
    switch (tense) {
        case "Presente Indicativo":
            return new PresenteIndicativo(verb).conjuagtion()
        case "Pretérito Perfecto":
            return new PreteritoPerfecto(verb).conjuagtion()
        case "Pretérito Imperfecto":
            return new PreteritoImperfecto(verb).conjuagtion()
        case "Pretérito Indefinido":
            return new PreteritoIndefinido(verb).conjuagtion()
        default: { alert("No such tense") }
    }
}

export default convert;