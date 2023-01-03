import React from 'react'
import icones from './icones.json';
import style from './Menu.module.scss'
import Icone from './Icone'

export default function Menu() {
  return (
    <nav className={style.menu}>
      <ul className={style.menu__lista}>
        {icones.map((icone) => (
          <Icone key={icone.id} icone={icone} style={style} />
        ))}
      </ul>
    </nav>
  )
}
