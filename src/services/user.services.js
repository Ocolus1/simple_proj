import axios from "axios";


export const get_all_posts = async () =>  {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/post/`, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}


export const get_one_post = async (id) =>  {

    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/post/${id}/`, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}

export const add_view = async (id) =>  {

    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        const body = JSON.stringify(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/post/add_view/`, body, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}

export const get_cat = async () =>  {

    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        // const body = JSON.stringify(id)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/post/get_cat/`, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}

export const get_author = async () =>  {

    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/post/get_author/`, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}


export const post_author = async (id) =>  {

    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json"
            }
        };
        const body = JSON.stringify(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/post/post_author/`, body, config);
            return res
        } catch (err) {
            const message = err.message;
            return message
        }
    } else {
        console.log("Invalid Authorization")
    }
}