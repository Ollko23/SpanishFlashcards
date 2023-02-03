import React from 'react'
import "./multiSelect.css"
export default function MultiSelect({ setTenses }) {

    document.addEventListener("click", function (event) {
        !event.target.className.includes("multi") && toggleCheckboxArea(true)
    })
    function toggleCheckboxArea(close) {
        var checkboxes = document.getElementById("mySelectOptions");
        var displayValue = checkboxes.style.display;
        (displayValue !== "grid" && !close) ?
            checkboxes.style.display = "grid"
            : checkboxes.style.display = "none"
    }

    function checkboxStatusChange() {
        let multiselectOption = document.getElementById("o")
        let values = []
        let ckeckedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked")
        ckeckedCheckboxes.forEach(i => {
            let checkboxValue = i.getAttribute("value")
            values.push(checkboxValue)
        })
        let dropdownValue = "Nada selecionado"
        if (values.length > 0) {
            dropdownValue = values.join(", ")
        }
        multiselectOption.innerText = dropdownValue
        setTenses(values.filter(Boolean))
    }

    return (
        <div id='myMultiselect' className='multiselect'>
            <div id="mySelectLabel" className="selectBox" onClick={() => toggleCheckboxArea()}>
                <select className="form-select">
                    <option id='o'>Choose the tenses</option>
                </select>
                <div className="overSelect multi" id='overSelect'></div>
            </div>
            <div id="mySelectOptions">
                {<label className="multi" htmlFor="one"><input type="checkbox" className="multi" id="one" onChange={checkboxStatusChange} value="Presente" /> Presente</label>}
                {<label className="multi" htmlFor="two"><input type="checkbox" className="multi" id="two" onChange={checkboxStatusChange} value="Pretérito Perfecto Compuesto" /> Pretérito Perfecto Compuesto</label>}
                {<label className="multi" htmlFor="three"><input type="checkbox" className="multi" id="three" onChange={checkboxStatusChange} value="Pretérito Imperfecto" /> Pretérito Imperfecto</label>}
                {<label className="multi" htmlFor="four"><input type="checkbox" className="multi" id="four" onChange={checkboxStatusChange} value="Pretérito Indefinido" /> Pretérito Indefinido</label>}
                {<label className="multi" htmlFor="five"><input type="checkbox" className="multi" id="five" onChange={checkboxStatusChange} value="Futuro Imperfecto" /> Futuro Imperfecto</label>}
                {<label className="multi" htmlFor="six"><input type="checkbox" className="multi" id="six" onChange={checkboxStatusChange} value="Presente de Subjuntivo" /> Presente de Subjuntivo</label>}
                {<label className="multi" htmlFor="seven"><input type="checkbox" className="multi" id="seven" onChange={checkboxStatusChange} value="Pretérito Imperfecto de Subjuntivo" /> Pretérito Imperfecto de Subjuntivo</label>}
                {<label className="multi" htmlFor="eight"><input type="checkbox" className="multi" id="eight" onChange={checkboxStatusChange} value="Imperativo" /> Imperativo</label>}
            </div>
        </div>
    )
}
