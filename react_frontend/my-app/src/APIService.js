// All crud operations here
// !IMPORTANT for react: all urls should end with a '/' for http working
// import { useCookies } from 'react-cookie';

export default class APIService {
    
    static async showList(token) {
        return fetch("http://localhost:8000/api/articles/", {
            "method": 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`,
                // api don't require token for this page
            }
        })
            .then(res => res.json())
    }

    static async updateArticle(article_id, body, token) {
        return fetch(`http://localhost:8000/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    static async addArticle(body, token) {
        return fetch(`http://localhost:8000/api/articles/`, {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    static async removeArticle(article, token) {
        return fetch(`http://localhost:8000/api/articles/${article.id}/`, {
            "method": "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            // body: JSON.stringify(body)
        })
    }

   
    static async loginUser(body) {
        return fetch("http://localhost:8000/auth_token/", {
            "method": 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
            })
            .then(res => res.json())
    }

    static async registerUser(body) {
        return fetch("http://localhost:8000/api/user/", {
            "method": 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }
}

