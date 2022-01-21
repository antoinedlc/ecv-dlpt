import HpHero from '../components/sections/HpHero'
import BookCard from '../components/molecules/BookCard'
import table from '../utils/Airtable'

export default function Home({books}) {
    console.log(books)
    return (
        <>
            <HpHero />
            <div className="row grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-16">
                {books && (
                    books.map((book, id) => {
                        return (
                            <BookCard book={book} key={`book-${id}`} />
                        )
                    })
                )}
            </div>
        </>
    )
}

export async function getStaticProps() {
    let jsonBooks = JSON.stringify(await table.select().firstPage())
    let booksData = await JSON.parse(jsonBooks)
    let books = []

    await booksData.forEach(record => {
        books.push({
            id: record.id,
            src: record.fields.Cover ? record.fields.Cover[0].url : '',
            title: record.fields.Titre,
            topics: record.fields.Topic
        })
    })

    return {
        props: { books }
    }
}