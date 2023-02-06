import React, { useRef } from 'react'

export default function SetsButton({ setWords, tenses }) {
    const exceptions = {
        "Pretérito Indefinido": {
            tense: ["Pretérito Indefinido"],
            verbs: {
                raiz: ["estar", "tener", "andar", "venir", "poder", "poner", "querer", "saber", "decir", "traer", "conducir", "producir"],
                irregulares: ["ser", "ir", "hacer", "dar"],
                loseI: ["decir", "traer", "conducir", "producir"]
            }
        },
        "Presente": {
            tense: ["Presente Indicativo"],
            verbs: {
                e_ie: ["pensar", "entender", "cerrar", "despertar", "merendar", "calentar", "querer", "perder", "entender"],
                o_ue: ["mover", "contar", "soñar", "recordar", "volar", "poder", "volver", "dormir", "morir"],
                cir: ["conocer", "traducir", "conducir"],
                uir: ["construir", "destruir", "huir"],
                irregulares: ["estar", "oír", "oler", "espiar", "actuar", "prohibir", "reunir", "cocer", "asir", "caber", "caer", "dar", "hacer", "poner", "saber", "salir", "traer", "valer", "ver", "mecer", "distinguir", "delinquir"],
                g_j: ["seguir", "coger", "elegir"],
                total: ["ser", "ir", "haber"],
                doble: ["decir", "venir", "tener"]
            }
        },

        "Pretérito Perfecto Compuesto": {
            tense: ["Pretérito Perfecto"],
            verbs: {
                all: ["encubrir", "descubrir", "componer", "posponer", "proponer", "revolver", "resolver", "devolver", "deshacer", "prever", "abrir", "decir", "escribir", "hacer", "freír", "imprimir", "morir", "poner", "proveer", "romper", "suscribir", "ver", "volver", "cubrir"]
            }
        },
        "Pretérito Imperfecto": {
            tense: ["Pretérito Imperfecto"],
            verbs: {
                all: ["ir", "ser", "ver"]
            }
        },
        "Futuro Imperfecto": {
            tense: ["Futuro Imperfecto"],
            verbs: {
                irregulares: ["poner", "salir", "tener", "valer", "venir", "caber", "haber", "poder", "querer", "saber", "decir", "hacer", "predecir", "anteponer", "deshacer"]
            }
        },
        "Presente de Subjuntivo": {
            tense: ["Subjuntivo Presente"],
            verbs: {
                irregulares: ["caber", "dar", "estar", "haber", "ir", "oler", "saber", "ser", "ver"],
                tilde: ["actuar", "prohibir", "reunirse"],
                z: ["conocer", "reconocer", "conducir", "obedecer", "desobedecer", "padecer", "parecer", "traducir"],
                g: ["caer", "decir", "hacer", "oír", "poner", "salir", "tener", "traer", "valer", "venir"],
                e_i: ["conseguir", "corregir", "elegir", "pedir", "perseguir", "reír", "sonreír", "seguir", "servir"],
                o_ue_u: ["dormir", "morir"],
                e_ie_e: ["calentar", "cerrar", "encender", "entender", "empezar", "querer", "pensar", "perder", "regar"],
                e_ie_i: ["divertir", "mentir", "preferir", "sentir"],
                o_ue_o: ["cocer", "contar", "costar", "doler", "encontrar", "llover", "mover", "morir", "oler", "poder", "recordar", "sonar", "soñar", "volar", "volver"],
                u_ue_u: ["jugar"],
                c_qu: ["aparcar", "provocar", "sacar"],
                c_z: ["cocer", "vencer"],
                g_gu: ["investigar", "jugar", "llegar", "regar", "pagar"],
                gu_g: ["conseguir", "distinguir", "perseguir", "seguir"],
                g_j: ["coger", "corregir", "elegir"],
                z_c: ["comenzar", "cazar", "empezar", "organizar"],
                e_i: ["conseguir", "corregir", "elegir", "pedir", "perseguir", "reír", "sonreír", "seguir", "servir"],
                o_ue_u: ["dormir", "morir"],
                e_ie_e: ["calentar", "cerrar", "encender", "entender", "empezar", "querer", "pensar", "perder", "regar"],
                e_ie_i: ["divertir", "mentir", "preferir", "sentir"],
                o_ue_o: ["cocer", "contar", "costar", "doler", "encontrar", "llover", "mover", "morir", "oler", "poder", "recordar", "sonar", "soñar", "volar", "volver"],
                u_ue_u: ["jugar"]
            }
        },
        "Pretérito Imperfecto de Subjuntivo": {
            all: ["Subjuntivo Pretérito Imperfecto"],
            verbs: {
                irregulares: ["ser", "ir"],
                a_i: ["hacer"],
                e_i: ["conseguir", "elegir", "pedir", "perseguir", "repetir", "seguir", "sentir", "venir"],
                a_u: ["haber"],
                o_u: ["dormir", "morir", "poder"],
                raizIrregular: ["andar", "caber", "dar", "estar", "poner", "querer", "saber", "tener"],
                irregulares2: ["traducir", "traer", "decir", "caer", "leer", "oír", "huir"]
            }
        },
        "Imperativo": {
            tense: ["Imperativo"],
            verbs:
            {
                all: ["decir", "hacer", "ir", "poner", "salir", "ser", "tener", "venir"]
            }
        }
    }
    let newWords = new Set([])
    const num = useRef()
    for (let tense of [...tenses]) {

        let o = exceptions[tense] || undefined
        o && Object.keys(o.verbs).forEach(p => {
            for (let item of o.verbs[p]) {
                newWords.add(item)
            }
        })
    }
    // const chosenTense = exceptions[tenses].tense

    function handleClick(fy, n) {
        let number = n.current.value || 4
        let w = []
        for (let i of newWords) {
            w.push(i)
        }
        setWords(fy(w, number))

    }
    function fy(arr, n) {
        let num = n > arr.length ? arr.length : n
        let i = arr.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr.slice(0, num)
    }

    return (
        <div>
            <input type="number" id="num" name="number" placeholder='4' ref={num} />
            <button className={"btn"} id={"random"} onClick={() => handleClick(fy, num)}>Verbos Irregulares</button>
        </div>
    )
}
