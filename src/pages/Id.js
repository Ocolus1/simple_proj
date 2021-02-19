import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { get_one_post, get_author } from "../services/user.services"
import { get_all_posts, add_view, get_cat, post_author } from "../services/user.services"
import six from "../img/six.jpg"


function Id({ access, match}) {
    const [post, setPost] = useState([])
    const [cat, setCat] = useState([])
    const [view, setView] = useState()
    const [author, setAuthor] = useState([])
    const [post_auth, setPostAuth] = useState([])
    // const regex = /(<([^>]+)>)/ig;
    const [posts, setPosts] = useState([])

    useEffect(() => {
        get_all_posts().then(
            (res) => {
                setPosts(res.data)
            }
        )
    }, [])

    const blogImage = {
        backgroundImage: `url(${six})`,
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
        color: "white",
        fontWeight: "bolder",
        width: "100%",
        padding: "20px",
    }

    
    const id = match.params.id;
    

    useEffect(() => {
        get_one_post(id).then(
            (ress) => {
                console.log(ress.data)
                setPost(ress.data)
                get_cat().then(
                    (res) => {
                        const e = ress.data.categories;
                        const sep = res.data;
                        let c = []
                        if (e.length > 1 ){
                            for(let x in e) {
                                c.push(sep[e[x] -1])
                            }
                            setCat(c)
                        }else if (e.length <= 1 ) {
                            for(let x in e){
                                c.push(sep[e[x] - 1])
                            }
                            setCat(c)
                        }
                        
                    }
                )
                get_author().then(
                    (re) => {
                        const e = ress.data.author;
                        const sepe = re.data;
                        let c = []
                        c.push(sepe[e - 1])
                        setAuthor(c)
                        post_author(c[0]["user"]).then(
                            (r) => {

                                setPostAuth(r.data);
                            }
                        )
                    }
                )
            }
        )
        add_view(id).then(
            (res) => {
                setView(res.data)
            }
        )
        
    }, [id])


    const convertDate = (e) => {
        let data = new Date(e)
        return data.toDateString()
    }

    const auth_img = (e) => {
        return process.env.REACT_APP_API_URL + e
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
                            <h4 className="text-white fs-3">{post.title}</h4>
                            <small className="text-muted">{post.overview}</small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <div key={post.id} className="card p-3 border-0">
                            <div className="card-body">
                                <h1 className="card-title p-3">
                                    {post.title}    
                                </h1>
                                <img src={post.thumbnail} className="card-img-top" alt="thumbnail" />
                                <p className="mt-3 mb-1">
                                    {cat.map((ca) => (
                                    <span className="m-2 text-uppercase text-muted" key={ca.id}>
                                        <small>{ca.title}</small>
                                    </span>
                                    ))}
                                </p>
                                <h5 className="p-2">{post.overview}</h5>
                                <div className="post-footer d-flex align-items-center flex-column flex-sm-row">
                                    <div className="d-flex align-items-center flex-wrap">
                                        {author.map((auth) => (
                                            <div className="avatar m-2">
                                                <img src={auth_img(auth.author_pic)} 
                                                width={30}
                                                height={30}
                                                alt="..." className="img-fluid" />
                                                <span className="text-muted"> |</span>
                                            </div>
                                        ))}
                                        <div className="title m-2 ms-0 text-capitalize"><span>{post_auth}</span></div>
                                        <span className="text-muted">|</span>
                                    </div>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="date m-2"><i className="far fa-clock"></i> {convertDate(post.timestamp)}</div><span className="text-muted">|</span>
                                    <div className="views m-2"><i className="far fa-eye"></i> {view}</div><span className="text-muted">|</span>
                                    <div className="comments meta-last m-2"><i className="far fa-comments me-2"></i>4</div>
                                </div>
                                </div>
                                
                                <div className="card-text">
                                    {post.content}
                                </div>
                                
                            </div>
                            <div className="row justify-content-between row align-items-stretch bd-highlight">
                                <div className="col-4 shadow-sm p-3 mb-5 bg-body rounded">
                                    {post.previous_post ? 
                                        <>
                                        {posts.filter(po => po.id === post.previous_post).map((po) => (
                                        <div key={po.id}>
                                            <a href={`/blog/${po.id}`} 
                                            className="text-muted text-decoration-none text-left d-flex align-items-center">
                                                <div className="icon prev m-3"><i className="fas fa-angle-left"></i></div>
                                                <div className="text"><strong className="text-primary">Previous Post </strong>
                                                    <h6>
                                                        <Link  to={`/blog/${po.id}`} className="text-decoration-none" target="_blank">
                                                            <h5 className="card-title">
                                                                {po.title}    
                                                            </h5>
                                                        </Link>
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                        ))}
                                        </>
                                        
                                        : " "
                                    }
                                </div>
                                <div className="col-4 shadow-sm p-3 mb-5 bg-body rounded">
                                    {post.next_post ? 
                                        <>
                                        {posts.filter(po => po.id === post.next_post).map((po) => (
                                        <div key={po.id}>
                                            <a href={`/blog/${po.id}`} 
                                            className="text-decoration-none text-right d-flex align-items-center justify-content-end">
                                                <div className="text"><strong className="text-primary">Next Post </strong>
                                                    <h6>
                                                        <Link  to={`/blog/${po.id}`} className="text-decoration-none" target="_blank">
                                                            <h5 className="card-title">
                                                                {po.title}    
                                                            </h5>
                                                        </Link>
                                                    </h6>
                                                </div>
                                                <div className="icon next m-3"><i className="fas fa-angle-right"> </i></div>
                                            </a>
                                        </div>
                                        ))}
                                        </>
                                        : " "
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="pt-3">
                            <h2 className="pt-3">Recent News</h2>
                            <div className="shadow p-3 mb-4 bg-white rounded">
                                {posts.slice(0, 3).map((post) => (
                                    <div>
                                        <div key={post.id} className="row pt-2">
                                            <div className="col-4">
                                            <img
                                                className="d-block w-100"
                                                height="40px"
                                                width="100%"
                                                src={post.thumbnail}
                                                alt="slide"
                                            />
                                            </div>
                                            <div className="col-8 ps-0">
                                                <Link  to={`/blog/${post.id}`} 
                                                className="text-decoration-none" target="_blank">
                                                    <h5 className="card-title">
                                                        {post.title}    
                                                    </h5>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
})

export default connect(mapStateToProps, { })(Id);