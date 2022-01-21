import Airtable from 'airtable'

Airtable.configure({
    apiKey: 'keyC7b694u5wIN4kB'
})
const base = Airtable.base('app8tkGofoPPnE3be')
const table = base('Books')
const editorsTable = base('Editors')

export default table
export { editorsTable }