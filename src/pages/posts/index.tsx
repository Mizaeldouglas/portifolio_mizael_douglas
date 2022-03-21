import styles from './stytes.module.scss'

import { useState,useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { FiChevronLeft,FiChevronsLeft,FiChevronRight,FiChevronsRight } from 'react-icons/fi'

import { GetStaticProps } from 'next'


import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'



type Post = {
			slug:string,
			title:string,
			descripton: string,
			cover:string,
			updateAt:string,
}

interface PostsProps{
	post:Post[];
	page:string;
	totalPage:string;
}



export default function Posts({ post:PostsBlog,page,totalPage }: PostsProps){

	const [post, setPost] = useState(PostsBlog || []);
	const [currentPage, setCurrentPage] = useState(Number(page));


	// BUSCAR NOVO POSTS
	async function reqPost(pageNumber: number){
		const prismic = getPrismicClient()

		const response = await prismic.query([
			Prismic.predicates.at('document.type','UID')
		],{
			orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
			fetch: ['UID.title','UID.descripton','UID.cover'],
			pageSize: 3,
			page:String(pageNumber)
		})
		return response
	}


	async function navigatePage(pageNumber:number){
		
		//alert('clicou' + pageNumber)

		const response =  await reqPost(pageNumber)

		if(response.results.length === 0){
			return;
		}


		const getPost = response.results.map( post => {
			return{
				slug:post.uid,
				title:RichText.asText(post.data.title),
				descripton: post.data.descripton.find(content => content.type === 'paragraph')?.text ?? '',
				cover:post.data.cover.url,
				updateAt:new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				})
	
			}
		} )

		setCurrentPage(pageNumber)
		setPost(getPost)


	}


	// console.log(post)
	return(
		<>
			<Head>
				<title>Blog | MizaelDouglas</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					{post.map( post => (
						<Link key={post.title} href={`/posts/${post.slug}`}>
						<a key={post.slug}>
							<Image 
								src={post.cover} 
								alt={post.title}
								width={720}
								height={410}
								quality={100}
								placeholder='blur'
								blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+PBvHgAFdAKOz8a+mQAAAABJRU5ErkJggg=='
							/>
							<strong>{post.title}</strong>
							<time>{post.updateAt}</time>
							<p>{post.descripton}</p>
							
						</a>
					</Link>
					))}

					<div className={styles.buttonNavigate}>
						{ Number(currentPage) >= 2 &&(
							<div>
							<button onClick={() => navigatePage(1)}>
								<FiChevronsLeft size={25} color="#fff"/>
							</button>
							<button onClick={() => navigatePage(Number(currentPage - 1))} >
								<FiChevronLeft size={25} color="#fff"/>
							</button>
						</div>
						) }
						{ Number(currentPage) < Number(totalPage) && (
							<div>
							<button onClick={() => navigatePage(Number(currentPage + 1))} >
								<FiChevronRight size={25} color="#fff"/> 
							</button>
							<button onClick={() => navigatePage(Number(totalPage))} >
								<FiChevronsRight size={25} color="#fff"/>
							</button>

						</div>
						) }
					</div>
				</div>
			</main>
		</>
	)
}




export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient()

	const response =  await prismic.query([
		Prismic.Predicates.at('document.type','UID')
	],{
		orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
		fetch: ['UID.title','UID.descripton','UID.cover'],
		pageSize: 3
	})
	// console.log(JSON.stringify(response,null,2))
	//console.log(response)

	const post = response.results.map( post => {
		return{
			slug:post.slugs,
			title:RichText.asText(post.data.title),
			descripton: post.data.descripton.find(content => content.type === 'paragraph')?.text ?? '',
			cover:post.data.cover.url,
			updateAt:new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})

		}
	} )


	return{
		props:{
			post,
			page:response.page,
			totalPage:response.total_pages
		},
		revalidate: 60 * 30 //atualiza a cada 30 minutos
	}
	

}