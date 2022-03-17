import styles from './stytes.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import tumbImg from '../../../public/images/thumb.png'

import { FiChevronLeft,FiChevronsLeft,FiChevronRight,FiChevronsRight } from 'react-icons/fi'




export default function Posts(){
	return(
		<>
			<Head>
				<title>Blog | MizaelDOuglas</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					<Link href='/'>
						<a>
							<Image 
								src={tumbImg} 
								alt='tituloDoPost'
								width={720}
								height={410}
								quality={100}
							/>
							<strong>Criando meu primeiro aplicativo</strong>
							<time>14 Julho 2021</time>
							<p>Hoje vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login. Mas chega de conversa e bora pro código junto comigo que o vídeo está show de bola!</p>
						</a>
					</Link>

					<div className={styles.buttonNavigate}>
						<div>
							<button>
								<FiChevronsLeft size={25} color="#fff"/>
							</button>
							<button>
								<FiChevronLeft size={25} color="#fff"/>
							</button>
						</div>
						<div>
							<button>
								<FiChevronRight size={25} color="#fff"/> 
							</button>
							<button>
								<FiChevronsRight size={25} color="#fff"/>
							</button>

						</div>
					</div>
				</div>
			</main>
		</>
	)
}