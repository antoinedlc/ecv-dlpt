import Head from 'next/head'
import Nav from '../components/molecules/Nav'

import '../../styles/app.css'

export default function App({ Component, pageProps, router }) {
    return (
        <> 
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Des livres pour tous" />
                <title>Des livres pour tous</title>
                <script src="https://kit.fontawesome.com/9bbc4a13f0.js" crossorigin="anonymous"></script>
            </Head>
            <>
                <Nav />
                <Component {...pageProps} key={router.route} />
            </>
        </>
    )
}