const getData = (url) =>
    new Promise((resolve, reject) =>
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )

const linkWebsiteLayout = 'https://api.github.com/repos/OlehWhite/WebsiteLayout/commits';
const linkHtmlCssPractice = 'https://api.github.com/repos/OlehWhite/HtmlCssPractice/commits';
const linkJSPractice = 'https://api.github.com/repos/OlehWhite/JavaScriptPractice/commits';

const repositoryWebsiteLayout = document.querySelector('.repository-website_layout')
const repositoryHtmlCssPractice = document.querySelector('.repository-html-css-practice')
const repositoryJSPractice = document.querySelector('.repository-js-practice')

const addEventListRepository = (tagClass, url) => {
    let checked = false
    tagClass.addEventListener('click', () => {
        if (checked) return
        displayLoading()
        getData(url)
            .then(data => {
                checked = true
                const div = document.createElement('div');
                const date = data[0]['commit']['committer']['date']
                let stringCleanData = '';

                for (let i = 0; i < date.length; i++) {
                    if (date[i] === 'T' || date[i] === 'Z') {
                        stringCleanData += ' '
                    } else {
                        stringCleanData += date[i]
                    }
                }

                div.className = 'data'
                hideLoading()
                div.textContent = 'Останні зміни: ' + stringCleanData
                tagClass.append(div)
            })
            .catch(error => console.log(error.message))
    })
}

const loader = document.querySelector('#loading')

function displayLoading() {
    loader.classList.add('display')
    setTimeout(() => {
        loader.classList.remove('display')
    }, 2000)
}

function hideLoading() {
    loader.classList.remove('display')
}

addEventListRepository(repositoryWebsiteLayout, linkWebsiteLayout);
addEventListRepository(repositoryHtmlCssPractice, linkHtmlCssPractice);
addEventListRepository(repositoryJSPractice, linkJSPractice);
