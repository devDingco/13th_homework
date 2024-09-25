'use client'

import styles from './styles.module.css'

export default function CssPage () {
    return (
        <div>
            <button className={styles.버튼스타일}>버튼</button>
            <div className={styles.네모상자스타일}>네모상자</div>
        </div>
    )
}