import React from 'react';

//header receber props ou todos os filhos que tiverem dentro do componente header em outro arquivo
export default function Header({ children }) {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    )
}