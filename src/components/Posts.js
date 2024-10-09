import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost,deletePost,updatePost} from '../redux/postsSlice';

export default function Posts() {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");

    const [updatedTitle,setUpdatedTitle] = useState("");
    const [updatedDesc,setUpdatedDesc] = useState("");

    const [isEdit,setIsEdit] = useState(false);
    const [id,setId] = useState(null);

    const posts = useSelector((state)=> state.posts.items)

    const dispatch = useDispatch();

  return (
    <div>
      <div className='form'>
        <input type='text' 
        value={title}
        placeholder='Enter Post Title'
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input type='text' 
        value={desc}
        placeholder='Enter Post Description'
        onChange={(e)=>setDesc(e.target.value)}
        />
        <button onClick={ ()=>{
            if(title!=="" && desc!==""){
            dispatch(addPost({id:posts.length +1 ,title,desc}));
            setTitle("");
            setDesc("");
            }else{
                alert("Required Field!!");
            }
        }}>Add Post </button>
      </div>

      <div className='posts'>
        {posts.length>0 ?
        posts.map(post=> 
          <div key={post.id} className='post'>
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
            <button onClick={()=> {setIsEdit(true); setId(post.id)}}>Edit</button>
            <button onClick={()=>{dispatch(deletePost({id:post.id}))}}>Delete</button>
            <br/>
            {
                isEdit && id === post.id &&(
                    <>
                    <input type='text'  placeholder='Updated Title' onChange={(e)=>setUpdatedTitle(e.target.value)}/>
                    <input type='text' placeholder='Updated Description' onChange={(e)=>setUpdatedDesc(e.target.value)}/>
                    <button onClick={ ()=>{
                        dispatch(updatePost({id:post.id ,title:updatedTitle,desc:updatedDesc}))
                        setIsEdit(false)
                    }}>Update</button>
                    </>
                )
            }
        
        </div>)
        : 'There is no posts'}
      </div>
    </div>
  )
}