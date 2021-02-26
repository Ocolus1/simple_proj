import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { get_all_posts, get_search, get_cat} from "../services/user.services"
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';


function PostSideBar({access}) {
    const [posts, setPosts] = useState([])
    const [cat, setCat] = useState([])
    const { register, handleSubmit } = useForm();


    useEffect(() => {
        get_all_posts().then(
            (res) => {
                setPosts(res.data)
            }
        )
        get_cat().then(
            (res) => {
                setCat(res.data)
            }
        )
    }, [])

    const onSubmit = (data) => {
        get_search(data).then(
            (res) => {
                console.log(res.data)
            }
        )
    }

    if(!access) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <div class="pt-5 widget search">
                <header>
                    <h2 class="h4">Search the blog</h2>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}  class="search-form">
                    <div className="position-relative">
                        <div className="form-group">
                            <input type="text" className="form-control"
                            name="q" ref={register} placeholder="What are you looking for?"/>
                            <div className="position-absolute top-0 end-0 mt-2 pe-3">
                                <button type="submit" class="bg-transparent border-0">
                                    <i className="fa fa-search text-muted" ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="pt-3">
                <header>
                    <h2 className="h4 pt-3">Recent News</h2>
                </header>
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
            <div className="pt-3">
                <header>
                    <h2 className="h4">Categories</h2>
                </header>
                <table className="table table-striped table-hover ">
                    <tbody>
                        {cat.map((ca) => (
                            <tr>
                                <td key={ca.id} className="item d-flex justify-content-between">{ca.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    access: state.auth.access,
    currentUser: state.auth.user
})


export default connect(mapStateToProps, { })(PostSideBar);