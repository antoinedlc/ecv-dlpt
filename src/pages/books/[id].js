import table from '../../utils/Airtable'
import { editorsTable } from '../../utils/Airtable'

export default function Book({book, src, title, editors, topics, quote, linkWhere, linkBuy, hearts}) {
    console.log(book)
    return (
        <>
            <section>
                <div className="row grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <div className="img--book-hero img-pb-100" style={{backgroundImage: `url('${src}')`}}></div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex mb-2">
                            {editors && (
                                editors.map((editor) => {
                                    return (
                                        <span className="text-gray_dark">© {editor}</span>
                                    )
                                })
                            )}
                        </div>
                        <h1 className="text-32 font-600 text-left mb-2">{title}</h1>
                        <div className="mb-6">
                            <p>{topics}</p>
                        </div>
                        <p className="mb-6 text-20 font-200 text-gray_dark italic">"{quote}"</p>
                        <div className="flex mb-4">
                            {hearts && (
                                hearts.map((heart) => {
                                    return (
                                        <i aria-hidden className={`${heart.class} mr-1_5`}></i>
                                    )
                                })
                            )}
                        </div>
                        <div className="flex mb-1 text-gray_dark">
                            <span className="font-500 mr-1">Où le trouver :</span>
                            <a href={linkWhere}>{linkWhere}</a>
                        </div>
                        <div className="flex text-gray_dark">
                            <span className="font-500 mr-1">Où l'acheter :</span>
                            <a href={linkBuy}>{linkBuy}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticPaths() {
    let jsonBooks = JSON.stringify(await table.select().firstPage())
    let booksData = await JSON.parse(jsonBooks)

    const paths = booksData.map((book) => ({
        params : { id: book.id }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    let jsonBooks = JSON.stringify(await table.select().firstPage())
    let booksData = await JSON.parse(jsonBooks)
    let book = booksData.find(x => x.id === params.id)

    let hearts = []

    for(let i=0;i<book.fields.Note;i++) {
        hearts.push({class: 'gg-heart fill'})
    }

    if(hearts.length < 5) {
        for(let i=hearts.length;i<5;i++) {
            hearts.push({class: 'gg-heart'})
        }
    }

    return {
        props: {
            book,
            title: book.fields.Titre,
            src: book.fields.Cover ? book.fields.Cover[0].url : '',
            editors: await getEditors(book),
            hearts,
            topics: await getTopics(book),
            quote: book.fields["Personal Notes"] ? book.fields["Personal Notes"] : '',
            linkWhere: book.fields["Où le trouver"] ? book.fields["Où le trouver"] : '',
            linkBuy: book.fields["Acheter"] ? book.fields["Acheter"] : ''
        }
    }
}



async function getEditors(book) {
    let jsonEditors = JSON.stringify(await editorsTable.select().firstPage())
    let editorsData = await JSON.parse(jsonEditors)

    let editors = []

    let editorsIds = book.fields.Editeur 
    editorsIds.forEach(editorId => {
        let editor = editorsData.find(x => x.id === editorId)
        editors.push(editor.fields.Name)
    })

    return editors
}



async function getTopics(book) {
    let topicsData = book.fields.Topic
    let topics = ''

    topicsData.forEach(topic => {
        topics = topics + topic + ' - '
    })

    return topics
}