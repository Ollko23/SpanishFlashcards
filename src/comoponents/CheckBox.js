import React from 'react'

export default function CheckBox({ label, value, onChange }) {
    return (
        <label>
            <input type="checkbox"
                checked={value}
                onChange={onChange} />
            {label}
        </label>
    )
}
