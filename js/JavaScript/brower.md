### document-API

#### 1. createDocumentFragment
1. createDocumentFragment
    ```js
    const el = document.getElementById('wrapper')
    const node = document.createDocumentFragment()
    let firstChild
    while (el.firstChild) {
        firstChild = el.firstChild
        node.appendChild(firstChild)
    }
    console.log(node)
    ```