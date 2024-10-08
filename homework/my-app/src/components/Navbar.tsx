'use client'
import { useState } from 'react'
import styles from './style.module.css'


const Navbar = () => {
  const [menu, setMenu] = useState(false)

  const menuClick = () => {
    setMenu(!menu)
  }
  return (
    <div className={styles.Container}>
    <div className={styles.menuContainer}>
     <div className={styles.menu} onClick={menuClick}>MENU</div>
     {menu && (
          <div className={styles.dropdown}>
            <div className={styles.list}>Trip Talk!</div>
            <div className={styles.list}>숙박권 구매</div>
            <div className={styles.list}>My Page</div>
          </div>
        )}
    </div>

    </div>

  )
}

export default Navbar

