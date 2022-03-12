import Link,{LinkProps} from "next/link";
import { useRouter } from "next/router";
import { ReactElement,cloneElement } from 'react'


interface ActiveLinkProps extends LinkProps{
	children: ReactElement;
	activeClassName:string;
}

export function ActiveLink({children, activeClassName,...rest}:ActiveLinkProps) {

	const { asPath } = useRouter() 
	// se ele estiver na pagina blog ele pega o /post

	const className =  asPath === rest.href ? activeClassName : '';
	//se a rota/pagina que estamos acessando for igual ao link que ele clicou ativamos o className

	return(
		<Link {...rest }>
			{cloneElement(children,{
				className
			})}
		</Link>
	)
}