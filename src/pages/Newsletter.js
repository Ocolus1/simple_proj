import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { get_all_posts} from "../services/user.services"
import six from "../img/six.jpg"

function Newsletter({ access }) {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        get_all_posts().then(
            (res) => {
                setPosts(res.data)
            }
        )
    }, [])

    const thumbnail = {
        width: "100%",
        height: "15rem"
    }

    const blogImage = {
        backgroundImage: `url(${six})`,
        // filter: "blur(8px)",
        height: "15rem",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
    }

    const backG = {
        backgroundColor: "rgba(0,0,0, 0.5)",
        height : "100%",
        width: "100%"
    }

    const blogText = {
        // backgroundColor: "rgba(0,0,0, 0.5)",
        color: "white",
        fontWeight: "bolder",
        width: "100%",
        padding: "20px",
        // textAlign: "center"
    }

    const convertDate = (e) => {
        let data = new Date(e)
        return data.toDateString()
    }

    if(!access) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <div className="container shadow p-3 mb-5 bg-white rounded">
                <div className="text-center p-0" style={blogImage}>
                    <div className="d-flex align-items-center" style={backG}>
                        <div  style={blogText}>
                            <h4 className="text-white fs-3">Blog News</h4>
                        </div>
                    </div>
                </div>
                <div className="card-group p-5">
                    {posts.map((post) => (
                        <div key={post.id} className="card p-4 border-0">
                            <img src={post.thumbnail} style={thumbnail} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <Link  to={`/blog/${post.id}`} className="text-decoration-none" target="_blank">
                                    <h5 className="card-title">
                                        {post.title}    
                                    </h5>
                                </Link>
                                <div className="py-3">
                                    Posted on <span className="text-muted pb-0">{convertDate(post.timestamp)}</span><br />
                                    Comments <span className="text-muted pt-0">4</span><br />
                                </div>
                                <div className="text-muted">
                                    {post.content.substring(3, 200)}
                                </div>
                            </div>
                            <div className="mx-3 my-1">
                                <Link  to={`/blog/${post.id}`} className="text-decoration-none" target="_blank">
                                    <button type="button" className=" py-3 px-3 btn btn-info text-white">
                                        READ MORE <i className="far fa-arrow-alt-circle-right"></i> 
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { })(Newsletter);