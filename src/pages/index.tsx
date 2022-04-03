import { GetStaticProps } from 'next'

import Head from 'next/head'
import styles from '../styles/home.module.scss'

import Image from 'next/image'
import TechsImage from '../../public/images/techs.svg'
import { FaReact,FaHtml5,FaCss3Alt,FaJs, } from "react-icons/fa";
import { SiTypescript } from 'react-icons/si'

import { getPrismicClient } from '../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

type Content ={
		title: string;
		subtitle: string;
		linkAction: string;
		mobile: string;
		mobileContent: string;
		mobileBanner: string;
		titleWeb: string;
		webContent:string;
		webBanner: string;
		curriculo:string;
}
interface ContentProps{
	content: Content;


}


export default function Home({content}: ContentProps) {

//console.log(content)



  return (
    <div>
      <>
	  	<Head>
			  <title>Mizael Douglas</title>
		  </Head>
		  <main className={styles.container}>
			  <div className={styles.containerHeader}>
				  <section className={styles.ctaText}>
					<h1>{content.title}</h1>
					<span>{content.subtitle}</span>
					<a href={content.curriculo} target="_blank" rel="noopener noreferrer">
						<button>
							Download do CV
						</button>
					</a>
					<a  className={styles.tecnologia}>
						<FaCss3Alt className={styles.css} size={30} />
						<FaHtml5 className={styles.html} size={30} />
						<FaJs className={styles.js} size={30} />
						<SiTypescript className={styles.ts} size={28} />
						<FaReact className={styles.react} size={30} />
						<FaReact className={styles.reactNative} size={32} />
					</a>
				  </section>
					<img src='/images/Mizael-4.png' alt="conteudos" />

			  </div>
			  
			  {/* <hr className={styles.divisor}/> */}

			{/* <div className={styles.sectionContainer} >
				<section>
					<h2>{content.mobile}</h2>
         			 <span>{content.mobileContent}</span>
				</section>
				<img src={content.mobileBanner} alt="app" />

			</div>

			<hr className={styles.divisor}/>

			<div className={styles.sectionContainer} >
				<img src={content.webBanner} alt="app" />

				<section>
					<h2>{content.titleWeb}</h2>
         			<span>{content.webContent}</span>
				</section>

			</div>

		<div className={styles.nextLevelContent}>

			<Image src={TechsImage} alt='tecnologias'/>
			<h2>Mais de <span className={styles.alunos}>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
        	<span>E você vai perder a chance de evoluir de uma vez por todas?</span>
			<a href={content.linkAction}>
         		<button>ACESSAR TURMA!</button>
        	</a>

		</div> */}



		  </main>
	  </>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
	
	const prismic = getPrismicClient()

	const response =  await prismic.query([
		Prismic.Predicates.at('document.type','Home')
	])

	//  console.log(response.results[0].data)


	const {
		title,subtitle,
		linkAction,mobile,
		mobileContent,mobileBanner,
		titleWeb,webContent,
		webBanner,
		curriculo
	} = response.results[0].data

	const content ={
		title: RichText.asText(title),
		subtitle: RichText.asText(subtitle),
		linkAction: linkAction.url,
		mobile: RichText.asText(mobile),
		mobileContent: RichText.asText(mobileContent),
		mobileBanner: mobileBanner.url,
		titleWeb: RichText.asText(titleWeb),
		webContent: RichText.asText(webContent),
		webBanner: webBanner.url,
		curriculo:curriculo.url
		

	}

	return{
		props:{
			content
		},
		revalidate: 60 * 2 //a cada 2 Miniutos
	}
}