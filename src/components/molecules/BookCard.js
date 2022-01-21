import Link from 'next/link'

export default function BookCard({ book }) {
    console.log(book)
    return (
        <Link href={{pathname: `/books/${book.id}`}} scroll={false} passHref>
            <article className="col-span-1 flex flex-col cursor-pointer card-book rounded-1 p-2 md:py-4 md:px-3 anim bg-white">
                <div className="img thumbnail" style={{backgroundImage: `url('${book.src}')`}}></div>
                <h2 className="font-500 text-16 my-1 md:mt-2">{book.title}</h2>
                <div className="mb-1 md:mb-3">
                    {
                        book.topics.map((topic) => {
                            return (
                                <span className="text-12 text-gray">{topic}</span>
                            )
                        })
                    }
                </div>
                <a className="link font-400 text-14 mt-auto text-gray_dark">Lire la suite</a>
            </article>
        </Link>
    )
}