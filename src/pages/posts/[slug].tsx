import styles from './post.module.scss'

import { GetServerSideProps } from 'next'

import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'


export default function Post(){
	return(
		<div>
			<h1> ola mundo</h1>
		</div>
	)
}

	export const getServerSideProps: GetServerSideProps = async ({req,params}) =>{
		const { slugs } = params;
  		const prismic = getPrismicClient(req);

  		const response = await prismic.getByUID('UID', String(slugs), {});
		
		console.log(prismic)
		
		
		return{
			props:{

			}
		}
	}
















// export const getSeverSideProps: GetServerSideProps = async ({ req,params }) => {
// 	const { slug } = params;
// 	const prismic = getPrismicClient(req)

// 	const response = await prismic.getByUID('UID', String(slug), {})
	
	
// 	console.log(response.data)
	
// 	return{
// 		props:{

// 		}
// 	}
// }