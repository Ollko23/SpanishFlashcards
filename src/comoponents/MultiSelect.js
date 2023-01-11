import React from 'react'
import "./multiSelect.css"
export default function MultiSelect({ setTenses }) {

    // add listener event
    // document.addEventListener("click", function (event) {
    //     let flyoutElement = document.getElementById('myMultiselect')
    //     let targetElement = event.target
    //     // console.log(flyoutElement)
    //     console.log(event.target)
    //     if (event.target === flyoutElement) {
    //         toggleCheckboxArea()
    //     }
    // })

    function toggleCheckboxArea() {
        var checkboxes = document.getElementById("mySelectOptions");
        var displayValue = checkboxes.style.display;

        if (displayValue !== "grid") {
            checkboxes.style.display = "grid";

        } else {
            checkboxes.style.display = "none";
        }
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
        setTenses(values)
    }

    return (
        <div id='myMultiselect' className='multiselect'>
            <div id="mySelectLabel" className="selectBox" onClick={toggleCheckboxArea}>
                <select className="form-select">
                    <option id='o'>Choose the tenses</option>
                </select>
                <div className="overSelect"></div>
            </div>
            <div id="mySelectOptions">
                {<label htmlFor="one"><input type="checkbox" id="one" onChange={checkboxStatusChange} value="Presente Indicativo" /> Presente Indicativo</label>
                /* <label htmlFor="two"><input type="checkbox" id="two" onChange={checkboxStatusChange} value="Pretérito Perfecto" /> Preterito Perfecto</label>
                <label htmlFor="three"><input type="checkbox" id="three" onChange={checkboxStatusChange} value="Pretérito Imperfecto" /> Pretérito Imperfecto</label> */}
                <label htmlFor="four"><input type="checkbox" id="four" onChange={checkboxStatusChange} value="Pretérito Indefinido" /> Pretérito Indefinido</label>
            </div>
        </div>
    )
}
