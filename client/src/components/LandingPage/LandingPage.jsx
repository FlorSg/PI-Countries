import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.cover}>
          <div className={styles.imag}>
          <img className={styles.henry} src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" width="80px" alt="Img not found"/>
          </div>
            <div className={styles.container}>
              
                <img src="https://fontmeme.com/permalink/221119/df1275087cb4201607ef788d3a38dfe9.png" alt="fuente-de-cuphead" border="0"/>
                <div>
                <Link to='/home'>
                  <button className={styles.botonNeon}>Ingresar</button>
                  </Link>
                </div>
              
            </div>
        </div>
    )
}