import { verbs } from "../irregularVerbs"

const convert = (verb, tense) => {

    function conRegular(exceptions, word, rule, exceptionsCon, check) {
        const type = word.slice(-2)
        const root = word.slice(0, word.length - 2)
        const newWord = []
        if (!Object.keys(exceptions).includes(word)) {

            if (check) {
                check(root, newWord, type, word, rule)
            }
            if (newWord.length > 0) { return newWord }
            else {
                const obj = {
                    "ar": rule.ar,
                    "ár": rule.ar,
                    "er": rule.er,
                    "ér": rule.er,
                    "ir": rule.ir,
                    "ír": rule.ir,
                }
                return obj[type] ? obj[type].map(e => root + e) : ""
            }
        } else { return exceptionsCon(word, newWord, type, root, rule) }
    }
    function conPerfecto(exceptions, word, rule, ruleAux) {

        if (!Object.keys(exceptions).includes(word)) {
            const type = word.slice(-2)
            const root = word.slice(0, verb.length - 2)
            const obj = {
                "ar": rule.ar,
                "ár": rule.ar,
                "ér": rule.er,
                "er": rule.er,
                "ir": rule.ir,
                "ír": rule.ir
            }
            return obj[type] ? ruleAux.map(e => `${e} ${root}${obj[type]}`) : ""
        } else { return ruleAux.map(e => `${e} ${exceptions[word]}`) }
    }

    class PreteritoIndefinido {
        constructor(word) {
            this.word = word
            this.rule = verbs.pretéritoIndefinido.rule
            this.exceptions = verbs.pretéritoIndefinido
            this.exceptionsCon = verbs.pretéritoIndefinido.conPretIndef
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, false) }
    }
    class PresenteIndicativo {
        constructor(word) {
            this.word = word
            this.rule = verbs.presenteIndicativo.rule
            this.exceptions = verbs.presenteIndicativo
            this.exceptionsCon = verbs.presenteIndicativo.conPresIndi
            this.check = verbs.presenteIndicativo.check
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }
    class PreteritoPerfecto {
        constructor(word) {
            this.word = word
            this.rule = verbs.preteritoPerfecto.rule
            this.ruleAux = ["he", "has", "ha", "hemos", "habeis", "han"]
            this.exceptions = verbs.preteritoPerfecto
        }
        conjuagtion() { return conPerfecto(this.exceptions, this.word, this.rule, this.ruleAux) }
    }
    class PreteritoImperfecto {
        constructor(word) {
            this.word = word
            this.rule = verbs.preteritoImperfecto.rule
            //add exceptions
            this.exceptions = verbs.preteritoImperfecto
            this.exceptionsCon = verbs.preteritoImperfecto.conPretImper
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, false) }
    }
    class IndicativoFuturo {
        constructor(word) {
            this.word = word
            this.rule = verbs.futuroImperfecto.rule
            //add exceptions
            this.exceptions = verbs.futuroImperfecto
            this.exceptionsCon = verbs.futuroImperfecto.conIndiFutu
            this.check = verbs.futuroImperfecto.check
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }
    class SubjuntivoPresente {
        constructor(word) {
            this.word = word
            this.rule = verbs.subjuntivoPresente.rule
            //add exceptions
            this.exceptions = verbs.subjuntivoPresente
            this.exceptionsCon = verbs.subjuntivoPresente.conSubjuntivoPresente
            this.check = verbs.subjuntivoPresente.check
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }
    class SubjuntivoPretéritoImperfecto {
        constructor(word) {
            this.word = word
            this.rule = verbs.subjuntivoPretéritoImperfecto.rule
            //add exceptions
            this.exceptions = verbs.subjuntivoPretéritoImperfecto
            this.exceptionsCon = verbs.subjuntivoPretéritoImperfecto.conSubjuntivoPretéritoImperfecto
            this.check = verbs.subjuntivoPretéritoImperfecto.check
        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }
    class Imperativo {
        constructor(word) {
            this.word = word
            this.rule = verbs.imperativo.rule
            //add exceptions
            this.exceptions = verbs.imperativo
            this.exceptionsCon = verbs.imperativo.conImperativo
            this.check = verbs.imperativo.check

        }
        conjuagtion() { return conRegular(this.exceptions, this.word, this.rule, this.exceptionsCon, this.check) }
    }


    switch (tense) {
        case "Presente":
            return new PresenteIndicativo(verb).conjuagtion()
        case "Pretérito Perfecto Compuesto":
            return new PreteritoPerfecto(verb).conjuagtion()
        case "Pretérito Imperfecto":
            return new PreteritoImperfecto(verb).conjuagtion()
        case "Pretérito Indefinido":
            return new PreteritoIndefinido(verb).conjuagtion()
        case "Futuro Imperfecto":
            return new IndicativoFuturo(verb).conjuagtion()
        case "Presente de Subjuntivo":
            return new SubjuntivoPresente(verb).conjuagtion()
        case "Pretérito Imperfecto de Subjuntivo":
            return new SubjuntivoPretéritoImperfecto(verb).conjuagtion()
        case "Imperativo":
            return new Imperativo(verb).conjuagtion()
        default: {
            console.log("error " + tense + verb)
            // alert("No such tense")
        }
    }
}

export default convert;