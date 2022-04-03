import styles from './styles.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/logo4.png'

import { FaGithub ,FaWhatsapp,FaInstagram,FaLinkedinIn } from 'react-icons/fa'


import { ActiveLink } from '../ActiveLink'




export function Header(){

	return(
		<header className={styles.headerContainer}>
		<div className={styles.headerContent}>
			<ActiveLink href='/' activeClassName={styles.active} >
				<a>
					<Image src={logo} alt='imagemLOGO' width={200} height={50} />
				</a>
			</ActiveLink>
			<nav>
				<ActiveLink href='/' activeClassName={styles.active}>
					<a>Home</a>
				</ActiveLink>
				<ActiveLink href='/posts'activeClassName={styles.active} >
					<a>Portifolio</a>
				</ActiveLink>
				<ActiveLink href='/sobre'activeClassName={styles.active} >
					<a>Sobre mim</a>
				</ActiveLink>
			</nav>
			<section className={styles.socialMedia}>
				<a className={styles.instagram} href="https://www.instagram.com/mizael.douglas/" target="_blank" rel="noopener noreferrer">
					<FaInstagram size={30}/>
				</a>
				<a className={styles.linkedin} href='https://www.linkedin.com/in/mizael-douglas-aa850a216/' target="_blank" rel="noopener noreferrer">
					<FaLinkedinIn size={30}/>
				</a>
				<a className={styles.github} href="https://github.com/Mizaeldouglas" target="_blank" rel="noopener noreferrer">
					<FaGithub size={30}/>
				</a>
				<a className={styles.whatsapp} href="https://api.whatsapp.com/send?phone=5519995283104&text=WhatsApp%20do%20MizaelDouglas" target="_blank" rel="noopener noreferrer">
					<FaWhatsapp size={30}/>
				</a>
			</section>
			
					

		</div>

		</header>
	)
}
