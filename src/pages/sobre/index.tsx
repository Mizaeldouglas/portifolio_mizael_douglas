import { GetStaticProps } from "next"

import Head from "next/head"
import styles from './styles.module.scss'

import { getPrismicClient } from "../../services/prismic"
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { FaGithub ,FaWhatsapp,FaInstagram,FaLinkedinIn } from 'react-icons/fa'



type Content ={
		title:string,
		descripton:string,
		banner:string,
		instagram:string,
		linkedin:string,
		whatsApp:string,
		gitHub:string,
}

interface ContentProps{
	content: Content;
}


export default function Sobre({content}:ContentProps){
	return(
		<>
			<Head>
				<title>Sobre | Mizael Douglas</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<section className={styles.ctaText}>
						<h1>{content.title}</h1>
						<p>{content.descripton}</p>

						<a href={content.gitHub} target="_blank" rel="noopener noreferrer" >
							<FaGithub size={40}/>
						</a>
						<a href={content.whatsApp} target="_blank" rel="noopener noreferrer" >
							<FaWhatsapp size={40}/>
						</a>
						<a href={content.instagram} target="_blank" rel="noopener noreferrer" >
							<FaInstagram size={40}/>
						</a>
						<a href={content.linkedin} target="_blank" rel="noopener noreferrer" >
							<FaLinkedinIn size={40}/>
						</a>
					</section>
					<img 
						src={content.banner} 
						alt={content.title} 

					/>
				</div>
			</main>
		</>
	)
}


export const getStaticProps: GetStaticProps = async () => {

	const prismic = getPrismicClient()

	const response = await prismic.query([
		Prismic.Predicates.at('document.type', 'about')
	])

	const {
		title,
		descripton,
		banner,
		instagram,
		linkedin,
		whatsApp,
		gitHub

	} = response.results[0].data

	const content ={
		title: RichText.asText(title),
		descripton:RichText.asText(descripton),
		banner:banner.url,
		instagram:instagram.url,
		linkedin:linkedin.url,
		whatsApp:whatsApp.url,
		gitHub:gitHub.url,
		
	}


	return{
		props:{
			content
		},
		revalidate: 60 *15 // a cada 15 minutos vai ser revalidada
	}
	
}