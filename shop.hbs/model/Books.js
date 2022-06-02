const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')

class Books {
    constructor(name, year, img,lorem) {
        this.name = name
        this.year = year
        this.img = img
        this.lorem = lorem
    }

    toObj() {
        return {
            name: this.name,
            year: +this.year,
            img: this.img,
            lorem: this.lorem,
            id: uuid()
        }
    }

    async save() {
        const books = await Books.getAll() // []
        const book = this.toObj()

        books.push(book)
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'books.json'),
                JSON.stringify({ books }),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                })
        })
    }
    async update() {
        const products = await Books.getAll()
        const idx = this.idx
        const product = this.toObj()

        products[idx] = product

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'books.json'), JSON.stringify({ products }),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                })
        })
    }


    static async getAll() {
        return new Promise((resolve, reject) => {
            // console.log(this.toObj());
            // resolve(this.toObj())

            fs.readFile(path.join(__dirname, '..', 'data', 'books.json'), 'utf-8', (err, content) => {
                if (err) reject(err)
                else resolve(JSON.parse(content).books)
            })
        })
    }

}

module.exports = Books