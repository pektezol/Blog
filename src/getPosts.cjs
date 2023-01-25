const path = require("path")
const fs = require("fs")

const postsPath = path.join(__dirname, "../src/posts")
let postList = []

const getPosts = () => {
    fs.readdir(postsPath, (err, files) => {
        if (err) {
            return console.log("Error on reading directory: " + err)
        }
        files.forEach((file, i) => {
            console.log(file)
            let obj = {}
            let post
            fs.readFile(`${postsPath}/${file}`, "utf-8", (err, contents) => {
                const getMetadata = (acc, elem, i) => {
                    if (/^---/.test(elem)) {
                        acc.push(i)
                    }
                    return acc
                }
                const parseMetadata = ({lines, metadataUnparsed}) => {
                    if (metadataUnparsed.length > 0) {
                        let metadata = lines.slice(metadataUnparsed[0] + 1, metadataUnparsed[1])
                        metadata.forEach(line => {
                            obj[line.split(": ")[0]] = line.split(": ")[1]
                        })
                        return obj
                    }
                }
                const parseContent = ({lines, metadataUnparsed}) => {
                    if (metadataUnparsed.length > 0) {
                        lines = lines.slice(metadataUnparsed[1] + 1, lines.length)
                    }
                    return lines.join("\n")
                }
                const lines = contents.split("\n")
                const metadataUnparsed = lines.reduce(getMetadata, [])
                const metadata = parseMetadata({lines, metadataUnparsed})
                const content = parseContent({lines, metadataUnparsed})
                post = {
                    id: file.split('_')[1].split('.')[0],
                    title: metadata.title ? metadata.title : "Unknown Title",
                    author: metadata.author ? metadata.author : "Nemo",
                    date: metadata.date ? metadata.date : "The Day After Tomorrow",
                    content: content ? content : "Empty Spaces",
                }
                postList.push(post)
                if (i === files.length - 1) {
                    const data = JSON.stringify(postList)
                    fs.writeFileSync("./posts.json", data, {encoding:'utf8',flag:'w'})
                }
            })
        })
    })
    return
}

getPosts()