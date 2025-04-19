'use client'
 
export default function Egg({primary, secondary, rotation}) {
 
    return (
        <div className="egg"
            style={{
                "--eh-primary": primary,
                "--eh-secondary": secondary,
                "--rotation": rotation
            }}
        />
    )
}