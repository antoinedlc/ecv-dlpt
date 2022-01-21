import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="nav">
            <div className="row grid-cols-12">
                <div className="col-span-2">
                    <Link href={{pathname: '/'}} scroll={false} passHref>
                        <span className="text-32 font-100 cursor-pointer">d l p t</span>
                    </Link>
                </div>
                <div className="col-span-8 flex justify-center items-center">
                    <Link href={{pathname: '/'}} scroll={false} passHref>
                        <a>Accueil</a>
                    </Link>
                    <Link href={{pathname: '/categories'}} scroll={false} passHref>
                        <a>Catégories</a>
                    </Link>
                    <Link href={{pathname: '/authors'}} scroll={false} passHref>
                        <a>Auteurs</a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}